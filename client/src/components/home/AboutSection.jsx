import React from "react";
import { motion } from "framer-motion";
import WorkTogether from "./WorkTogether";

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

const AboutSection = () => {
  return (
    <div className="relative">
      <motion.div
	  initial="hidden"
	  whileInView="visible"
	  variants={fadeInUp}
	  custom={0}
	  viewport={{ once: true, amount: 0.1 }}
	  className="relative z-10"
	>
	  <WorkTogether />
	</motion.div>

    </div>
  );
};

export default AboutSection;
