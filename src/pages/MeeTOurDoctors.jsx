import React, { useState, useEffect } from "react";
import doctor1 from "../assets/check.jpeg";
import doctor2 from "../assets/eyeins.jpg";
import doctor3 from "../assets/img.png";
import doctor4 from "../assets/man.jpeg";
import { ChevronLeft, ChevronRight, Share2, Twitter, Linkedin } from "lucide-react";
import ScrollReveal from "scrollreveal";

const EyeSpecialistCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // Detect mobile screen

  const specialists = [
    { id: 1, name: "Dr. Laurence Olivier", title: "Lens replacement", image: doctor1 },
    { id: 2, name: "Dr. Catherine Deneuve", title: "Optogra eye", image: doctor2 },
    { id: 3, name: "Dr. Laurence Olivier", title: "Lens replacement", image: doctor3 },
    { id: 4, name: "Dr. Emily Parker", title: "Optician", image: doctor4 },
  ];

  // Handle window resize to detect mobile screens
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Circular shifting logic
  const getShiftedSpecialists = () => {
    const shifted = [...specialists];
    for (let i = 0; i < currentIndex; i++) {
      const first = shifted.shift(); // Remove the first item
      shifted.push(first); // Add it to the end
    }
    return shifted;
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? specialists.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === specialists.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 2000);
    return () => clearInterval(interval);
  }, []); // Only run on mount

  // Share functionality
  const handleShare = (specialist) => {
    const shareText = `Check out ${specialist.name}, a specialist in ${specialist.title}!`;
    if (navigator.share) {
      navigator.share({
        title: "Eye Specialist",
        text: shareText,
        url: window.location.href,
      }).catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

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

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl reveal font-bold text-center text-teal-700 mb-8">Eye Checkup Specialist</h1>

      <div className="relative overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 sm:left-8"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel Container */}
        <div className="flex justify-center overflow-hidden reveal">
          {isMobile ? (
            // Mobile: Show one slide at a time with scrolling effect
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {specialists.map((specialist) => (
                <div key={specialist.id} className="w-full flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full h-48 object-cover object-center sm:h-56 md:h-64"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-teal-700">{specialist.name}</h3>
                    <p className="text-sm text-gray-600">{specialist.title}</p>
                    <div className="flex justify-center space-x-4 mt-4">
                      <button
                        onClick={() => handleShare(specialist)}
                        className="bg-teal-700 p-2 rounded hover:bg-teal-800"
                      >
                        <Share2 size={16} className="text-white" />
                      </button>
                      <a
                        href={`https://twitter.com/intent/tweet?text=Check%20out%20${encodeURIComponent(
                          specialist.name
                        )}%2C%20a%20specialist%20in%20${encodeURIComponent(specialist.title)}!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-700 p-2 rounded hover:bg-teal-800"
                      >
                        <Twitter size={16} className="text-white" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          window.location.href
                        )}&title=Check%20out%20${encodeURIComponent(specialist.name)}%2C%20a%20specialist%20in%20${encodeURIComponent(
                          specialist.title
                        )}!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-700 p-2 rounded hover:bg-teal-800"
                      >
                        <Linkedin size={16} className="text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop: Show 4 slides in a grid (no scrolling effect)
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {getShiftedSpecialists().map((specialist) => (
                <div key={specialist.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full h-48 object-cover object-center sm:h-56 md:h-64"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-teal-700">{specialist.name}</h3>
                    <p className="text-sm text-gray-600">{specialist.title}</p>
                    <div className="flex justify-center space-x-4 mt-4">
                      <button
                        onClick={() => handleShare(specialist)}
                        className="bg-teal-700 p-2 rounded hover:bg-teal-800"
                      >
                        <Share2 size={16} className="text-white" />
                      </button>
                      <a
                        href={`https://twitter.com/intent/tweet?text=Check%20out%20${encodeURIComponent(
                          specialist.name
                        )}%2C%20a%20specialist%20in%20${encodeURIComponent(specialist.title)}!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-700 p-2 rounded hover:bg-teal-800"
                      >
                        <Twitter size={16} className="text-white" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          window.location.href
                        )}&title=Check%20out%20${encodeURIComponent(specialist.name)}%2C%20a%20specialist%20in%20${encodeURIComponent(
                          specialist.title
                        )}!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-700 p-2 rounded hover:bg-teal-800"
                      >
                        <Linkedin size={16} className="text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 sm:right-8"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4">
        {specialists.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
              currentIndex === index ? "bg-teal-700" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default EyeSpecialistCarousel;