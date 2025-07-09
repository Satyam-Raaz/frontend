import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { BrowserRouter, Routes, Route } from "react-router";
import BookingList from './components/BookingList.jsx';
import Booking from './components/Booking.jsx';
import AllCenter from './components/AllCenter.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/bookingList" element={<BookingList/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/allCenter" element={<AllCenter/>} />
      
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
