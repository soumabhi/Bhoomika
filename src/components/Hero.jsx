import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img from "../assets/img.png";
import man from "../assets/man.jpeg";
import check from "../assets/check.jpeg";
import eyed from "../assets/eyed.jpeg";
import device from "../assets/device.jpeg";
import eyec from "../assets/eyec.jpeg";

const Hero = () => {
    const images = [img, man, check, device, eyed, eyec];

    const handleMouseMoveButton = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.background = `radial-gradient(circle at ${x}px ${y}px, #00FFFF, #04637B)`;
    };

    const handleMouseLeaveButton = (e) => {
        const button = e.currentTarget;
        button.style.background = "bg-lime-500";
    };

    const handleMouseMoveText = (e) => {
        const text = e.currentTarget;
        const rect = text.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        text.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, #00FFFF, #04637B)`;
        text.style.backgroundClip = "text";
        text.style.webkitBackgroundClip = "text";
        text.style.color = "transparent";
    };

    const handleMouseLeaveText = (e) => {
        const text = e.currentTarget;
        text.style.backgroundImage = "linear-gradient(to right, #04637B, #00CED1, #04637B)";
        text.style.backgroundClip = "text";
        text.style.webkitBackgroundClip = "text";
        text.style.color = "transparent";
    };

    return (
        <div className="relative w-full h-screen md:h-[70vh] lg:h-[86.3vh]">
            <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12 lg:px-24 text-white z-10 space-y-6 bg-transparent">
                <div className="w-16 mb-10 bg-gradient-to-r from-[#04637B] via-cyan-600 to-[#04637B] h-[7px]"></div>
                <h2 className="text-sm md:text-lg lg:text-xl uppercase font-semibold tracking-wide text-white">Total Eye Care Solution</h2>
                <h1
                    onMouseMove={handleMouseMoveText}
                    onMouseLeave={handleMouseLeaveText}
                    className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#04637B] via-cyan-500 to-cyan-600 cursor-pointer"
                >
                    Since 2009 | Committed To Eye Care
                </h1>
                <p className="text-base md:text-lg lg:text-xl mt-2 text-white max-w-3xl capitalize font-medium">
                    Delivering expert eyecare with precision and compassion – because your eyes deserve nothing but the best!
                </p>
                <button
                    onMouseMove={handleMouseMoveButton}
                    onMouseLeave={handleMouseLeaveButton}
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-[#04637B] via-cyan-600 to-[#04637B] text-white font-bold rounded-full text-sm md:text-base lg:text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer active:scale-95 relative overflow-hidden"
                >
                    BOOK AN APPOINTMENT
                </button>
            </div>

            <Slide autoplay={true} duration={3000} infinite={true} transitionDuration={1000} arrows={false}>
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        className="w-full h-screen md:h-[70vh] lg:h-[86.3vh] bg-cover bg-center flex items-center justify-center" 
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                ))}
            </Slide>
        </div>
    );
};

export default Hero;