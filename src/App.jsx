import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login'
import SignUp from './SignUp'
import Home from './home'; // 👈 import Home component
import MedicalDeclaration from './Customer/MedicalDeclaration'
import Success from './Customer/Success'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />         {/* 👈 Homepage */}
        <Route path="/md" element={<MedicalDeclaration />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
