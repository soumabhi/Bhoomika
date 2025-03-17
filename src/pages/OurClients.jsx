import React,{useEffect} from "react";
import ScrollReveal from "scrollreveal";
import { motion } from "framer-motion";

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
    <div className="bg-white reveal text-dark py-12 overflow-hidden">
    <h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#04637B] via-cyan-500 to-cyan-900 uppercase"
      >
       Our Clients & Partners
      </h2>
      <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex space-x-10"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Company Logo"
              className="w-28 h-auto opacity-80 hover:opacity-100 transition-all drop-shadow-lg"
              onError={(e) => (e.target.style.display = "none")} // Hide broken images
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
