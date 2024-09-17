import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Frontpage from "./Frontpage.jsx";
import "./index.css";
import Day from "./components/Day.jsx";
import Month from "./components/Month.jsx";

const votes = [{ status: true, isCurrentUserVote: true }];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Frontpage />
    <button className='image close'> </button>
    <button className='image share'> </button>
    <button className='image calendar'> </button> */}
    <Day
      dayNumber="1"
      votes={[
        { status: true, isCurrentUserVote: true },
        { status: true, isCurrentUserVote: false },
      ]}
    />
    <Day
      dayNumber="2"
      votes={[
        { status: false, isCurrentUserVote: true },
        { status: false, isCurrentUserVote: false },
      ]}
    />
    <Day
      dayNumber="3"
      hidden={false}
      votes={[
        { status: true, isCurrentUserVote: true },
        { status: false, isCurrentUserVote: false },
      ]}
    />
    <Day dayNumber="4" votes={[]} hidden />
    <Month year="2024" monthNumber="9"></Month>
    <Month year="2024" monthNumber="10"></Month>
  </StrictMode>
);
