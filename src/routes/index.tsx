import Button from "@/components/Button";
import { useParticipantCookie } from "@/hooks/useParticipantCookie";
import { Event } from "@/types/responses";
import { myFetch } from "@/util/myFetch";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";

const BACKEND_URL = process.env.CALENDAR_BACKEND_URL;

export const Route = createFileRoute("/")({
  component: CreateEventPage,
});

type EventForm = Omit<Event, "owner"> & { owner: string };

function CreateEventPage() {
  const { saveParticipantToCookie } = useParticipantCookie();
  const today = new Date();
  const defaultValue = new Date(today).toISOString().split("T")[0];
  const week = today.setDate(today.getDate() + 7);
  const defaultValue2 = new Date(week).toISOString().split("T")[0];
  const datetimestr = `${defaultValue}T00:00`;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventForm>({
    defaultValues: {
      name: "",
      description: "",
      voting_end: "",
      start: defaultValue,
      end: defaultValue2,
      owner: "",
    },
    mode: "all",
  });
  const [start, end] = watch(["start", "end"]);

  const onSubmit = (data: EventForm) => {
    myFetch<Event>(`${BACKEND_URL}/rest/events`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((event) => {
        saveParticipantToCookie(event.id, event.owner);

        navigate({ to: `/calendar/${event.id}` });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1 className="text-black border border-black bg-gray-100 p-4 rounded-lg">
        Planowanie wydarzeń
      </h1>

      <form className="text-lg leading-tight" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-black object-top text-left">
            Nazwa wydarzenia
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
            Opis wydarzenia
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
            Czas zakończenia głosowania
          </label>
          <input
            className="border border-black bg-gray-100 p-2 rounded-lg text-black"
            type="datetime-local"
            id="voting_end"
            lang="pl"
            min={datetimestr}
            {...register("voting_end", { required: true })}
          />
          {errors.voting_end && (
            <div className="text-red-500 text-sm">
              Czas zakończenia głosowania jest wymagany
            </div>
          )}

          <div className="flex space-x-5 w-full">
            <div className="flex flex-col gap-2 w-1/2">
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
                lang="pl"
                {...register("start", {
                  validate: () => dayjs(start).isBefore(dayjs(end)),
                })}
              />
            </div>

            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="end" className="text-black object-top text-left">
                Koniec terminów
              </label>
              <input
                className="border border-black bg-gray-100 p-2 rounded-lg text-black"
                type="date"
                id="end"
                lang="pl"
                {...register("end", {
                  validate: () => dayjs(start).isBefore(dayjs(end)),
                })}
              />
            </div>
          </div>
          {(errors.start || errors.end) && (
            <div className="text-red-500 text-sm">
              Początek głosowania powinien być przed końcem
            </div>
          )}

          <label className="text-black object-top text-left" htmlFor={"owner"}>
            Twój nick
          </label>
          <input
            id={"owner"}
            {...register("owner", { required: true })}
            placeholder="Wpisz swój nick"
            className="border border-black bg-gray-100 p-2 rounded-lg text-black"
          />
          {errors.owner && (
            <div className="text-red-500 text-sm">Twój nick jest wymagany</div>
          )}
          <Button onClick={() => {}}>Gotowe</Button>
        </div>
      </form>
    </>
  );
}
