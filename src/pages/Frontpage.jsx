import { useState } from "react";
import { useForm } from "react-hook-form";
import "../App.css";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import Button from "../components/Button";
const BACKEND_URL = process.env.CALENDAR_BACKEND_URL;

function Frontpage(props) {
  const today = new Date();
  const defaultValue = new Date(today).toISOString().split("T")[0];
  const tomorrow = today.setDate(today.getDate() + 1);
  const defaultValue2 = new Date(today).toISOString().split("T")[0];
  const datetimestr = `${defaultValue}T00:00`;
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
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
      <div className="btext">
        <h1 className="text-black border border-black bg-gray-100 p-4 rounded-lg">Planowanie wydarzeń</h1>
        <br />
      </div>

      <form className="text-lg leading-tight" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="event-name" className="text-black object-top text-left">
          Nazwa wydarzenia{" "}
        </label>
        <input
          className="border border-black bg-gray-100 p-2 rounded-lg text-black"
          type="text"
          id="event-name"
          name="event-name"
          placeholder="Wpisz nazwę"
          {...register("name", { required: "Potrzebnę imię" })}
        />
        
        {errors.name ? (
          <div className="text-red-500 text-sm">Potrzebna nazwa</div>
        ) : (
          <br />
        )}
        <label htmlFor="event-desc" className="text-black object-top text-left">Opis wydarzenia </label>
        <textarea
          className="border border-black bg-gray-100 p-2 rounded-lg text-black"
          id="event-desc"
          name="event-desc"
          placeholder="Wpisz opis (opcjonalne)"
          {...register("description")}
        />
        <br />
        <label htmlFor="event-vote-end" className="text-black object-top text-left">Do kiedy otwarte głosowanie </label>
        <input
          className="border border-black bg-gray-100 p-2 rounded-lg text-black"
          type="datetime-local"
          id="event-vote-end"
          name="event-vote-end"
          lang="pl"
          min={datetimestr}
          {...register("voting_end", { required: "Potrzebny czas" })}
        />
        <br />
        <div className="flex space-x-5 w-full">
          <div className="flex flex-col w-1/2">
            <label htmlFor="event-start" className="text-black object-top text-left">Początek terminów </label>
            <input
              className="border border-black bg-gray-100 p-2 rounded-lg text-black"
              type="date"
              id="event-start"
              name="event-start"
              defaultValue={defaultValue}
              lang="pl"
              {...register("start", {
                validate: (value) => {
                  setFirst(value);
                  if (first <= second) return true;
                  else return false;
                },
              })}
            />

            {errors.start ? (
              <div className="text-red-500 text-sm">
                Pierwsza data musi być przed drugą
              </div>
            ) : (
              <br />
            )}
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="event-end" className="text-black object-top text-left">Koniec terminów </label>
            <input
              className="border border-black bg-gray-100 p-2 rounded-lg text-black"
              type="date"
              id="event-end"
              name="event-end"
              defaultValue={defaultValue2}
              lang="pl"
              {...register("end", {
                validate: (value) => {
                  setSecond(value);
                },
              })}
            />
            <br />
          </div>
        </div>

        <label className="text-black object-top text-left">Właściciel </label>
        <input
          {...register("owner", { required: true })}
          placeholder="Wpisz imię właściciela"
          className="border border-black bg-gray-100 p-2 rounded-lg text-black"
        />
        {errors.owner && <div className="text-red-500 text-sm">Właściciel jest wymagany </div>}
        <br />
        <Button
        >Gotowe</Button>
        </div>
      </form>
    </>
  );
}

export default Frontpage;
