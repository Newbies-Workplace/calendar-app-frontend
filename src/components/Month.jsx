import "../App.css";
import dayjs from "dayjs";
import Day from "./Day.tsx";
import { useEffect, useState } from "react";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
function Month(props) {
  const daysInMonth = dayjs(`${props.year}-${props.monthNumber}`).daysInMonth();
  const startDayOfWeekDayJs = dayjs(
    `${props.year}-${props.monthNumber}-01`
  ).day();
  const weekDays = ["pn", "wt", "śr", "cz", "pt", "so", "nd"];
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );
  const monthName = dayjs(`${props.year}-${props.monthNumber}`).format("MMMM");
  const startDayOfWeek = startDayOfWeekDayJs === 0 ? 7 : startDayOfWeekDayJs;

  const emptyDays = Array.from(
    { length: startDayOfWeek },
    (_, index) => index + 1
  );
  const voteBeginDate = !dayjs(`${props.start}`).isSame(
    `${props.year}-${props.monthNumber}`,
    "month"
  )
    ? 1
    : parseInt(dayjs(`${props.start}`).format("DD"));
  const voteEndDate = !dayjs(`${props.start}`).isSame(
    `${props.year}-${props.monthNumber}`,
    "month"
  )
    ? daysInMonth
    : parseInt(dayjs(`${props.end}`).endOf("month").format("DD"));
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

          {daysArray.map((day, index) => {
            const formattedMonth = String(props.monthNumber).padStart(2, "0");
            const formattedDay = String(index + 1).padStart(2, "0");
            const votefound = props.info.filter((vote) =>
              dayjs(`${props.year}-${formattedMonth}-${formattedDay}`).isSame(
                vote.day,
                "day"
              )
            );
            return (
              <Day
                key={index}
                votes={votefound}
                dayNumber={index + 1}
                cookieKey={props.cookieKey}
                hidden={
                  !dayjs(
                    `${props.year}-${props.monthNumber}-${index + 1}`
                  ).isBetween(`${props.start}`, `${props.end}`, "day", "[]")
                }
                onClick={() => {
                  props.dayClick(
                    "day",
                    dayjs(
                      `${props.year}-${props.monthNumber}-${index + 1}`
                    ).format("YYYY-MM-DD")
                  );
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Month;

/*  */
