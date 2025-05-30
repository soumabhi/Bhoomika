import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Ads from "./components/Ads";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Appoitment from "./pages/Appoitment";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import LoginComponent from "../AuthScreen/LogIn";
import SignupComponent from "../AuthScreen/SignUp";
import BlogPage from "./pages/Blog";
import AppointBtn from "./pages/AppointButton"
import Appointment from "./pages/Appoitment";
import Fellowship from "./pages/Fellowship";
import FormPage from './pages/FormPage';
import Optum from "./pages/Optometrist";


const App = () => {
  return (
    <BrowserRouter>
      {/* Ads and Navbar should appear on all routes */}
      <AppointBtn/>
      <Ads />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/appoitment" element={<Appoitment />} /> */}
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<LoginComponent/>} />
        <Route path="/signup" element={<SignupComponent/>} />
        <Route path="/blogs" element={<BlogPage/>} />
        <Route path="/appointment" element={<Appointment/>} />
        <Route path="/fellowship" element={<Fellowship/>} />
        <Route path="/mpreg" element={<FormPage />} />
        <Route path="/optreg" element={<Optum />} />
        
        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
