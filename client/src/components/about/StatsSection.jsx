import React, { useRef, useState, useEffect } from "react";
import { FaHandsHelping, FaUsers, FaDove, FaGlobe } from "react-icons/fa";
import { IoWomanOutline } from "react-icons/io5";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  {
    icon: <FaHandsHelping className="text-primary text-3xl md:text-4xl" />,
    number: 10000,
    label: "People Reached",
  },
  {
    icon: <FaUsers className="text-primary text-3xl md:text-4xl" />,
    number: 50000,
    label: "People on Social Media",
  },
  {
    icon: <IoWomanOutline className="text-primary text-3xl md:text-4xl" />,
    number: 8000,
    label: "Women reached",
  },
  {
    icon: <FaGlobe className="text-primary text-3xl md:text-4xl" />,
    number: 53,
    label: "Country Research Communities",
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
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
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-9"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-serif md:text-5xl font-bold text-primary mb-4">
            Our Reach In Numbers
          </h2>
          <p className="text-gray-600 max-w-3xl font-serif mx-auto text-sm sm:text-base">
            Every digit counts. Every story matter. Our impact is measured not
            just in numbers, but in the lives we touch and the communities we
            empower.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 grid-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={i}
              className="flex flex-col items-center p-4 sm:p-6 rounded-lg bg-secondary-light/20"
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
                    suffix={stat.isMillion ? "+" : "+"}
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
      </div>
    </section>
  );
};

export default StatsSection;