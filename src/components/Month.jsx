import "../App.css";
import dayjs from "dayjs";
import Day from "./Day.jsx";
import { useEffect, useState } from "react";

function Month(props) {
  const daysInMonth = dayjs(`${props.year}-${props.monthNumber}`).daysInMonth();
  const [startDayOfWeek, setStartDay] = useState(
    dayjs(`${props.year}-${props.monthNumber}-01`).day()
  ); // Sunday = 0, Monday = 1, etc.
  const weekDays = ["pn", "wt", "śr", "cz", "pt", "so", "nd"];
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );
  const monthName = dayjs(`${props.year}-${props.monthNumber}`).format("MMMM");
  useEffect(() => {
    if (startDayOfWeek === 0) {
      setStartDay(7);
    }
  }, [startDayOfWeek]);
  const emptyDays = Array.from(
    { length: startDayOfWeek },
    (_, index) => index + 1
  );

  return (
    <>
      <div className="flex flex-col items-center w-[700px]">
        <b>{monthName}</b>
        <div className="grid grid-cols-[repeat(7,1fr)] w-[700px] gap-2.5 mb-2.5">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="w-[100px] text-center font-[bold] gap-6 border-black border-2 box-border"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(7,1fr)] w-[700px] gap-2.5 w-full ">
          {emptyDays.slice(0, startDayOfWeek - 1).map((day, index) => (
            <div key={index} />
          ))}
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

/*  */
