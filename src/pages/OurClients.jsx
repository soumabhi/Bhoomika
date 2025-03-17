import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Marquee from "react-fast-marquee";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6f/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/29/Samsung_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg",
];

const InfiniteMarquee = () => {
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
    <div className="bg-white reveal py-8 sm:py-12 lg:py-14 overflow-hidden">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#04637B] via-cyan-500 to-cyan-900 uppercase">
        Our Partners
      </h2>

      {/* Marquee Wrapper */}
      <div className="relative w-full">
        <Marquee speed={40} gradient={false} className="flex space-x-6">
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Company Logo"
              className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 object-contain opacity-80 hover:opacity-100 transition-all drop-shadow-md mx-7"
              onError={(e) => (e.target.style.display = "none")} // Hide broken images
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
