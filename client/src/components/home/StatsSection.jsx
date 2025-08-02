import React, { useRef, useState, useEffect } from 'react';
import { FaHandsHelping, FaUsers, FaDove, FaGlobe } from 'react-icons/fa';
import { IoWomanOutline } from 'react-icons/io5';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  {
    icon: <FaHandsHelping className="text-primary text-3xl md:text-4xl" />,
    number: 21,
    label: 'Active States',
  },
  {
    icon: <FaGlobe className="text-primary text-3xl md:text-4xl" />,
    number: 53,
    label: 'Countries Research Community',
  },
  {
    icon: <FaUsers className="text-primary text-3xl md:text-4xl" />,
    number: 10000,
    label: 'People Reach',
    isMillion: true,
  },
  {
    icon: <IoWomanOutline className="text-primary text-3xl md:text-4xl" />,
    number: 8000,
    label: 'Women Reach',
  },
  {
    icon: <FaDove className="text-primary text-3xl md:text-4xl" />,
    number: 50000,
    label: 'People on Social Media',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (isInView) {
      setStartCount(true);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative w-full py-16 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            We Believe That We Can Save<br />More Lives With You
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            Join our mission to create sustainable communities and protect our planet for future generations
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={i}
              className="flex flex-col items-center p-4 sm:p-6 rounded-lg bg-accent/20"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-white p-3 sm:p-4 rounded-full mb-4 shadow-md"
              >
                {stat.icon}
              </motion.div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                {startCount ? (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={stat.isMillion ? '+' : '+'}
                  />
                ) : (
                  `0+`
                )}
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-medium mt-2 text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos */}
        <div className="flex justify-center gap-12 mt-16">

          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            src="/home/statsbottom.jpg" 
            alt="Partner logo" 
            className="h-10 sm:h-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          />


        </div>
      </div>
    </section>
  );
};

export default StatsSection;
