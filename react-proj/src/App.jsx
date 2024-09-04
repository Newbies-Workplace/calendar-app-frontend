import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0)

  const inputChange = (event) => {
    setName(event.target.value);
  };
  
  return (
    <>
    <div>
      
      <h1>Mam na imię {name}</h1>
      <h2>Mam {age} lat</h2>
      
      
    </div>
    <div>
      <input type="text" onChange={inputChange} placeholder="wpisz imię" />
      <br></br>
      <br></br>
      <button onClick={() => {setAge(age + 1)}}>Dodaj rok</button>
      <button onClick={() => {setAge(age + 10)}}>Dodaj 10</button>
      <br></br>
      <button onClick={() => {setAge(age - 1)}}>Usuń rok</button>
      <button onClick={() => {setAge(age - 10)}}>Usuń 10</button>
    </div>
    <br></br><br></br>
    <div>
      
    </div>
    </>
  )
}

export default App
