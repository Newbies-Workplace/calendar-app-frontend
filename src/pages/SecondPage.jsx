import "../App.css";
import Month from "../components/Month.jsx";
import Modal from "../components/Modal.jsx";
import Day from "../components/Day.jsx";
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
      <Day
        dayNumber="1"
        votes={[
          { status: true, isCurrentUserVote: true },
          { status: true, isCurrentUserVote: false },
        ]}
        onClick={() => {
          click("1");
        }}
      />
      <Day
        dayNumber="2"
        votes={[
          { status: false, isCurrentUserVote: true },
          { status: false, isCurrentUserVote: false },
        ]}
        onClick={() => {
          click("2");
        }}
      />
      <Day
        dayNumber="3"
        hidden={false}
        votes={[
          { status: true, isCurrentUserVote: true },
          { status: false, isCurrentUserVote: false },
        ]}
        onClick={() => {
          click("3");
        }}
      />
      <Day dayNumber="4" votes={[]} hidden />
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
        <h1>TEST H1 {activeModal}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Modal>
    </>
  );
}

export default SecondPage;
