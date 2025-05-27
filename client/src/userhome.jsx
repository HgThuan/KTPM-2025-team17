
import React from "react";
import Navbar from "./HomePage/navbar";
import Center from './HomePage/center';
import Footer from "./HomePage/footer"
import UserNavbar from "./HomePage/usernavbar"

export default function UserHome() {
  return (
    <div>
      <UserNavbar />

      <Center/>

      <Footer/>
    </div>
  );
}
