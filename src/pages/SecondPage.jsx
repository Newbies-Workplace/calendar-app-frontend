import "../App.css";
import Month from "../components/Month.jsx";
import Modal from "../components/Modal.jsx";
import Day from "../components/Day.jsx";
import EndVoteModal from "../components/EndVoteModal.jsx";
import DayModal from "../components/DayModal.jsx";
import HelpModal from "../components/HelpModal.jsx";
import { useState } from "react";

const votelist = [
  {
    dayNumber: "2024-09-17",
    votes: [
      { status: false, isCurrentUserVote: true },
      { status: false, isCurrentUserVote: false },
    ],
  },
  {
    dayNumber: "2024-09-15",
    votes: [
      { status: true, isCurrentUserVote: true },
      { status: false, isCurrentUserVote: false },
    ],
  },
  {
    dayNumber: "2024-10-09",
    votes: [
      { status: true, isCurrentUserVote: true },
      { status: true, isCurrentUserVote: false },
    ],
  },
];

function SecondPage(props) {
  const [activeModal, setActiveModal] = useState(null);
  const click = (number) => {
    setActiveModal(number);
  };
  const onDismiss = () => {
    setActiveModal(null);
  };
  return (
    <>
      <Month
        year="2024"
        monthNumber="9"
        start="2024-09-07"
        end="2024-09-30"
        info={votelist}
        dayClick={(number) => {
          click(number);
        }}
      ></Month>
      <Modal isActive={activeModal != null} onShow={onDismiss}>
        {/* <EndVoteModal onClick={onDismiss} /> */}
        <DayModal dayDate={activeModal}></DayModal>
        {/* <HelpModal></HelpModal> */}
      </Modal>
    </>
  );
}

export default SecondPage;
