import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img from "../assets/img.png";
import man from "../assets/man.jpeg";
import check from "../assets/check.jpeg";
import eyed from "../assets/eyed.jpeg";
import device from "../assets/device.jpeg";
import eyec from "../assets/eyec.jpeg";
import Footer from './Footer';

const Hero = () => {
    const images = [
        img,
        man,
        check,
        device,
        eyed,
        eyec,
    ];

    return (
        <>
        <div>
          <Slide autoplay={true} duration={2000} infinite={true}>
              {images.map((image, index) => (
                  <div key={index} className="flex items-center justify-center h-150 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                  </div>
              ))}
          </Slide>
        
        </div>
        </>
    );
};

export default Hero;
