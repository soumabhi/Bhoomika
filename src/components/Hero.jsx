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

    // Dynamic content (can be fetched from an API in the future)
    const heroContent = {
        tagline: "Total Eye Care Solution",
        title: "Since 2009 | Committed To Eye Care",
        description: "Delivering expert eyecare with precision and compassion – because your eyes deserve nothing but the best!",
        buttonText: "BOOK AN APPOINTMENT",
    };

    // Mouse effects for button
    const handleMouseMoveButton = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.background = `radial-gradient(circle at ${x}px ${y}px, #00CED1, #04637B)`;
    };

    const handleMouseLeaveButton = (e) => {
        const button = e.currentTarget;
        button.style.background = "linear-gradient(to right, #04637B, #00CED1, #04637B)";
    };

    // Mouse effects for text
    const handleMouseMoveText = (e) => {
        const text = e.currentTarget;
        const rect = text.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        text.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, #00CED1, #04637B)`;
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
        <div className="relative w-full h-[85vh] flex flex-col lg:flex-row">
            {/* Content Section (40%) */}
            <div className="w-full lg:w-2/5 h-full flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-24 bg-gradient-to-r from-[#04637B] via-cyan-800 to-[#04637B] text-white z-10 space-y-6">
                {/* Tagline */}
                <div className="w-16 mb-6 bg-gradient-to-r from-cyan-400 to-cyan-600 h-[6px] rounded-full"></div>
                <h2 className="text-sm md:text-lg lg:text-xl uppercase font-semibold tracking-wide text-cyan-200">
                    {heroContent.tagline}
                </h2>

                {/* Title with Gradient Text */}
                <h1
                    className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight max-w-4xl text-transparent bg-clip-text bg-cyan-400 cursor-pointer"
                >
                    {heroContent.title}
                </h1>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl mt-2 text-cyan-100 max-w-3xl capitalize font-medium">
                    {heroContent.description}
                </p>

                {/* Button */}
                <button
                    onMouseMove={handleMouseMoveButton}
                    onMouseLeave={handleMouseLeaveButton}
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-bold rounded-full text-sm md:text-base lg:text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer active:scale-95 relative overflow-hidden"
                >
                    {heroContent.buttonText}
                </button>
            </div>

            {/* Image Slider Section (60%) */}
            <div className="w-full lg:w-3/5 h-full relative">
                <Slide autoplay={true} duration={3000} infinite={true} transitionDuration={1000} arrows={false}>
                    {images.map((image, index) => (
                        <div 
                            key={index} 
                            className="w-full h-[85vh] bg-cover bg-center" 
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ))}
                </Slide>
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>
        </div>
    );
};

export default Hero;