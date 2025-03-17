import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Infinity from '../components/Infinity'
import AboutSection from '../components/AboutSection'
import Appointment from '../pages/Appoitment'
import Service from './Service'
import OurClients from "../pages/OurClients";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <Infinity/> */}
      <Features />
      <AboutSection />
      <Service/>
      <OurClients/>
      <Appointment />

    </div>
  )
}

export default Home