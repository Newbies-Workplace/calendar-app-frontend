import "../App.css";
import style from "./day.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import React from "react";
import { Vote } from "./Vote";



interface DayProps {
  votes: Vote[];
  dayNumber: number;
  cookieKey: string;
  hidden: boolean;
  onClick: () => void;
}


const Day: React.FC<DayProps> = ({ votes, dayNumber, cookieKey, hidden, onClick }) => {
  const [backgroundColor, setBackgroundClass] = useState<string>(style.bgDefault);
  const [visibility, setVisibility] = useState<string>("");
  const cookie = Cookies.get(cookieKey)
    ? JSON.parse(Cookies.get(cookieKey) as string)
    : {};

  const currentVote = votes.find((vote) => vote.participant_id === cookie.participant_id);

  useEffect(() => {
    if (hidden) {
      setBackgroundClass(style.bgHidden);
      setVisibility("invisible");
      return;
    }

    setBackgroundClass(style.bgActive);

    if (votes.length <= 0) {
      return;
    }

    if (votes.every((vote) => vote.status === "AVAILABLE")) {
      setBackgroundClass(style.bgAvailable); // Zielone tło
    } else if (votes.every((vote) => vote.status === "NOT_AVAILABLE")) {
      setBackgroundClass(style.bgNotAvailable); // Czerwone tło
    } else {
      setBackgroundClass(style.bgMixed); // Żółte tło
    }
  }, [votes, hidden]);

 
  return (
<div onClick={hidden ? undefined : onClick}>
      <div className={`${style.day} ${backgroundColor}`}>
        <div className={style.circleRow}>
          <div
            className={`${style.circle} ${
              currentVote ? (currentVote.status === "AVAILABLE" ? style.available : style.notAvailable) : ""
            } ${visibility}`}
          />
          {votes.map((vote, index) => {
            if (vote.participant_id !== cookie.participant_id) {
              return (
                <div
                  key={index}
                  className={`${style.circle} ${vote.status === "AVAILABLE" ? style.available : style.notAvailable} ${visibility}`}
                />
              );
            }
            return null;
          })}
        </div>
        <div className={style.number}>{dayNumber}</div>
      </div>
    </div>
  );
  
}

export default Day;