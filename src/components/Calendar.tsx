import { Month } from "@/components/Month";
import type { Vote } from "@/types/responses";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React from "react";

dayjs.extend(duration);

interface CalendarProps {
  start: string;
  end: string;
  votes: Vote[];
  eventId: string;
  onClick: (date: string) => void;
}

export const Calendar = ({
  start,
  end,
  votes,
  eventId,
  onClick,
}: CalendarProps) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const repeats =
    (endDate.year() - startDate.year()) * 12 +
    (endDate.month() - startDate.month()) +
    1;

  return (
    <>
      {[...Array(repeats)].map((_, i) => {
        const year = Number.parseInt(
          dayjs(start).add(i, "month").format("YYYY"),
          10,
        );
        const monthNumber = Number.parseInt(
          dayjs(start).add(i, "month").format("MM"),
          10,
        );

        return (
          <div key={`${year}-${monthNumber}`}>
            <Month
              year={year}
              monthNumber={monthNumber}
              voting_start={dayjs(start).format("YYYY-MM-DD")}
              voting_end={dayjs(end).format("YYYY-MM-DD")}
              votes={votes}
              onDayClick={(date) => onClick(date)}
              eventId={eventId}
            />
          </div>
        );
      })}
    </>
  );
};
