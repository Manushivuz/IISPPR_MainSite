import React from "react";
import { images } from "./images.js";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full md:h-[470px] lg:h-[550px] flex items-end justify-center overflow-hidden"
    >
      <motion.img
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
        src={images.hero}
        alt="Projects Hero"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80 z-10" />
      <div className="relative z-20 w-full max-w-6xl px-6 py-10 flex flex-col md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg font-serif">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl drop-shadow font-light">
            IISPPR is a New Delhi-based nonprofit think tank driving sustainable
            development through research-driven, practical policy solutions.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/20 backdrop-blur-md rounded-lg p-6 mt-10 md:mt-0 md:ml-8 md:max-w-xs shadow-lg border border-white/30"
        >
          <h2 className="text-xl font-semibold text-white font-serif mb-2">
            Why We Exist: Feminism for the Margins
          </h2>
          <p className="text-white/90 text-sm mb-2">
            We aim to promote inclusive, high-quality education and lifelong
            learning for all—especially students and elders—by providing
            humanitarian support, reconnecting underserved children to
            schooling, and advancing research aligned with SDG Goal 4: Quality
            Education.
          </p>
          <a
            href="#learn-more"
            className="text-accent-light font-medium hover:text-accent transition-colors duration-300 underline "
          >
            Learn More →
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
