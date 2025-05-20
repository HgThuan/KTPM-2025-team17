// Home.jsx
import React from "react";
import Navbar from "./HomePage/navbar";
import Center from './HomePage/center';
import Footer from "./HomePage/footer"

export default function Home() {
  return (
    <div>
      <Navbar />

      <Center/>

      <Footer/>
    </div>
  );
}
