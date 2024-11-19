import { useParticipantCookie } from "@/hooks/useParticipantCookie";
import { Vote } from "@/types/responses";
import React, { useEffect, useState } from "react";

interface DayProps {
	eventId: string;
	votes: Vote[];
	dayNumber: number;
	hidden: boolean;
	onClick: () => void;
}

export const Day: React.FC<DayProps> = ({
	eventId,
	votes,
	dayNumber,
	hidden,
	onClick,
}) => {
	const [backgroundColor, setBackgroundClass] = useState<string>("bg-gray-200");
	const [visibility, setVisibility] = useState<string>("");
	const { getParticipantFromCookie } = useParticipantCookie();
	const participant = getParticipantFromCookie(eventId);

	const currentVote = votes.find(
		(vote) => vote.participant_id === participant?.participant_id,
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
			setBackgroundClass("bg-status-available/50");
		} else if (votes.every((vote) => vote.status === "NOT_AVAILABLE")) {
			setBackgroundClass("bg-status-not-available/50");
		} else {
			setBackgroundClass("bg-status-mixed/50");
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
									? "bg-status-available"
									: "bg-status-not-available"
								: ""
						} ${visibility}`}
					/>
					{votes.map((vote) => {
						if (vote.participant_id === participant?.participant_id) {
							return null;
						}

						return (
							<div
								key={vote.termin_status_id}
								className={`w-4 h-4 rounded-full border border-black ${
									vote.status === "AVAILABLE"
										? "bg-status-available"
										: "bg-status-not-available"
								} ${visibility}`}
							/>
						);
					})}
				</div>
				<div className="absolute bottom-1 right-1 text-lg font-bold text-black">
					{dayNumber}
				</div>
			</div>
		</div>
	);
};
