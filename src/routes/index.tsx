import Button from "@/components/Button";
import { useParticipantCookie } from "@/hooks/useParticipantCookie";
import { Event } from "@/types/responses";
import { myFetch } from "@/util/myFetch";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import useLocalStorage from "@/hooks/useLocalStorage";

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
  const voteendingtomorrow = dayjs()
    .add(24, "hours")
    .format("YYYY-MM-DDTHH:mm");
  const votingendtomorrow = new Date(voteendingtomorrow).toISOString();
  const defaultValue2 = new Date(week).toISOString().split("T")[0];
  const navigate = useNavigate();
  const [name, setName] = useLocalStorage("username", "");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventForm>({
    defaultValues: {
      name: "",
      description: "",
      voting_end: votingendtomorrow,
      start: defaultValue,
      end: defaultValue2,
      owner: name,
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
    <div className="flex min-h-screen h-screen w-screen overflow-hidden">
      <div className="flex-1 h-full bg-black flex-col justify-center items-center overflow-hidden relative hidden lg:flex">
        <div className="w-full h-full bg-[url('/tlo.jpg')] bg-center bg-cover blur-lg scale-110" />
        <div className="absolute flex-col justify-center items-center gap-2 flex">
          <img
            className="logo w-1/4 h-auto mb-4 transition-all duration-500"
            src="/icon.png"
            alt="logo"
          />
          <h1 className="text-white text-2xl lg:text-3xl font-bold italic text-center transition-all duration-500">
            Newbies Calendar
          </h1>
        </div>
      </div>
      <div className="flex-shrink-0 w-screen lg:w-1/3 min-w-[400px] h-full flex items-center justify-center bg-gray-50 p-10">
        <div className="w-full max-w-md">
          <h1 className="text-black border border-black bg-gray-100 p-4 rounded-lg w-full text-center mb-7 text-4xl font-bold font-mono">
            Stwórz wydarzenie
          </h1>
          <form
            className="text-lg leading-tight"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2 p-5">
              <Input
                label="Nazwa wydarzenia"
                type="text"
                placeholder="Wpisz nazwę wydarzenia"
                {...register("name", { required: "Nazwa jest wymagana" })}
                error={errors.name?.message}
              />

              <Input
                label="Opis wydarzenia"
                multiline
                placeholder="Wpisz opis wydarzenia (opcjonalne)"
                {...register("description")}
              />

              <Input
                label="Czas zakończenia głosowania"
                type="datetime-local"
                placeholder="Wybierz czas zakończenia"
                min={voteendingtomorrow}
                {...register("voting_end", {
                  required: "Czas zakończenia głosowania jest wymagany",
                })}
                error={errors.voting_end?.message}
              />

              <div className="flex space-x-5 w-full pt-5">
                <Input
                  label="Początek terminów"
                  type="date"
                  placeholder="Wybierz początek"
                  {...register("start", {
                    validate: () =>
                      dayjs(start).isBefore(dayjs(end)) ||
                      "Początek musi być przed końcem",
                  })}
                  error={errors.start?.message}
                />
                <Input
                  label="Koniec terminów"
                  type="date"
                  placeholder="Wybierz koniec"
                  {...register("end", {
                    validate: () =>
                      dayjs(start).isBefore(dayjs(end)) ||
                      "Koniec musi być po początku",
                  })}
                  error={errors.end?.message}
                />
              </div>

              <Input
                label="Twój nick"
                type="text"
                placeholder="Wpisz swój nick"
                {...register("owner", { required: "Twój nick jest wymagany" })}
                error={errors.owner?.message}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <button className="bg-gray-800 text-white hover:bg-gray-600 rounded-lg mt-4 h-11">
                Szukaj terminów
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
