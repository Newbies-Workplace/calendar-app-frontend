import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React from "react";
import type { Vote } from "../types/responses";
import { Month } from "./Month";

dayjs.extend(duration);

interface CalendarProps {
	start: string;
	end: string;
	votelist: Vote[];
	cookieKey: string;
	onClick: (name: string, date: string) => void;
}

export const Calendar = ({
	start,
	end,
	votelist,
	cookieKey,
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
			{[...Array(repeats)].map((_, i) => (
				<div key={i}>
					<Month
						year={parseInt(dayjs(start).add(i, "month").format("YYYY"), 10)}
						monthNumber={parseInt(
							dayjs(start).add(i, "month").format("MM"),
							10,
						)}
						voting_start={dayjs(start).format("YYYY-MM-DD")}
						voting_end={dayjs(end).format("YYYY-MM-DD")}
						votes={votelist}
						dayClick={(name, date) => {
							onClick(name, date);
						}}
						cookieKey={cookieKey}
					/>
				</div>
			))}
		</>
	);
};
