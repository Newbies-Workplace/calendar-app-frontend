import dayjs from "dayjs";
import React, { useEffect } from "react";
import Button from "./Button";

export const DayModal = (props) => {
	let currentVotes = props.votelist?.filter(
		(vote) =>
			dayjs(vote.day).format("YYYY-MM-DD") ===
			dayjs(props.dayDate).format("YYYY-MM-DD"),
	) || { votes: [] };

	useEffect(() => {
		currentVotes = props.votelist?.filter(
			(vote) =>
				dayjs(vote.day).format("YYYY-MM-DD") ===
				dayjs(props.dayDate).format("YYYY-MM-DD"),
		) || { votes: [] };
	}, [props]);

	return (
		<>
			<div className="text-left p-5 rounded-[10px]">
				<div className="text-xl  text-[#333] mb-[15px]">
					{dayjs(`${props.dayDate}`).format("D MMMM YYYY - dddd")}
				</div>
				<hr className="flex-grow border-t-2 border-gray-400 rounded-full" />
				{/* <!-- Available section --> */}
				<div className="text-base text-center font-medium text-[#666] mt-2.5 mb-[5px] mx-0">
					Dostępni
				</div>
				<div className="flex justify-left flex-wrap gap-2.5 mb-2.5">
					{currentVotes.length <= 0 ? (
						<div>Brak głosów</div>
					) : (
						currentVotes.map((vote, index) => {
							if (vote.status === "AVAILABLE") {
								return (
									<div
										key={index}
										className="inline-flex items-center text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent bg-[#e6ffe6] border-[#000000] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#28a745] before:mr-2 before:rounded-[50%]"
									>
										{
											props.participants.find(
												(participant) =>
													participant.participant_id === vote.participant_id,
											)?.name
										}
									</div>
								);
							}
							return null;
						})
					)}
				</div>

				<div className="text-base text-center font-medium text-[#666] mt-2.5 mb-[5px] mx-0">
					Niedostępni
				</div>
				<div className="flex justify-left flex-wrap gap-2.5 mb-2.5">
					{currentVotes.length > 0 ? (
						currentVotes.map((vote, index) => {
							if (vote.status === "NOT_AVAILABLE") {
								return (
									<div
										key={index}
										className="inline-flex items-center text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent bg-[#ffe6e6] border-[#000000] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#dc3545] before:mr-2 before:rounded-[50%]"
									>
										{
											props.participants.find(
												(participant) =>
													participant.participant_id === vote.participant_id,
											)?.name
										}
									</div>
								);
							}
							return null;
						})
					) : (
						<div>Brak głosów</div>
					)}
				</div>

				<div className="flex flex-row gap-2">
					<Button
						className="main"
						onClick={() => props.onClick(props.dayDate, true)}
					>
						Jestem dostępny
					</Button>
					<Button
						className="main"
						onClick={() => props.onClick(props.dayDate, false)}
					>
						Jestem niedostępny
					</Button>
				</div>
			</div>
		</>
	);
};
