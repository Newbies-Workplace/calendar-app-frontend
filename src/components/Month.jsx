import "../App.css";
import dayjs from "dayjs";
import Day from "./Day.jsx";
import { useEffect, useState } from "react";

function Month(props) {
  const daysInMonth = dayjs(`${props.year}-${props.monthNumber}`).daysInMonth();
  let startDayOfWeek = dayjs(`${props.year}-${props.monthNumber}-01`).day(); // Sunday = 0, Monday = 1, etc.
  const weekDays = ["pn", "wt", "śr", "cz", "pt", "so", "nd"];
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );
  useEffect(() => {
    if (startDayOfWeek === 0) startDayOfWeek = 7;
  }, []);
  return (
    <>
      <div className="flex flex-col items-center w-[700px]">
        <div className="grid grid-cols-7 w-[700px] gap-10 mb-2.5">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="w-[110px] text-center font-[bold] gap-2.5 border-black border-2 box-border"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(7,1fr)] w-[700px] gap-2.5 w-full ">
          {/* test */}
          {daysArray.map((day, index) => (
            <Day key={index} votes={[]} dayNumber={index + 1} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Month;
