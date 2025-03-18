import 'icofont/dist/icofont.min.css';
import React, {useEffect} from 'react';
import ScrollReveal from 'scrollreveal';

const Features = () => {
  const features = [
    {
      icon: 'icofont-surgeon-alt',
      title: 'Schedule An Appointment',
      subtitle: '24/7 Availability',
      description: 'Seamless eye care scheduling from anywhere, anytime. Your vision deserves immediate attention.',
      button: 'Book Now',
      link: '/appointment'
    },
    {
      icon: 'icofont-ui-clock',
      title: 'Clinic Hours',
      subtitle: 'Visiting Hours',
      schedule: [
        { days: 'Mon-Sat', time: '9:00 am - 8:00 pm' },
        { days: 'Sun', time: '9:00 am - 5:00 pm' }
      ]
    },
    {
      icon: 'icofont-support',
      title: 'Critical Eye Emergency',
      subtitle: 'Immediate Assistance',
      description: 'Critical eye emergencies? Call our hotline for priority care. Vision preservation is our top priority.',
      phone: '9777 050 048'
    }
  ];

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
    <section className="relative py-20 bg-cyan-50">
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-[#18abab]/20 p-8 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#04637B] via-cyan-600 to-[#04637B] rounded-full mb-4 animate-bounce">
                <i className={`${feature.icon} text-3xl text-white`} />
              </div>
              <span className="inline-block mb-2 text-sm font-semibold text-white bg-gradient-to-r from-[#04637B] via-cyan-600 to-[#04637B] px-3 py-1 rounded-full animate-pulse">
                {feature.subtitle}
              </span>
              <h3 className="text-2xl font-bold text-cyan-900 mb-4">{feature.title}</h3>
              {feature.description && <p className="text-black mb-6 leading-relaxed">{feature.description}</p>}
              {feature.schedule && (
                <ul className="space-y-3 mb-6">
                  {feature.schedule.map((item, i) => (
                    <li key={i} className="flex justify-between items-center p-3 bg-gradient-to-r from-[#04637B] via-cyan-600 to-[#04637B] rounded-xl transition-colors">
                      <span className="text-white font-medium">{item.days}</span>
                      <span className="text-white font-semibold">{item.time}</span>
                    </li>
                  ))}
                </ul>
              )}
              {feature.phone && <div className="mt-6 text-2xl font-bold text-cyan-900 animate-pulse">{feature.phone}</div>}
              {feature.button && (
                <a 
                  href={feature.link} 
                  className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#04637B] via-cyan-600 to-[#04637B] text-white px-6 py-3 rounded-full font-semibold hover:bg-lime-500 transition-all hover:scale-105"
                >
                  <span>{feature.button}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
