import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Frontpage from "./pages/Frontpage.jsx";
import "./index.css";
import SecondPage from "./pages/SecondPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Frontpage />
    <button className='image close'> </button>
    <button className='image share'> </button>
    <button className='image calendar'> </button> */}
    <SecondPage />
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
