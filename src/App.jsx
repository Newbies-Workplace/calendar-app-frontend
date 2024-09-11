import { useState } from 'react'
import { useForm } from "react-hook-form"
import './App.css'

function App() {
 
  const today = new Date();
  const defaultValue = new Date(today).toISOString().split('T')[0];
  const tomorrow = today.setDate(today.getDate() + 1);
  const defaultValue2 = new Date(today).toISOString().split('T')[0];

  const { register, handleSubmit, formState: {errors} } = useForm();
  const [first,setFirst] = useState("");
  const [second,setSecond] = useState("");
  
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
    <div className='btext'>
      
      <h1 className='text-blue-500'>Planowanie wydarzeń</h1>
      <br></br>
    </div>

    <form className='text-lg leading-tight' onSubmit={handleSubmit(onSubmit)}> 
    
    <label htmlFor="event-name">Nazwa wydarzenia </label>
    <input type="text" id="event-name" name="event-name" placeholder="Wpisz nazwę" {...register("name", {required: "Potrzebnę imię"})} />
    
    {errors.name ? <div className='text-red-500 text-sm'>Potrzebna nazwa</div> : <br></br>}
    {/*
    <label for="EventNumber">Wpisz ilość osób </label>
    <input type="number"  id="EventNumber" name="EventNumber" placeholder="0" {...register("number", {required: "Potrzebna ilość"})} />
    
    {errors.number ? <div className='text-red-500 text-sm'>Potrzebna ilość osób</div> : <br></br>}
    */}
    <label htmlFor="event-desc">Opis wydarzenia </label>
    <textarea id="event-desc" name="event-desc" placeholder="Wpisz opis" {...register("description", {required: "Potrzebny opis"})} />
    
    {errors.description ? <div className='text-red-500 text-sm'>Potrzebny opis</div> : <br></br>}

    <label htmlFor="event-vote-end">Do kiedy otwarte głosowanie </label>
    <input type="datetime-local"  id="event-vote-end" name="event-vote-end"  lang='pl' {...register("voting_end")} />
    <br></br>
    <label htmlFor="event-start">Początek terminów </label>
    <input type="date"  id="event-start" name="event-start" defaultValue={defaultValue} lang='pl' {...register("start", {
      validate: (value) => {
        setFirst(value);
        if (first <= second) return true;
        else return false;
        }
      })} />
    
    {errors.start ? <div className='text-red-500 text-sm'> Pierwsza data musi być przed drugą</div> : <br></br>}
    
    <label htmlFor="event-end">Koniec terminów </label>
    <input type="date"  id="event-end" name="event-end"  defaultValue={defaultValue2} lang='pl' {...register("end", {
      validate: (value) => {
        setSecond(value);
      }
    })} />
    <br></br>
    <br></br>
    <button className='main primary'>Submit</button>
    </form>

    </>
  )
}


export default App
