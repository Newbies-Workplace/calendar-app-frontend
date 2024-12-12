import { Calendar } from "@/components/Calendar";
import { DayModal } from "@/components/DayModal";
import { Modal } from "@/components/Modal";
import { NameModal } from "@/components/NameModal";
import { RightPanel } from "@/components/RightPanel";
import { Toolbar } from "@/components/Toolbar";
import { useKeyPressed } from "@/hooks/useKeyPressed";
import { useParticipantCookie } from "@/hooks/useParticipantCookie";
import { Event, Participant, SseMessage, Vote } from "@/types/responses";
import { myFetch } from "@/util/myFetch";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const BACKEND_URL = process.env.CALENDAR_BACKEND_URL;

export const Route = createFileRoute("/calendar/$id")({
  component: CalendarPage,
});

function CalendarPage() {
  const { id: eventId } = Route.useParams();
  const { getParticipantFromCookie, saveParticipantToCookie } =
    useParticipantCookie();

  const [activeModal, setActiveModal] = useState(
    getParticipantFromCookie(eventId) === undefined ? "name" : null,
  );
  const [modalDate, setModalDate] = useState<string | null>(null);

  const [event, setEvent] = useState<Event>();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const isShiftPressed = useKeyPressed("Shift");
  const isControlPressed = useKeyPressed("Control");

  const onDayClick = (date: string) => {
    if (isShiftPressed) {
      submitVote(date, true);
    } else if (isControlPressed) {
      submitVote(date, false);
    } else {
      setModalDate(date);
      setActiveModal("day");
    }
  };
  const onDismiss = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    const eventSource = new EventSource(`${BACKEND_URL}/event/${eventId}`);

    eventSource.onmessage = (event: MessageEvent) => {
      const data: SseMessage = JSON.parse(event.data);

      if (data.type === "participant_created") {
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          data.payload,
        ]);
      } else if (data.type === "termin_status_created") {
        replaceVote(data.payload, data.payload.day);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [eventId]);

  useEffect(() => {
    myFetch<Event>(`${BACKEND_URL}/rest/events/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((data) => {
        setEvent(data);
      })
      .catch((error) => console.log(error));

    myFetch<Vote[]>(`${BACKEND_URL}/rest/events/${eventId}/statuses`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((data) => {
        setVotes(data);
      })
      .catch((error) => console.log(error));

    myFetch<Participant[]>(
      `${BACKEND_URL}/rest/events/${eventId}/participants`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    )
      .then((data) => {
        setParticipants(data);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const replaceVote = (data: Vote, day: string) => {
    setVotes((prevVotelist) => {
      const existingVoteIndex = prevVotelist.findIndex(
        (v) =>
          dayjs(v.day).isSame(day, "day") &&
          v.participant_id === data.participant_id,
      );

      if (existingVoteIndex !== -1) {
        const updatedVotelist = [...prevVotelist];
        updatedVotelist[existingVoteIndex] = data;
        return updatedVotelist;
      }
      return [...prevVotelist, data];
    });
  };

  const submitVote = (day: string, isAvailable: boolean) => {
    const cookie: Participant | undefined = getParticipantFromCookie(eventId);
    if (cookie === undefined) {
      setActiveModal("name");
      return;
    }

    const body = {
      day: day,
      status: isAvailable ? "AVAILABLE" : "NOT_AVAILABLE",
    };
    myFetch<Vote>(`${BACKEND_URL}/rest/events/${eventId}/statuses`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Participant: cookie.participant_id,
      },
      method: "PUT",
    })
      .then((data) => {
        replaceVote(data, day);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {event !== undefined && (
        <Helmet>
          <meta property="og:title" content={event.name} />
          <meta property="og:description" content={event.description} />
          <title>{event.name}</title>
        </Helmet>
      )}

      <div className={"flex w-screen h-screen overflow-hidden text-black"}>
        <div className="w-screen lg:w-2/3">
          <Toolbar />
          <div
            className={
              "flex justify-center items-center w-full h-[calc(100%-48px)] overflow-hidden"
            }
          >
            {event !== undefined && (
              <Calendar
                votes={votes}
                onClick={(date) => onDayClick(date)}
                start={event.start}
                end={event.end}
                eventId={eventId}
              />
            )}
          </div>
        </div>

        <div
          className={
            "flex-shrink-0 w-full lg:w-1/3 h-full bg-gray-300 flex flex-col gap-2 text-center"
          }
        >
          {event !== undefined && (
            <RightPanel
              title={event.name}
              description={event.description}
              countdown={event.voting_end}
              participants={participants}
            />
          )}
        </div>
      </div>

      {activeModal !== null && (
        <Modal onDismiss={onDismiss}>
          {activeModal === "day" && modalDate && (
            <DayModal
              day={modalDate}
              votes={votes}
              onVotePress={(day, isAvailable) => {
                submitVote(day, isAvailable);
                onDismiss();
              }}
              participants={participants}
            />
          )}
          {activeModal === "name" && (
            <NameModal
              onSubmit={(participant) => {
                saveParticipantToCookie(eventId, participant);
                onDismiss();
              }}
              eventId={eventId}
            />
          )}
        </Modal>
      )}
    </>
  );
}
