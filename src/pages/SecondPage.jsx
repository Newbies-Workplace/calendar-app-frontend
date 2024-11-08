import "../App.css";
import Calendar from "../components/Calendar.tsx";
import Modal from "../components/Modal.jsx";
import EndVoteModal from "../components/EndVoteModal.jsx";
import DayModal from "../components/DayModal.jsx";
import HelpModal from "../components/HelpModal.jsx";
import Toolbar from "../components/Toolbar.jsx";
import { useState, useEffect } from "react";
import NameModal from "../components/NameModal.jsx";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { Helmet } from 'react-helmet';
import { RightPanel } from "../components/RightPanel.tsx";
const BACKEND_URL = process.env.CALENDAR_BACKEND_URL;


function SecondPage(props) {
  const nameCookieKey = `${props.id}`;
  // Cookies.get(nameCookieKey) === undefined && Cookies.set(nameCookieKey, true);
  const cookieName = Cookies.get(nameCookieKey);
  const [activeModal, setActiveModal] = useState(null);
  const [modalDate, setModalDate] = useState(null);
  const [nameModal, setNameModal] = useState(cookieName === undefined);
  const [event, setEvent] = useState();
  const [votelist, setVotelist] = useState([]);
  const [participants, setParticipants] = useState([]);
  const dayM = (name, date) => {
    setModalDate(date);
    setActiveModal(name);
  };
  const onDismiss = () => {
    setActiveModal(null);
  };
  const setParticipantCookie = (data) => {
    Cookies.set(nameCookieKey, JSON.stringify(data));
  };

  
  useEffect(() => {
    const eventSource = new EventSource(`${BACKEND_URL}/event/${props.id}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
  
      setVotelist((prevVotelist) => {
        const existingVoteIndex = prevVotelist.findIndex(
          (v) =>
            v.day === data.day &&
            v.participant_id === data.participant_id
        );
  
        if (existingVoteIndex !== -1) {
          const updatedVotelist = [...prevVotelist];
          updatedVotelist[existingVoteIndex] = data;
          return updatedVotelist;
        } else {
          return [...prevVotelist, data];
        }
      });
    };

    return () => {
      eventSource.close();
    };
  }, [props.id]);


  useEffect(() => {
    //nie dodawać ciasteczek do getów :)
    fetch(`${BACKEND_URL}/rest/events/${props.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((error) => console.log(error));

    fetch(`${BACKEND_URL}/rest/events/${props.id}/statuses`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setVotelist(data);
      })
      .catch((error) => console.log(error));

    fetch(`${BACKEND_URL}/rest/events/${props.id}/participants`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setParticipants(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const replaceVote = (data, day) => {
    const cookie = JSON.parse(Cookies.get(nameCookieKey));
    setVotelist((prevVotelist) => {
      const existingVoteIndex = prevVotelist.findIndex(
        (v) =>
          dayjs(v.day).isSame(day, "day") &&
          v.participant_id === cookie.participant_id
      );

      if (existingVoteIndex !== -1) {
        const updatedVotelist = [...prevVotelist];
        updatedVotelist[existingVoteIndex] = data;
        console.log("test ifa");
        return updatedVotelist;
      }
      return [...prevVotelist, data];
    });
  };

  const submitVote = (day, vote) => {
    const cookie = JSON.parse(Cookies.get(nameCookieKey));

    const body = { day: day, status: vote ? "AVAILABLE" : "NOT_AVAILABLE" };
    fetch(`${BACKEND_URL}/rest/events/${props.id}/statuses`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Participant: cookie.participant_id,
      },
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //window.location.reload();
        replaceVote(data, day);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
 
     <div className={"flex w-screen h-screen text-black"}>
    <div className={"w-2/3"}>
      <div className={"bg-blue-700 text-white w-full h-12"}>
        <Toolbar/>
      </div>
      <div className={"overflow-y-auto overflow-x-hidden h-[calc(100%-48px)] flex flex-col items-center gap-5"}>
      {event != undefined && (
        <Calendar
          votelist={votelist}
          onClick={(name, date) => {
            dayM(name, date);
          }}
          start={event.start}
          end={event.end}
          cookieKey={nameCookieKey}
        ></Calendar>
      )
      } 
      </div>

    </div>

    <div
     className={"w-1/3 h-screen bg-amber-300 flex flex-col gap-2"}>
      {event != undefined && (
    <RightPanel
    title={event.name}/>
      )}
    
    
    </div>
  </div>

      {event != undefined && (
        <Helmet>
        <meta property="og:title" content={event.name} />
        <meta property="og:description" content={event.description} />
        <title>{event.name}</title>
      </Helmet>
      )}
      

      <Modal isActive={activeModal != null} onShow={onDismiss}>
        {activeModal === "end" && <EndVoteModal onClick={onDismiss} />}
        {activeModal === "day" && (
          <DayModal
            dayDate={modalDate}
            votelist={votelist}
            onClick={(day, vote) => {
              submitVote(day, vote);
              onDismiss();
            }}
            participants={participants}
          ></DayModal>
        )}
        {activeModal === "help" && <HelpModal></HelpModal>}
      </Modal>

      {nameModal === true && (
        <Modal isActive={NameModal}>
          <NameModal
            onSubmit={(prop) => {
              setNameModal(false);
              setParticipantCookie(prop);
            }}
            eventId={props.id}
          ></NameModal>
        </Modal>
      )}
    </>
  );
}

export default SecondPage;
