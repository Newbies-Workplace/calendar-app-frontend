import "../App.css";
import style from "./day.module.css";
import { useEffect, useState } from "react";
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
  const [fill, setFill] = useState("bg-[#ebebec]");
  const currentVote = props.votes.find((vote) => vote.isCurrentUserVote);

  useEffect(() => {
    if (props.votes.length <= 0) {
      return;
    }
    if (
      props.votes.every((vote) => {
        return vote.status == true;
      })
    ) {
      setFill("bg-green-500");
    } else if (
      props.votes.every((vote) => {
        return vote.status == false;
      })
    ) {
      setFill("bg-red-300");
    } else {
      setFill("bg-yellow-500");
    }
  }, [props.votes]);

  return (
    <>
      <div
        className={` block w-[100px] h-[100px] bg-no-repeat flex flex-col justify-between items-start relative p-1 rounded-lg border-4 ${fill} `}
      >
        <div className={style.circleRow}>
          <div
            className={`w-[16px] h-[16px] rounded-full border border-black ${currentVote === undefined ? "bg-[#ebebec]" : currentVote.status ? "bg-green-400" : "bg-red-500"}`}
          />

          {props.votes.map((value, index) => {
            if (!value.isCurrentUserVote)
              return (
                <div
                  key={index}
                  className={`w-[16px] h-[16px] rounded-full  border-black ${value.status ? "bg-green-400" : "bg-red-500"}`}
                />
              );
          })}
          {/*${props.obj.color}*/}
        </div>
        <div className={style.number}>{props.dayNumber}</div>
      </div>
    </>
  );
}

export default Day;
