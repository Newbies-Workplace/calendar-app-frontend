import { useForm } from "react-hook-form";
import Button from "./Button.tsx";
const BACKEND_URL = process.env.CALENDAR_BACKEND_URL;
export default function NameModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    fetch(`${BACKEND_URL}/rest/events/${props.eventId}/participants`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.onSubmit(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <br />
      <br />
      <h1 className="text-left text-4xl">Wpisz swoje imię</h1>
      <br />
      <hr className="flex-grow border-t-2 border-gray-400 rounded-full" />
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="text-white">
        <div className="flex flex-col">
          <label className="text-black object-top text-left">Twój nick</label>
          <input
            className="border border-black bg-gray-100 p-2 rounded-lg text-black"
            type="text"
            id="name"
            name="name"
            placeholder="Wpisz imię"
            {...register("name", { required: "Potrzebne imię" })}
          />
        </div>
        {errors.name ? (
          <div className="text-red-500 text-sm">Potrzebne imię</div>
        ) : (
          <br></br>
        )}
        <br></br>
        <Button className="main primary ">Gotowe</Button>
      </form>
    </>
  );
}
