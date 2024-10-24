import { useState } from "react";
import { useForm } from "react-hook-form";
import "../App.css";
import "../components/button.css";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
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
        <h1 className="text-blue-500">Planowanie wydarzeń</h1>
        <br></br>
      </div>

      <form className="text-lg leading-tight" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="event-name" className="object-top">
          Nazwa wydarzenia{" "}
        </label>
        <input
          type="text"
          id="event-name"
          name="event-name"
          placeholder="Wpisz nazwę"
          {...register("name", { required: "Potrzebnę imię" })}
        />
        {errors.name ? (
          <div className="text-red-500 text-sm">Potrzebna nazwa</div>
        ) : (
          <br></br>
        )}
        <br />
        <label htmlFor="event-desc">Opis wydarzenia </label>

        <textarea
          id="event-desc"
          name="event-desc"
          placeholder="Wpisz opis (opcjonalne)"
          {...register("description")}
        />
        <br />
        <label htmlFor="event-vote-end">Do kiedy otwarte głosowanie </label>
        <input
          type="datetime-local"
          id="event-vote-end"
          name="event-vote-end"
          lang="pl"
          min={datetimestr}
          {...register("voting_end", { required: "Potrzebny czas" })}
        />
        <br></br>
        <label htmlFor="event-start">Początek terminów </label>
        <input
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
          <br></br>
        )}

        <label htmlFor="event-end">Koniec terminów </label>
        <input
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
        <br></br>
        <br></br>


        <label>Właściciel</label>
        <input
          {...register("owner", { required: true })}
          placeholder="Wpisz imię właściciela"
        />
        {errors.owner && <div className="text-red-500 text-sm">Właściciel jest wymagany</div>}
        <button className="main primary" href={`${props.id}`}>
          Potwierdź
        </button>
      </form>
    </>
  );
}

export default Frontpage;
