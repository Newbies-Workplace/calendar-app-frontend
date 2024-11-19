import { Vote } from "@/types/responses";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

interface DayProps {
	votes: Vote[];
	dayNumber: number;
	cookieKey: string;
	hidden: boolean;
	onClick: () => void;
}

export const Day: React.FC<DayProps> = ({
	votes,
	dayNumber,
	cookieKey,
	hidden,
	onClick,
}) => {
	const [backgroundColor, setBackgroundClass] = useState<string>("bg-gray-200");
	const [visibility, setVisibility] = useState<string>("");
	const cookie = Cookies.get(cookieKey)
		? JSON.parse(Cookies.get(cookieKey) as string)
		: {};

	const currentVote = votes.find(
		(vote) => vote.participant_id === cookie.participant_id,
	);

	useEffect(() => {
		if (hidden) {
			setBackgroundClass("bg-gray-500");
			setVisibility("invisible");
			return;
		}

		setBackgroundClass("bg-white");

		if (votes.length <= 0) {
			return;
		}

		if (votes.every((vote) => vote.status === "AVAILABLE")) {
			setBackgroundClass("bg-green-500");
		} else if (votes.every((vote) => vote.status === "NOT_AVAILABLE")) {
			setBackgroundClass("bg-red-500");
		} else {
			setBackgroundClass("bg-yellow-500");
		}
	}, [votes, hidden]);

	return (
		<div
			onClick={hidden ? undefined : onClick}
			className={`${hidden ? "opacity-30" : ""}`}
		>
			<div
				className={`size-24 border border-black rounded-lg flex flex-col justify-between items-start relative p-2 ${backgroundColor}`}
			>
				<div className="flex gap-1 flex-wrap">
					<div
						className={`w-4 h-4 rounded-full border border-black ${
							currentVote
								? currentVote.status === "AVAILABLE"
									? "bg-green-500"
									: "bg-red-500"
								: ""
						} ${visibility}`}
					/>
					{votes.map((vote, index) => {
						if (vote.participant_id !== cookie.participant_id) {
							return (
								<div
									key={vote.termin_status_id}
									className={`w-4 h-4 rounded-full border border-black ${
										vote.status === "AVAILABLE" ? "bg-green-500" : "bg-red-500"
									} ${visibility}`}
								/>
							);
						}
						return null;
					})}
				</div>
				<div className="absolute bottom-1 right-1 text-lg font-bold text-black">
					{dayNumber}
				</div>
			</div>
		</div>
	);
};
