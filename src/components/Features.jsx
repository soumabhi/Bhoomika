import 'icofont/dist/icofont.min.css';

const Features = () => {
  const features = [
    {
      icon: 'icofont-surgeon-alt',
      title: 'Instant Booking',
      subtitle: '24/7 Availability',
      description: 'Seamless eye care scheduling from anywhere, anytime. Your vision deserves immediate attention.',
      button: 'Book Now',
      link: '/appointment'
    },
    {
      icon: 'icofont-ui-clock',
      title: 'Clinic Hours',
      subtitle: 'Visit Us Anytime',
      schedule: [
        { days: 'Weekdays', time: '9:00 am - 8:00 pm' },
        { days: 'Weekends', time: '9:00 am - 5:00 pm' }
      ]
    },
    {
      icon: 'icofont-support',
      title: 'Emergency Care',
      subtitle: 'Immediate Assistance',
      description: 'Critical eye emergencies? Call our hotline for priority care. Vision preservation is our top priority.',
      phone: '9777 050 048'
    }
  ];

  return (
    <section className="relative py-20 bg-lime-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-lime-200 p-8 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-lime-400 rounded-full mb-4 animate-bounce">
                <i className={`${feature.icon} text-3xl text-white`} />
              </div>
              <span className="inline-block mb-2 text-sm font-semibold text-lime-700 bg-lime-300 px-3 py-1 rounded-full animate-pulse">
                {feature.subtitle}
              </span>
              <h3 className="text-2xl font-bold text-lime-800 mb-4">{feature.title}</h3>
              {feature.description && <p className="text-lime-900 mb-6 leading-relaxed">{feature.description}</p>}
              {feature.schedule && (
                <ul className="space-y-3 mb-6">
                  {feature.schedule.map((item, i) => (
                    <li key={i} className="flex justify-between items-center p-3 bg-lime-300 rounded-xl hover:bg-lime-400 transition-colors">
                      <span className="text-lime-900 font-medium">{item.days}</span>
                      <span className="text-lime-700 font-semibold">{item.time}</span>
                    </li>
                  ))}
                </ul>
              )}
              {feature.phone && <div className="mt-6 text-2xl font-bold text-lime-800 animate-pulse">{feature.phone}</div>}
              {feature.button && (
                <a 
                  href={feature.link} 
                  className="mt-6 inline-flex items-center gap-2 bg-lime-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-lime-400 transition-all hover:scale-105"
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
