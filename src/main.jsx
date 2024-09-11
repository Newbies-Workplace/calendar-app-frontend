import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <button className='image close'></button>
    <br></br>
    <button className='image share'></button>
    
  </StrictMode>,
)
