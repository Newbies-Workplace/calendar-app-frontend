import Button from "@/components/Button";
import { Participant, Vote } from "@/types/responses";
import dayjs from "dayjs";
import React, { useMemo } from "react";

interface DayModalProps {
  votes: Vote[];
  day: string;
  participants: Participant[];
  onVotePress: (day: string, isAvailable: boolean) => void;
}

export const DayModal: React.FC<DayModalProps> = (props) => {
  const votesForDate = useMemo(
    () =>
      props.votes?.filter(
        (vote) =>
          dayjs(vote.day).format("YYYY-MM-DD") ===
          dayjs(props.day).format("YYYY-MM-DD"),
      ) || { votes: [] },
    [props],
  );

  return (
    <div className="text-left p-5 rounded-[10px]">
      <div className="text-xl  text-[#333] mb-[15px]">
        {dayjs(`${props.day}`).format("D MMMM YYYY - dddd")}
      </div>
      <hr className="flex-grow border-t-2 border-gray-400 rounded-full" />

      <div className="text-base text-center font-medium text-[#666] mt-2.5 mb-[5px] mx-0">
        Dostępni
      </div>
      <div className="flex justify-left flex-wrap gap-2.5 mb-2.5">
        {votesForDate.filter((v) => v.status === "AVAILABLE").length <= 0 ? (
          <div>Brak głosów</div>
        ) : (
          votesForDate
            .filter((v) => v.status === "AVAILABLE")
            .map((vote) => {
              return (
                <div
                  key={vote.termin_status_id}
                  className="inline-flex items-center text-sm border p-2 rounded-lg border-solid border-transparent bg-status-available/20 border-[#000000] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-status-available before:mr-2 before:rounded-[50%]"
                >
                  {
                    props.participants.find(
                      (participant) =>
                        participant.participant_id === vote.participant_id,
                    )?.name
                  }
                </div>
              );
            })
        )}
      </div>

      <div className="text-base text-center font-medium text-[#666] mt-2.5 mb-[5px] mx-0">
        Niedostępni
      </div>
      <div className="flex justify-left flex-wrap gap-2.5 mb-2.5">
        {votesForDate.filter((v) => v.status === "NOT_AVAILABLE").length <=
        0 ? (
          <div>Brak głosów</div>
        ) : (
          votesForDate
            .filter((v) => v.status === "NOT_AVAILABLE")
            .map((vote) => {
              return (
                <div
                  key={vote.termin_status_id}
                  className="inline-flex items-center text-sm border p-2 rounded-lg border-solid border-transparent bg-status-not-available/20 border-[#000000] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-status-not-available before:mr-2 before:rounded-[50%]"
                >
                  {
                    props.participants.find(
                      (participant) =>
                        participant.participant_id === vote.participant_id,
                    )?.name
                  }
                </div>
              );
            })
        )}
      </div>

      <div className="flex flex-row gap-2">
        <Button onClick={() => props.onVotePress(props.day, true)}>
          Jestem dostępny
        </Button>
        <Button onClick={() => props.onVotePress(props.day, false)}>
          Jestem niedostępny
        </Button>
      </div>
    </div>
  );
};
