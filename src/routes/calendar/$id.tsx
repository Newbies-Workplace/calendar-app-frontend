import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Calendar } from "../../components/Calendar";
import { DayModal } from "../../components/DayModal";
import { Modal } from "../../components/Modal";
import { NameModal } from "../../components/NameModal";
import { RightPanel } from "../../components/RightPanel";
import { Toolbar } from "../../components/Toolbar";

const BACKEND_URL = process.env.CALENDAR_BACKEND_URL;

export const Route = createFileRoute("/calendar/$id")({
	component: CalendarPage,
});

function CalendarPage() {
	const { id } = Route.useParams();

	const nameCookieKey = `${id}`;
	const cookieName = Cookies.get(nameCookieKey);
	const [activeModal, setActiveModal] = useState(
		cookieName === undefined ? "name" : null,
	);
	const [modalDate, setModalDate] = useState<string | null>(null);
	const [event, setEvent] = useState();
	const [votelist, setVotelist] = useState([]);
	const [participants, setParticipants] = useState([]);
	const dayM = (name, date) => {
		setModalDate(date);
		setActiveModal(name);
	};
	const onDismiss = () => {
		setActiveModal(null);
	};
	const setParticipantCookie = (data) => {
		Cookies.set(nameCookieKey, JSON.stringify(data));
	};

	useEffect(() => {
		const eventSource = new EventSource(`${BACKEND_URL}/event/${id}`);

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);

			setVotelist((prevVotelist) => {
				const existingVoteIndex = prevVotelist.findIndex(
					(v) => v.day === data.day && v.participant_id === data.participant_id,
				);

				if (existingVoteIndex !== -1) {
					const updatedVotelist = [...prevVotelist];
					updatedVotelist[existingVoteIndex] = data;
					return updatedVotelist;
				} else {
					return [...prevVotelist, data];
				}
			});
		};

		return () => {
			eventSource.close();
		};
	}, [id]);

	useEffect(() => {
		//nie dodawać ciasteczek do getów :)
		fetch(`${BACKEND_URL}/rest/events/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setEvent(data);
			})
			.catch((error) => console.log(error));

		fetch(`${BACKEND_URL}/rest/events/${id}/statuses`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setVotelist(data);
			})
			.catch((error) => console.log(error));

		fetch(`${BACKEND_URL}/rest/events/${id}/participants`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setParticipants(data);
			})
			.catch((error) => console.log(error));
	}, [id]);

	const replaceVote = (data, day) => {
		const cookie = JSON.parse(Cookies.get(nameCookieKey));
		setVotelist((prevVotelist) => {
			const existingVoteIndex = prevVotelist.findIndex(
				(v) =>
					dayjs(v.day).isSame(day, "day") &&
					v.participant_id === cookie.participant_id,
			);

			if (existingVoteIndex !== -1) {
				const updatedVotelist = [...prevVotelist];
				updatedVotelist[existingVoteIndex] = data;
				console.log("test ifa");
				return updatedVotelist;
			}
			return [...prevVotelist, data];
		});
	};

	const submitVote = (day, vote) => {
		const cookie = JSON.parse(Cookies.get(nameCookieKey));

		const body = { day: day, status: vote ? "AVAILABLE" : "NOT_AVAILABLE" };
		fetch(`${BACKEND_URL}/rest/events/${id}/statuses`, {
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				Participant: cookie.participant_id,
			},
			method: "PUT",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				//window.location.reload();
				replaceVote(data, day);
			})
			.catch((error) => console.log(error));
	};
	return (
		<>
			<div className={"flex w-screen h-screen text-black"}>
				<div className={"w-2/3"}>
					<div className={"bg-blue-700 text-white w-full h-12"}>
						<Toolbar />
					</div>
					<div
						className={
							"overflow-y-auto overflow-x-hidden h-[calc(100%-48px)] flex flex-col items-center gap-5"
						}
					>
						{event !== undefined && (
							<Calendar
								votelist={votelist}
								onClick={(name, date) => {
									dayM(name, date);
								}}
								start={event.start}
								end={event.end}
								cookieKey={nameCookieKey}
							/>
						)}
					</div>
				</div>

				<div className={"w-1/3 h-screen bg-gray-300 flex flex-col gap-2"}>
					{event !== undefined && (
						<RightPanel title={event.name} description={event.description} />
					)}
				</div>
			</div>

			{event !== undefined && (
				<Helmet>
					<meta property="og:title" content={event.name} />
					<meta property="og:description" content={event.description} />
					<title>{event.name}</title>
				</Helmet>
			)}

			{activeModal !== null && (
				<Modal onDismiss={onDismiss}>
					{activeModal === "day" && (
						<DayModal
							dayDate={modalDate}
							votelist={votelist}
							onClick={(day, vote) => {
								submitVote(day, vote);
								onDismiss();
							}}
							participants={participants}
						/>
					)}
					{activeModal === "name" && (
						<NameModal
							onSubmit={(prop) => {
								setParticipantCookie(prop);
							}}
							eventId={id}
						/>
					)}
				</Modal>
			)}
		</>
	);
}
