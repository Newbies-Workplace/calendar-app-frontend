import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      
      <h1 class='text-blue-500'>Planowanie wydarzeń</h1>
      <br></br>
    </div>

    <form class='text-lg' onSubmit={handleSubmit(onSubmit)}> 
    
    <label for="EventName">Nazwa wydarzenia </label>
    <input type="text" id="EventName" name="EventName" placeholder="Wpisz nazwę" {...register("name", {required: "Potrzebnę imię"})} />
    
    {errors.name ? <div className='text-red-500 text-sm'>Potrzebna nazwa</div> : <br></br>}
    
    <label for="EventNumber">Wpisz ilość osób </label>
    <input type="number"  id="EventNumber" name="EventNumber" placeholder="0" {...register("number", {required: "Potrzebna ilość"})} />
    
    {errors.number ? <div className='text-red-500 text-sm'>Potrzebna ilość osób</div> : <br></br>}
    
    <label for="EventStart">Początek terminów </label>
    <input type="date"  id="EventStart" name="EventStart" defaultValue={defaultValue} {...register("start", {
      validate: (value) => {
        setFirst(value);
        if (first <= second) return true;
        else return false;
        }
      })} />
    
    {errors.start ? <div className='text-red-500 text-sm'> Pierwsza data musi być przed drugą</div> : <br></br>}
    
    <label for="EventEnd">Koniec terminów </label>
    <input type="date"  id="EventEnd" name="EventEnd"  defaultValue={defaultValue2} {...register("end", {
      validate: (value) => {
        setSecond(value);
      }
    })} />
    <br></br>
    <br></br>
    <button className='primary'>Submit</button>
    </form>
    </>
  )
}


export default App
