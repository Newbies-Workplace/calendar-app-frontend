import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Frontpage from './Frontpage.jsx'
import './index.css'
import Day from './components/Day.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Frontpage />
    <button className='image close'> </button>
    <button className='image share'> </button>
    <button className='image calendar'> </button> */}
    <Day></Day>
  </StrictMode>,
)
