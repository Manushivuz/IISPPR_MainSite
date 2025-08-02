import React from 'react';
import CustomSvgCard from './CustomSvgCard';
import { motion } from 'framer-motion';

const CardGridLayout = () => {
  const cardPositions = [
    { top: '132px', left: '0px' },
    { top: '0px', left: '219px' },
    { top: '286px', left: '219px' },
    { top: '132px', left: '438px' },
    { top: '0px', left: '657px' },
    { top: '132px', left: '876px' },
    { top: '0px', left: '1095px' },
    { top: '286px', left: '1095px' },
    { top: '132px', left: '1320px' },
    { top: '418px', left: '0px' },
    { top: '418px', left: '1320px' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="static w-full h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cardPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ top: pos.top, left: pos.left }}
          variants={itemVariants}
        >
          <CustomSvgCard />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CardGridLayout;