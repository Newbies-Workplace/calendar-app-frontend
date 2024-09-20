import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Frontpage from "./Frontpage.jsx";
import "./index.css";
import Day from "./components/Day.jsx";
import Month from "./components/Month.jsx";

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
    <Month
      year="2024"
      monthNumber="9"
      start="2024-09-07"
      end="2024-09-30"
      info={votelist}
    ></Month>
    <Month
      year="2024"
      monthNumber="10"
      start="2024-10-01"
      end="2024-10-25"
      info={votelist}
    ></Month>
  </StrictMode>
);

/* {
  "name": string;
  "description": string;
  "owner": string;
  "start": Date;
  "end": Date;
  "voting_end": DateTime;
} 
  
{
  year: string;
  month: string;
  start: string;
  end: string;
  voteList: [
  {
    daynumber: string;
    votes: []
  }
  ]
}


*/
