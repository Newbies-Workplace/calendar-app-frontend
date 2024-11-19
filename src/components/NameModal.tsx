import Button from "@/components/Button";
import { Participant } from "@/types/responses";
import { myFetch } from "@/util/myFetch";
import React from "react";
import { useForm } from "react-hook-form";

const BACKEND_URL = process.env.CALENDAR_BACKEND_URL;

interface NameForm {
  name: string;
}

interface NameModalProps {
  eventId: string;
  onSubmit: (data: Participant) => void;
}

export const NameModal: React.FC<NameModalProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameForm>({ mode: "all" });

  const onSubmit = (data: NameForm) => {
    myFetch<Participant>(
      `${BACKEND_URL}/rest/events/${props.eventId}/participants`,
      {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    )
      .then((data) => {
        props.onSubmit(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className="text-left text-4xl">Wpisz swoje imię</h1>
      <hr className="flex-grow border-t-2 border-gray-400 rounded-full" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-white flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label className="text-black object-top text-left" htmlFor={"name"}>
            Twój nick
          </label>
          <input
            className="border border-black bg-gray-100 p-2 rounded-lg text-black"
            type="text"
            id="name"
            placeholder="Wpisz imię"
            {...register("name", { required: true })}
          />
        </div>

        {errors.name && (
          <div className="text-red-500 text-sm">Imię jest wymagane</div>
        )}

        <Button className="main primary" onClick={() => {}}>
          Gotowe
        </Button>
      </form>
    </div>
  );
};
