import { useForm } from "react-hook-form";
export default function NameModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    props.onClick();
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
        <button className="main primary ">Submit</button>
      </form>
    </>
  );
}
