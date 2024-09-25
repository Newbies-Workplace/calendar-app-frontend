import Month from "../components/Month.jsx";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
function Calendar(props) {
  const repeats =
    dayjs(`${props.start}`).format("MM") < dayjs(`${props.end}`).format("MM")
      ? 2
      : 1;
  const start = dayjs(`${props.start}`).format("DD-MM-YYYY");
  const end = dayjs(`${props.end}`).format("DD-MM-YYYY");
  return (
    <>
      {repeats === 1 && (
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
      {repeats === 2 && (
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
      )}
    </>
  );
}
export default Calendar;
