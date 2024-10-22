import Month from "./Month.js";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React from "react";
import { Vote } from "./Vote.js";
dayjs.extend(duration);



interface CalendarProps {
  start: string;
  end: string;
  votelist: Vote[];
  cookieKey: string;
  onClick: (name: string, date: string) => void;
}

function Calendar({ start, end, votelist, cookieKey, onClick }: CalendarProps) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const repeats =
    (endDate.year() - startDate.year()) * 12 +
    (endDate.month() - startDate.month()) +
    1;

  return (
    <>
      {[...Array(repeats)].map((_, i) => (
        <div key={i}>
          <Month
            year={parseInt(dayjs(start).add(i, "month").format("YYYY"), 10)}
            monthNumber={parseInt(dayjs(start).add(i, "month").format("MM"), 10)}
            start={dayjs(start).format("YYYY-MM-DD")}
            end={dayjs(end).format("YYYY-MM-DD")}
            info={votelist}
            dayClick={(name, date) => {
              onClick(name, date);
            }}
            cookieKey={cookieKey}
          />
        </div>
      ))}
    </>
  );
}

export default Calendar;