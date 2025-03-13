import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Infinity from '../components/Infinity'
import AboutSection from '../components/AboutSection'
import Appointment from '../pages/Appoitment'

const Home = () => {
  return (
    <div>
      <Hero/>
      {/* <Infinity/> */}
      <Features/>
      <AboutSection/>
      <Appointment/>

    </div>
  )
}

export default Home
