import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  {/*
  const [name, setName] = useState("");
  const [age, setAge] = useState(0)
   */}
  const today = new Date();
  const defaultValue = new Date(today).toISOString().split('T')[0];
  const tomorrow = today.setDate(today.getDate() + 1);
  const defaultValue2 = new Date(today).toISOString().split('T')[0];

  const [userName, setUser] = useState("");
  const [userNumber, setNumber] = useState(0);
  const [userStart, setStart] = useState(defaultValue);
  const [userEnd, setEnd] = useState(defaultValue2);

  const inputChange = (event) => {
    {/*setName(event.target.value);  */} 
    switch(event.target.id) {
      case 'EventName':
        setUser(event.target.value);
      case 'EventNumber':
        setNumber(event.target.value);
      case 'EventStart':
        setStart(event.target.value);
      case 'EventEnd':
        setEnd(event.target.value);
    }
        
  };
  const sendInfo = () => {
    const info = {
      name: userName,
      number: userNumber,
      start: userStart,
      end: userEnd
    }
    console.log(info)
  };

  return (
    <>
    {/*
    
    Numer: {age}
    <br></br>
    <div>
      <button >Test</button>
      <br></br>
      <button className='secondary' onClick={() => {setAge(age + 1)}}>Test2</button>

    </div>
    */}
    <div className='btext'>
      {/*
      <h1>Mam na imię {name}</h1>
      <h2>Mam {age} lat</h2>
      */}
      <h1 class='text-blue-500'>Planowanie wydarzeń</h1>
      <br></br>
    </div>
    {/*
    <div>
      <input type="text" onChange={inputChange} placeholder="wpisz imię" />
      <br></br>
      <br></br>
      <button disabled className="secondary small" onClick={() => {setAge(age + 1)}}>Dodaj rok</button>
      <button onClick={() => {setAge(age + 10)}}>Dodaj 10</button>
      <br></br>
      <button onClick={() => {setAge(age - 1)}}>Usuń rok</button>
      <button onClick={() => {setAge(age - 10)}}>Usuń 10</button>
    </div>
    */}
    <div class='text-lg'> 
    <label for="EventName">Nazwa wydarzenia </label>
    <input type="text" id="EventName" name="EventName" placeholder="Wpisz nazwę" onChange={inputChange} />
    <br></br>
    <label for="EventNumber">Wpisz ilość osób </label>
    <input type="number"  id="EventNumber" name="EventNumber" placeholder="0" onChange={inputChange}/>
    <br></br>
    <label for="EventStart">Początek terminów </label>
    <input type="date"  id="EventStart" name="EventStart" defaultValue={defaultValue} onChange={inputChange}/>
    <br></br>
    <label for="EventEnd">Koniec terminów </label>
    <input type="date"  id="EventEnd" name="EventEnd"  defaultValue={defaultValue2} onChange={inputChange}/>
    <br></br>
    <br></br>
    <button className='primary' onClick={sendInfo}>Submit</button>
    </div>
    </>
  )
}


const Error = (props) => {
  if(props.start >= props.end) {
    return <h1 class="text-red-600"> ERROR DATE</h1>
  }

};

export default App
