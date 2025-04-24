import React, { useEffect, useRef } from "react";
import done from "../assets/doctors/ajatsatrutripathy.png";
import dtwo from "../assets/doctors/dhaneshwarpradhan.png";
import dthree from "../assets/doctors/kiranbharadwaj.png";
import dfour from "../assets/doctors/nandhakumarc.png";
import dfive from "../assets/doctors/pkmohanty.png";
import dsix from "../assets/doctors/swetamohapatra.png";

const doctors = [
  { name: "Dr. Ajatsatru Tripathy", specialty: "Cataract Surgery", image: done },
  { name: "Dr. Dhaneshwar Pradhan", specialty: "Cataract Surgery", image: dtwo },
  { name: "Dr. Kiran Bharadwaj", specialty: "Cataract Surgery", image: dthree },
  { name: "Dr. Nandhakumar C", specialty: "Cataract Surgery", image: dfour },
  { name: "Dr. P. K. Mohanty", specialty: "Cataract Surgery", image: dfive },
  { name: "Dr. Sweta Mohapatra", specialty: "Cataract Surgery", image: dsix },
];

const Doctors = () => {
  const doctorsContainerRef = useRef(null);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const importAndInitScroll = async () => {
      try {
        const InfiniteHorzScrollModule = await import('@kreonovo/infinitescroll');
        const InfiniteHorzScroll = InfiniteHorzScrollModule.default;
        
        if (doctorsContainerRef.current) {
          const options = {
            duration: 5,
            direction: 'left',
            disableMask: true 
          };
          
          new InfiniteHorzScroll(doctorsContainerRef.current, options);
        }
      } catch (error) {
        console.error("Failed to load InfiniteHorizScroll:", error);
      }
    };
    
    importAndInitScroll();
  }, []);
  
  return (
    <section ref={sectionRef} className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 w-full overflow-hidden">
      <div className="w-full mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-800 text-center mb-16">
          Our Expert Ophthalmologists
        </h2>
        
        <div className="w-full overflow-hidden">
          <div 
            ref={doctorsContainerRef} 
            className="flex"
            style={{ marginLeft: "-8px", marginRight: "-8px" }}
          >
            {doctors.map((doctor, index) => (
              <div 
                key={index} 
                className="flex-shrink-0"
                style={{ margin: "0 8px" }}
              >
                <div 
                  className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer hover:scale-103 transform"
                  style={{ width: "458px", maxWidth: "100%" }}
                >
                  <img 
                    src={doctor.image} 
                    alt="Ophthalmologist" 
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "458/412" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add CSS to ensure proper rendering */}
      <style jsx="true">{`
        /* Force the section to take up full width */
        section {
          width: 100vw !important;
          max-width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          overflow-x: hidden !important;
        }
      `}</style>
    </section>
  );
};

export default Doctors;