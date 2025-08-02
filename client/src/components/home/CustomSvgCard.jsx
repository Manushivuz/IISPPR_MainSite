
import React from 'react';
import { motion } from 'framer-motion';

const CustomSvgCard = () => {
  return (
    <motion.div
      className="w-[152px] h-[207px] bg-zinc-300 rounded-[20px] flex flex-col items-center pt-[33px] shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-[80px] h-[82px] bg-white rounded-full"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      ></motion.div>
    </motion.div>
  );
};

export default CustomSvgCard;
  