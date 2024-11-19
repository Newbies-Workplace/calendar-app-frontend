import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";

const BACKEND_URL = process.env.CALENDAR_BACKEND_URL;

export const Route = createFileRoute("/")({
	component: Front,
});

function Front() {
	const today = new Date();
	const defaultValue = new Date(today).toISOString().split("T")[0];
	const week = today.setDate(today.getDate() + 7);
	const defaultValue2 = new Date(week).toISOString().split("T")[0];
	const datetimestr = `${defaultValue}T00:00`;
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [first, setFirst] = useState("");
	const [second, setSecond] = useState("");

	const onSubmit = (data) => {
		const body = {
			...data,
		};

		fetch(`${BACKEND_URL}/rest/events`, {
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		})
			.then((response) => response.json())
			.then((data) => {
				Cookies.set(data.id, JSON.stringify(data.owner));

				navigate({ to: `/calendar/${data.id}` });
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<div>
				<h1 className="text-black border border-black bg-gray-100 p-4 rounded-lg">
					Planowanie wydarzeń
				</h1>
				<br />
			</div>

			<form className="text-lg leading-tight" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-2">
					<label htmlFor="name" className="text-black object-top text-left">
						Nazwa wydarzenia{" "}
					</label>
					<input
						className="border border-black bg-gray-100 p-2 rounded-lg text-black"
						type="text"
						id="name"
						placeholder="Wpisz nazwę"
						{...register("name", { required: true })}
					/>
					{errors.name && (
						<div className="text-red-500 text-sm">Nazwa jest wymagana</div>
					)}
					<label
						htmlFor="description"
						className="text-black object-top text-left"
					>
						Opis wydarzenia{" "}
					</label>
					<textarea
						className="border border-black bg-gray-100 p-2 rounded-lg text-black"
						id="description"
						placeholder="Wpisz opis (opcjonalne)"
						{...register("description")}
					/>
					<label
						htmlFor="voting_end"
						className="text-black object-top text-left"
					>
						Do kiedy otwarte głosowanie
					</label>
					<input
						className="border border-black bg-gray-100 p-2 rounded-lg text-black"
						type="datetime-local"
						id="voting_end"
						lang="pl"
						min={datetimestr}
						{...register("voting_end", { required: "Potrzebny czas" })}
					/>
					<div className="flex space-x-5 w-full">
						<div className="flex flex-col w-1/2">
							<label
								htmlFor="start"
								className="text-black object-top text-left"
							>
								Początek terminów
							</label>
							<input
								className="border border-black bg-gray-100 p-2 rounded-lg text-black"
								type="date"
								id="start"
								defaultValue={defaultValue}
								lang="pl"
								{...register("start", {
									validate: (value) => {
										setFirst(value);

										return first <= second;
									},
								})}
							/>

							{errors.start && (
								<div className="text-red-500 text-sm">
									Pierwsza data musi być przed drugą
								</div>
							)}
						</div>

						<div className="flex flex-col w-1/2">
							<label htmlFor="end" className="text-black object-top text-left">
								Koniec terminów{" "}
							</label>
							<input
								className="border border-black bg-gray-100 p-2 rounded-lg text-black"
								type="date"
								id="end"
								defaultValue={defaultValue2}
								lang="pl"
								{...register("end", {
									validate: (value) => {
										setSecond(value);
									},
								})}
							/>
						</div>
					</div>

					<label className="text-black object-top text-left" htmlFor={"owner"}>
						Właściciel
					</label>
					<input
						id={"owner"}
						{...register("owner", { required: true })}
						placeholder="Wpisz imię właściciela"
						className="border border-black bg-gray-100 p-2 rounded-lg text-black"
					/>
					{errors.owner && (
						<div className="text-red-500 text-sm">
							Właściciel jest wymagany{" "}
						</div>
					)}
					<Button>Gotowe</Button>
				</div>
			</form>
		</>
	);
}
