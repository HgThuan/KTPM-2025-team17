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
import Success from './Customer/Success';
function App() {

  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />         {/*  Homepage */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/md" element={<MedicalDeclaration />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
