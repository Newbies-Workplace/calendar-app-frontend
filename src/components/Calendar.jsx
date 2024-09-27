import Month from "../components/Month.jsx";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
function Calendar(props) {
  const startDate = dayjs(props.start);
  const endDate = dayjs(props.end);

  // Calculate the difference in months, accounting for year differences
  const repeats =
    (endDate.year() - startDate.year()) * 12 +
    (endDate.month() - startDate.month()) +
    1;

  const start = dayjs(`${props.start}`).format("DD-MM-YYYY");
  const end = dayjs(`${props.end}`).format("DD-MM-YYYY");

  return (
    <>
      {[...Array(repeats)].map((_, i) => {
        return (
          <div key={i}>
            <Month
              year={dayjs(`${props.start}`).add(i, "month").format("YYYY")}
              monthNumber={dayjs(`${props.start}`).add(i, "month").format("MM")}
              start={dayjs(`${props.start}`).format("YYYY-MM-DD")}
              end={dayjs(`${props.end}`).format("YYYY-MM-DD")}
              info={props.votelist}
              dayClick={(name, number) => {
                props.onClick(name, number);
              }}
              cookieKey={props.cookieKey}
            ></Month>
          </div>
        );
      })}

      {/* {repeats === 1 && (
        <div>
          <Month
            year={dayjs(`${props.start}`).format("YYYY")}
            monthNumber={dayjs(`${props.start}`).format("M")}
            start={dayjs(`${props.start}`).format("YYYY-MM-DD")}
            end={dayjs(`${props.end}`).format("YYYY-MM-DD")}
            info={props.votelist}
            dayClick={(number) => {
              props.onClick(number);
            }}
          ></Month>
        </div>
      )}
      {repeats && (
        <div>
          <Month
            year={dayjs(`${props.start}`).format("YYYY")}
            monthNumber={dayjs(`${props.start}`).format("M")}
            start={dayjs(`${props.start}`).format("YYYY-MM-DD")}
            end={dayjs(`${props.start}`).endOf("month").format("YYYY-MM-DD")}
            info={props.votelist}
            dayClick={(name, date) => {
              props.onClick(name, date);
            }}
          ></Month>
          <br />
          <Month
            year={dayjs(`${props.end}`).format("YYYY")}
            monthNumber={dayjs(`${props.end}`).format("M")}
            start={dayjs(`${props.end}`).startOf("month").format("YYYY-MM-DD")}
            end={dayjs(`${props.end}`).format("YYYY-MM-DD")}
            info={props.votelist}
            dayClick={(name, date) => {
              props.onClick(name, date);
            }}
          ></Month>
        </div>
      )} */}
    </>
  );
}
export default Calendar;
