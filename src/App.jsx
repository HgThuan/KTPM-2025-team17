import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login'
import SignUp from './SignUp'
import Home from './home'; // 👈 import Home component

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />         {/* 👈 Homepage */}
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
