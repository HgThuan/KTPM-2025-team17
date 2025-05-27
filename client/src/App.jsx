import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login'
import Home from './home'; //  import Home component
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MedicalDeclaration from './Customer/MedicalDeclaration';
import AppointmentForm from './Customer/AppointmentForm';
import Results from './Customer/Results';
import Doctorinfo from './Customer/Doctorinfo';
import PatientInfo from './Customer/PatientInfo';
import UserHome from './userhome';

function App() {

  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />         {/*  Homepage */}
        <Route path="/home" element={<UserHome />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/md" element={<MedicalDeclaration />} />
        <Route path="/datlich" element={<AppointmentForm/>} />
        <Route path="/ketqua" element={<Results/>} />
        <Route path="/thongtinbacsi" element={<Doctorinfo/>} />
        <Route path="/info" element={<PatientInfo/>} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
