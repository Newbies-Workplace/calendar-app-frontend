import { Day } from "@/components/Day";
import { Vote } from "@/types/responses";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import React from "react";

dayjs.extend(isBetween);

interface MonthProps {
	eventId: string;
	year: number;
	monthNumber: number;
	voting_start: string;
	voting_end: string;
	votes: Vote[];
	onDayClick: (date: string) => void;
}

export const Month: React.FC<MonthProps> = ({
	eventId,
	year,
	monthNumber,
	voting_start,
	voting_end,
	votes,
	onDayClick,
}) => {
	const daysInMonth = dayjs(`${year}-${monthNumber}`).daysInMonth();
	const startDayOfWeekDayJs = dayjs(`${year}-${monthNumber}-01`).day();
	const weekDays = ["pn", "wt", "śr", "cz", "pt", "so", "nd"];
	const daysArray = Array.from(
		{ length: daysInMonth },
		(_, index) => index + 1,
	);
	const monthName = dayjs(`${year}-${monthNumber}`).format("MMMM");
	const startDayOfWeek = startDayOfWeekDayJs === 0 ? 7 : startDayOfWeekDayJs;

	const emptyDays = Array.from(
		{ length: startDayOfWeek },
		(_, index) => index + 1,
	);

	return (
		<div className="flex flex-col items-center w-[700px]">
			<b className="text-black text-7xl w-full text-left p-4 mt-10">
				{monthName}
			</b>
			<div className="grid grid-cols-[repeat(7,1fr)] w-[700px] gap-2.5 mb-2.5">
				{weekDays.map((day, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey:
						key={index}
						className="w-24 text-center font-bold gap-6 border-black border-2 box-border text-black"
					>
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-[repeat(7,1fr)] w-[700px] gap-2.5">
				{emptyDays.slice(0, startDayOfWeek - 1).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey:
					<div key={index} />
				))}
				{daysArray.map((day, index) => {
					const formattedMonth = String(monthNumber).padStart(2, "0");
					const formattedDay = String(index + 1).padStart(2, "0");

					const votefound = votes.filter((vote) =>
						dayjs(`${year}-${formattedMonth}-${formattedDay}`).isSame(
							vote.day,
							"day",
						),
					);
					return (
						<Day
							// biome-ignore lint/suspicious/noArrayIndexKey:
							key={index}
							votes={votefound}
							dayNumber={index + 1}
							eventId={eventId}
							hidden={
								!dayjs(`${year}-${monthNumber}-${index + 1}`).isBetween(
									voting_start,
									voting_end,
									"day",
									"[]",
								)
							}
							onClick={() =>
								onDayClick(
									dayjs(`${year}-${monthNumber}-${index + 1}`).format(
										"YYYY-MM-DD",
									),
								)
							}
						/>
					);
				})}
			</div>
		</div>
	);
};
