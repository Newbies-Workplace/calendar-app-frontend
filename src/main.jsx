import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
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
