// import React from 'react';
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';
// import img from "../assets/img.png";
// import man from "../assets/man.jpeg";
// import check from "../assets/check.jpeg";
// import eyed from "../assets/eyed.jpeg";
// import device from "../assets/device.jpeg";
// import eyec from "../assets/eyec.jpeg";

// const Hero = () => {
//     const images = [img, man, check, device, eyed, eyec];

//     const heroContent = {
//         tagline: "Total Eye Care Solution",
//         title: "Since 2009 | <br /> Committed To Eye Care",
//         description: "Delivering expert eyecare with precision and compassion – because your eyes deserve nothing but the best!",
//         buttonText: "BOOK AN APPOINTMENT",
//     };

//     // Mouse effects for button
//     const handleMouseMoveButton = (e) => {
//         const button = e.currentTarget;
//         const rect = button.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         button.style.background = `radial-gradient(circle at ${x}px ${y}px, #00CED1, #04637B)`;
//     };

//     const handleMouseLeaveButton = (e) => {
//         const button = e.currentTarget;
//         button.style.background = "linear-gradient(to right, #04637B, #00CED1, #04637B)";
//     };

//     return (
//         <div className="relative w-full h-screen flex flex-col-reverse md:flex-row">
//             {/* Content Section (60%) */}
//             <div className="w-full md:w-3/5 h-1/2 md:h-full flex flex-col items-center md:items-start justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-gradient-to-r from-[#04637B] via-cyan-800 to-[#04637B] text-white z-10 space-y-4 sm:space-y-6">
//                 {/* Tagline */}
//                 <div className="w-16 mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-cyan-600 h-[6px] rounded-full"></div>
//                 <h2 className="text-sm sm:text-base md:text-lg lg:text-xl uppercase font-semibold tracking-wide">
//                     {heroContent.tagline}
//                 </h2>

//                 {/* Title */}
//                 <h1
//                     className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug text-white hover:text-gray-400 cursor-pointer text-center md:text-left"
//                     dangerouslySetInnerHTML={{ __html: heroContent.title }}
//                 >
//                 </h1>

//                 {/* Description */}
//                 <p className="text-xs sm:text-sm md:text-lg lg:text-xl mt-2 text-white max-w-3xl capitalize font-medium text-center md:text-left">
//                     {heroContent.description}
//                 </p>

//                 {/* Button with Gradient Hover Effect */}
//                 <button
                    
//                     className="mt-4 sm:mt-6 px-6 sm:px-8 py-2 sm:py-3 bg-white text-cyan-900 font-bold rounded-full text-xs sm:text-base lg:text-lg hover:bg-gradient-to-r hover:from-cyan-100 hover:to-cyan-200 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
//                 >
//                     {heroContent.buttonText}
//                 </button>
//             </div>

//             {/* Image Slider Section (40%) */}
//             <div className="w-full md:w-2/5 h-1/2 md:h-full relative">
//                 <Slide autoplay={true} duration={3000} infinite={true} transitionDuration={1000} arrows={false}>
//                     {images.map((image, index) => (
//                         <div key={index} className="w-full h-screen flex items-center justify-center">
//                             <img
//                                 src={image}
//                                 alt={`Slide ${index}`}
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                     ))}
//                 </Slide>
//                 {/* Overlay for better readability */}
//                 <div className="absolute inset-0 bg-black/30"></div>
//             </div>
//         </div>
//     );
// };

// export default Hero;

// import React, { useState, useEffect } from 'react';
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';
// import img from "../assets/img.png";
// import man from "../assets/man.jpeg";
// import check from "../assets/check.jpeg";
// import eyed from "../assets/eyed.jpeg";
// import device from "../assets/device.jpeg";
// import eyec from "../assets/eyec.jpeg";

// const Hero = () => {
//     const [isVisible, setIsVisible] = useState(false);

//     useEffect(() => {
//         setIsVisible(true);
//     }, []);

//     const images = [img, man, check, device, eyed, eyec];

//     const heroContent = {
//         tagline: "Premium Eye Care Solution",
//         title: "Vision Excellence Since 2009",
//         description: "Delivering expert eyecare with precision and compassion – because your vision deserves nothing but the best. Our state-of-the-art technology and board-certified specialists ensure superior care for all your eye health needs.",
//         buttonText: "BOOK AN APPOINTMENT",
//         secondaryButtonText: "OUR SERVICES"
//     };

//     // Mouse effects for button
//     const handleMouseMoveButton = (e) => {
//         const button = e.currentTarget;
//         const rect = button.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         button.style.background = `radial-gradient(circle at ${x}px ${y}px, #00CED1, #04637B)`;
//     };

//     const handleMouseLeaveButton = (e) => {
//         const button = e.currentTarget;
//         button.style.background = "linear-gradient(to right, #04637B, #00CED1, #04637B)";
//     };

//     return (
//         <div className="relative overflow-hidden bg-cyan-900 min-h-[90vh]">
//             {/* Decorative elements */}
//             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-800 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
//                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-700 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
//             </div>

//             <div className="container mx-auto py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
//                 <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
//                     {/* Left Section - Text Content */}
//                     <div className={`w-full lg:w-1/2 space-y-4 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
//                         <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-2"></div>

//                         <h2 className="text-cyan-400 text-lg md:text-xl font-medium tracking-wide">
//                             {heroContent.tagline}
//                         </h2>

//                         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
//                             <span className="inline-block">
//                                 <span className="relative">
//                                     <span className="relative z-10">Vision</span>
//                                     <span className="absolute bottom-1 left-0 w-full h-2 bg-cyan-500/50 z-0"></span>
//                                 </span>
//                             </span>
//                             <br />
//                             <span className="bg-gradient-to-r from-cyan-400 to-blue-400 inline-block text-transparent bg-clip-text">Excellence</span>
//                             <br />
//                             <span>Since 2009</span>
//                         </h1>

//                         <p className="text-cyan-100 text-sm md:text-base max-w-xl mt-4 leading-relaxed">
//                             {heroContent.description}
//                         </p>

//                         <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                             <button
//                                 className="relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-6 py-3 rounded-lg sm:rounded-full flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 transform transition-all duration-300 hover:scale-105"
//                                 onMouseMove={handleMouseMoveButton}
//                                 onMouseLeave={handleMouseLeaveButton}
//                             >
//                                 <span className="relative z-10 font-semibold tracking-wide text-sm">{heroContent.buttonText}</span>
//                                 <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
//                                 <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
//                             </button>

//                             <button className="bg-transparent text-cyan-100 border-2 border-cyan-400 px-6 py-3 rounded-lg sm:rounded-full flex items-center justify-center gap-2 hover:bg-cyan-400/10 transform transition-all duration-300 hover:scale-105 shadow-md font-semibold tracking-wide text-sm">
//                                 {heroContent.secondaryButtonText}
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Section - Image Slider */}
//                     <div className={`w-full lg:w-1/2 relative transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
//                         <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                             <div className="aspect-[4/5] md:aspect-[16/13] lg:aspect-[4/3] w-full max-w-lg mx-auto bg-gradient-to-br from-cyan-800 to-blue-900">
//                                 {/* Decorative elements */}
//                                 <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full filter blur-xl"></div>
//                                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full filter blur-xl"></div>

//                                 {/* Badge */}
//                                 <div className="absolute top-4 left-4 z-30">
//                                     <div className="bg-white p-1 rounded-full shadow-lg">
//                                         <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
//                                             <div className="text-white font-bold leading-none text-center">
//                                                 <div className="text-xs">SINCE</div>
//                                                 <div className="text-lg">2009</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Stats */}
//                                 <div className="absolute top-4 right-12 z-20 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 text-white text-sm">
//                                     <div className="flex items-center gap-2">
//                                         <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//                                         <span>Board Certified</span>
//                                     </div>
//                                 </div>

//                                 {/* Slider */}
//                                 <div className="absolute inset-0 w-full h-full">
//                                     <Slide autoplay={true} duration={3000} infinite={true} transitionDuration={1000} arrows={false} indicators={true} cssClass="h-full">
//                                         {images.map((image, index) => (
//                                             <div key={index} className="w-full h-full flex items-center justify-center">
//                                                 <img
//                                                     src={image}
//                                                     alt={`Eye care ${index + 1}`}
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             </div>
//                                         ))}
//                                     </Slide>
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
//                                 </div>

//                                 {/* Bottom text */}
//                                 <div className="absolute bottom-4 left-4 text-white z-20">
//                                     <h3 className="text-xl sm:text-2xl font-bold">Advanced Eye Care</h3>
//                                     <p className="text-xs sm:text-sm uppercase tracking-wider mt-1 flex items-center gap-2">
//                                         <span className="w-4 h-0.5 bg-cyan-300"></span>
//                                         <span>Professional Solutions</span>
//                                     </p>
//                                 </div>

//                                 {/* Side accent */}
//                                 <div className="absolute top-0 bottom-0 right-0 flex h-full">
//                                     <div className="w-2 bg-cyan-500"></div>
//                                     <div className="w-2 bg-cyan-400"></div>
//                                     <div className="w-2 bg-cyan-300"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Curved wave separator */}
//             <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
//                 <svg className="relative block w-full h-12 sm:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//                     <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-cyan-800"></path>
//                 </svg>
//             </div>
//         </div>
//     );
// };

// export default Hero;

import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img from "../assets/img.png";
import man from "../assets/man.jpeg";
import check from "../assets/check.jpeg";
import eyed from "../assets/eyed.jpeg";
import device from "../assets/device.jpeg";
import eyec from "../assets/eyec.jpeg";

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
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
                    <div className={`w-full lg:w-1/2 space-y-4 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-2"></div>

                        <h2 className="text-cyan-400 text-lg md:text-xl font-medium tracking-wide">
                            {heroContent.tagline}
                        </h2>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            <span className="inline-block">
                                <span className="relative">
                                    <span className="relative z-10">Vision</span>
                                    <span className="absolute bottom-1 left-0 w-full h-2 bg-cyan-500/50 z-0"></span>
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
                                className="relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-6 py-3 rounded-lg sm:rounded-full flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 transform transition-all duration-300 hover:scale-105"
                                onMouseMove={handleMouseMoveButton}
                                onMouseLeave={handleMouseLeaveButton}
                            >
                                <span className="relative z-10 font-semibold tracking-wide text-sm">{heroContent.buttonText}</span>
                                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            </button>

                            <button className="bg-transparent text-cyan-100 border-2 border-cyan-400 px-6 py-3 rounded-lg sm:rounded-full flex items-center justify-center gap-2 hover:bg-cyan-400/10 transform transition-all duration-300 hover:scale-105 shadow-md font-semibold tracking-wide text-sm">
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
                    <div className={`w-full lg:w-1/2 relative transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
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
                                                <div className="text-lg">2009</div>
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

                                {/* Side accent */}
                                <div className="absolute top-0 bottom-0 right-0 flex h-full">
                                    <div className="w-2 bg-cyan-500"></div>
                                    <div className="w-2 bg-cyan-400"></div>
                                    <div className="w-2 bg-cyan-300"></div>
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