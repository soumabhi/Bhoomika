import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import img from "../assets/img.png";
import man from "../assets/man.jpeg";
import check from "../assets/check.jpeg";
import eyed from "../assets/eyed.jpeg";
import device from "../assets/device.jpeg";
import eyec from "../assets/eyec.jpeg";
import ScrollReveal from "scrollreveal";

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        ScrollReveal().reveal(".reveal", {
            distance: "30px",
            origin: "bottom",
            opacity: 0,
            duration: 1000,
            delay: 200,
            easing: "ease-in-out",
            reset: true,
        });
    }, []);

    const images = [img, man, check, device, eyed, eyec];

    const heroContent = {
        tagline: "Premium Eye Care Solution",
        title: "Vision Excellence Since 2009",
        description: "Delivering expert eyecare with precision and compassion – because your vision deserves nothing but the best. Our state-of-the-art technology and board-certified specialists ensure superior care for all your eye health needs.",
        buttonText: "BOOK AN APPOINTMENT",
        secondaryButtonText: "OUR SERVICES"
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

    // Handle button clicks
    const handleAppointmentClick = () => {
        navigate('/appointment'); // Navigate to /appointment
    };

    const handleServiceClick = () => {
        navigate('/services'); // Navigate to /services
    };

    return (
        <div className="relative overflow-hidden bg-cyan-900 min-h-[86vh]">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-800 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-700 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
                    {/* Left Section - Text Content */}
                    <div className={`reveal w-full lg:w-1/2 space-y-4 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-2"></div>

                        <h2 className="text-cyan-400 text-lg md:text-xl font-medium tracking-wide">
                            {heroContent.tagline}
                        </h2>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            <span className="inline-block">
                                <span className="relative">
                                    <span className="relative z-10">Vision</span>
                                </span>
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 inline-block text-transparent bg-clip-text">Excellence</span>
                            <br />
                            <span>Since 2009</span>
                        </h1>

                        <p className="text-cyan-100 text-sm md:text-base max-w-xl mt-4 leading-relaxed">
                            {heroContent.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                className="relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-6 py-3 rounded-lg sm:rounded-full flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 transform transition-all duration-300 hover:scale-105 cursor-pointer"
                                onMouseMove={handleMouseMoveButton}
                                onMouseLeave={handleMouseLeaveButton}
                                onClick={handleAppointmentClick} // Add onClick handler
                            >
                                <span className="relative z-10 font-semibold tracking-wide text-sm">{heroContent.buttonText}</span>
                                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            </button>

                            <button
                                className="bg-transparent text-cyan-100 border-2 border-cyan-400 px-6 py-3 rounded-lg sm:rounded-full flex items-center justify-center gap-2 hover:bg-cyan-400/10 transform transition-all duration-300 hover:scale-105 shadow-md font-semibold tracking-wide text-sm"
                                onClick={handleServiceClick} // Add onClick handler
                            >
                                {heroContent.secondaryButtonText}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-4 pt-8">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-cyan-800 bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <div className="text-cyan-100">
                                <span className="font-semibold text-cyan-400">500+</span> Successful eye surgeries each month
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Image Slider */}
                    <div className={`reveal w-full lg:w-1/2 relative transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="aspect-[4/5] md:aspect-[16/13] lg:aspect-[4/3] w-full max-w-lg mx-auto bg-gradient-to-br from-cyan-800 to-blue-900">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full filter blur-xl"></div>
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full filter blur-xl"></div>

                                {/* Badge */}
                                <div className="absolute top-4 left-4 z-30">
                                    <div className="bg-white p-1 rounded-full shadow-lg">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                                            <div className="text-white font-bold leading-none text-center">
                                                <div className="text-xs">SINCE</div>
                                                <div className="text-xs">2009</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="absolute top-4 right-12 z-20 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 text-white text-sm">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span>Board Certified</span>
                                    </div>
                                </div>

                                {/* Slider */}
                                <div className="absolute inset-0 w-full h-full">
                                    <Slide autoplay={true} duration={3000} infinite={true} transitionDuration={1000} arrows={false} indicators={true} cssClass="h-full">
                                        {images.map((image, index) => (
                                            <div key={index} className="w-full h-full flex items-center justify-center">
                                                <img
                                                    src={image}
                                                    alt={`Eye care ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </Slide>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                </div>

                                {/* Bottom text */}
                                <div className="absolute bottom-4 left-4 text-white z-20">
                                    <h3 className="text-xl sm:text-2xl font-bold">Advanced Eye Care</h3>
                                    <p className="text-xs sm:text-sm uppercase tracking-wider mt-1 flex items-center gap-2">
                                        <span className="w-4 h-0.5 bg-cyan-300"></span>
                                        <span>Professional Solutions</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;