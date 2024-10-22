import "../App.css";
import dayjs from "dayjs";
import Day from "./Day";
import { useEffect, useState } from "react";
import isBetween from "dayjs/plugin/isBetween";
import React from "react";
import { Vote } from "./Vote";
dayjs.extend(isBetween);

interface MonthProps {
  year: number;
  monthNumber: number;
  start: string;
  end: string;
  info: Vote[];
  cookieKey: string;
  dayClick: (type: string, date: string) => void;
}

function Month({
  year,
  monthNumber,
  start,
  end,
  info,
  dayClick,
  cookieKey,
}: MonthProps) {
  const daysInMonth = dayjs(`${year}-${monthNumber}`).daysInMonth();
  const startDayOfWeekDayJs = dayjs(`${year}-${monthNumber}-01`).day();
  const weekDays = ["pn", "wt", "śr", "cz", "pt", "so", "nd"];
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const monthName = dayjs(`${year}-${monthNumber}`).format("MMMM");
  const startDayOfWeek = startDayOfWeekDayJs === 0 ? 7 : startDayOfWeekDayJs;

  const emptyDays = Array.from({ length: startDayOfWeek }, (_, index) => index + 1);

  return (
    <div className="flex flex-col items-center w-[700px]">
      <b>{monthName}</b>
      <div className="grid grid-cols-[repeat(7,1fr)] w-[700px] gap-2.5 mb-2.5">
        {weekDays.map((day, index) => (
          <div key={index} className="w-[100px] text-center font-bold gap-6 border-black border-2 box-border">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(7,1fr)] w-[700px] gap-2.5 w-full">
        {emptyDays.slice(0, startDayOfWeek - 1).map((day, index) => (
          <div key={index} />
        ))}
        {daysArray.map((day, index) => {
          const formattedMonth = String(monthNumber).padStart(2, "0");
          const formattedDay = String(index + 1).padStart(2, "0");
          const votefound = info.filter((vote) =>
            dayjs(`${year}-${formattedMonth}-${formattedDay}`).isSame(vote.day, "day")
          );
          return (
            <Day
              key={index}
              votes={votefound}
              dayNumber={index + 1}
              cookieKey={cookieKey}
              hidden={
                !dayjs(`${year}-${monthNumber}-${index + 1}`).isBetween(start, end, "day", "[]")
              }
              onClick={() => {
                dayClick("day", dayjs(`${year}-${monthNumber}-${index + 1}`).format("YYYY-MM-DD"));
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Month;