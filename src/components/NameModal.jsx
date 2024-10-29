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
      <h1>Wpisz swoje imię</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="text-white">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Wpisz imię"
          {...register("name", { required: "Potrzebne imię" })}
        />
        {errors.name ? (
          <div className="text-red-500 text-sm">Potrzebne imię</div>
        ) : (
          <br></br>
        )}
        <br></br>
        <Button className="main primary ">Submit</Button>
      </form>
    </>
  );
}
