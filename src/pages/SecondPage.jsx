import "../App.css";
import Calendar from "../components/Calendar.jsx";
import Modal from "../components/Modal.jsx";
import "../components/button.css";
import EndVoteModal from "../components/EndVoteModal.jsx";
import DayModal from "../components/DayModal.jsx";
import HelpModal from "../components/HelpModal.jsx";
import { useState } from "react";
import NameModal from "../components/NameModal.jsx";

const votelist = [
  {
    dayNumber: "2024-09-17",
    votes: [
      { status: false, isCurrentUserVote: true, name: "flo" },
      { status: false, isCurrentUserVote: false, name: "owy" },
    ],
  },
  {
    dayNumber: "2024-09-15",
    votes: [
      { status: true, isCurrentUserVote: true, name: "flo" },
      { status: false, isCurrentUserVote: false, name: "owy" },
    ],
  },
  {
    dayNumber: "2024-10-02",
    votes: [
      { status: true, isCurrentUserVote: true, name: "flo" },
      { status: true, isCurrentUserVote: false, name: "owy" },
    ],
  },
];

function SecondPage(props) {
  const [activeModal, setActiveModal] = useState(null);
  const [modalDate, setModalDate] = useState(null);
  const [nameModal, setNameModal] = useState(true);
  console.log(props.id);
  const click = (name, date) => {
    setModalDate(date);
    setActiveModal(name);
  };
  const onDismiss = () => {
    setActiveModal(null);
  };
  return (
    <>
      {/* <button
        className="main"
        onClick={() => {
          click("help", null);
        }}
      >
        HELP
      </button>
      <button
        className="main"
        onClick={() => {
          click("end", null);
        }}
      >
        END VOTE
      </button> */}
      <Calendar
        votelist={votelist}
        onClick={(name, date) => {
          click(name, date);
        }}
        start="2024-09-07"
        end="2024-10-10"
      ></Calendar>
      <Modal isActive={activeModal != null} onShow={onDismiss}>
        {activeModal === "end" && <EndVoteModal onClick={onDismiss} />}
        {activeModal === "day" && (
          <DayModal
            dayDate={modalDate}
            votelist={votelist}
            onClick={(prop) => console.log(prop)}
          ></DayModal>
        )}
        {activeModal === "help" && <HelpModal></HelpModal>}
      </Modal>

      {nameModal === true && (
        <Modal isActive={NameModal}>
          <NameModal onClick={() => setNameModal(false)}></NameModal>
        </Modal>
      )}
    </>
  );
}

export default SecondPage;
