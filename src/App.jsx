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

const App = () => {
  return (
    <BrowserRouter>
      {/* Ads and Navbar should appear on all routes */}
      <Ads />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/appoitment" element={<Appoitment />} /> */}
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
