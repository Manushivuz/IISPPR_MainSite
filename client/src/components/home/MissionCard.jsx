import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MissionCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/20 backdrop-blur-lg text-white rounded-xl sm:rounded-2xl md:rounded-[1.5rem] p-6 sm:p-8 md:p-10 max-w-md w-full mx-auto shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
      >
        IISPPR Mission
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 text-gray-200"
      >
        We believe in a future where humanity lives in harmony with nature. Our mission is to protect ecosystems, combat climate change, and promote sustainable practices that benefit both people and planet.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        >
          <div className="text-accent text-3xl font-bold mb-2">10K+</div>
          <div className="text-sm font-medium">People Reach</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        >
          <div className="text-accent text-3xl font-bold mb-2">21+</div>
          <div className="text-sm font-medium">Active States</div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center sm:text-left"
      >
        <Link
          to="/about"
          className="group inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-full text-sm font-medium hover:bg-white transition-all duration-300 hover:scale-105"
        >
          Our Story 
          <motion.span 
            initial={{ x: 0 }}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block"
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default MissionCard;
