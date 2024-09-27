import "../App.css";
import style from "./day.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
{
  /* 
{
    dayNumber: string;  
    votes: [status,isCurrentUserVote,];
} 
*/
}
function Day(props) {
  //console.log(JSON.stringify(props));

  const [backgroundColor, setBackgroundColor] = useState("bg-[#ebebec]");

  const cookie =
    Cookies.get(props.cookieKey) !== undefined
      ? JSON.parse(Cookies.get(props.cookieKey))
      : {};
  const currentVote = props.votes.find(
    (vote) => vote.participant_id === cookie.participant_id
  );
  const [visiblity, setVisibility] = useState("");

  useEffect(() => {
    if (props.hidden === true) {
      setBackgroundColor("bg-gray-400  bg-opacity-50");
      setVisibility("invisible");
      return;
    }
    if (props.votes.length <= 0) {
      return;
    }
    if (
      props.votes.every((vote) => {
        return vote.status == "AVAILABLE";
      })
    ) {
      setBackgroundColor("bg-green-400");
    } else if (
      props.votes.every((vote) => {
        return vote.status == "NOT_AVAILABLE";
      })
    ) {
      setBackgroundColor("bg-red-400");
    } else {
      setBackgroundColor("bg-yellow-500");
    }
  }, [props.votes]);
  const testufunc = () => {
    console.log("hidden");
  };
  return (
    <>
      <div onClick={props.hidden ? testufunc : props.onClick}>
        <div
          className={` block w-[100px] h-[100px] bg-no-repeat flex flex-col justify-between items-start relative p-1 rounded-lg border-transparent border-4 ${backgroundColor} `}
        >
          <div className={style.circleRow}>
            <div
              className={`w-[16px] h-[16px] rounded-full border border-black ${currentVote === undefined ? "bg-[#ebebec]" : currentVote.status === "AVAILABLE" ? "bg-green-500" : "bg-red-500"} ${visiblity}`}
            />

            {props.votes.map((value, index) => {
              if (value.participant_id != cookie.participant_id)
                return (
                  <div
                    key={index}
                    className={`w-[16px] h-[16px] rounded-full  border-black ${value.status === "AVAILABLE" ? "bg-green-500" : "bg-red-500"} ${visiblity}`}
                  />
                );
            })}
          </div>
          <div className={style.number}>{props.dayNumber}</div>
        </div>
      </div>
    </>
  );
}

export default Day;

/* 
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
      <Day dayNumber="4" votes={[]} hidden /> */
