import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ProjectsList = ({ projects }) => {
  // Always show 9 cards (fill with empty if needed)
  const cards = [...projects].slice(0, 9);
  while (cards.length < 9) cards.push(null);

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-16 px-4 sm:px-6 lg:px-8"
    >
      {cards.map((project, idx) => (
        <motion.div 
          key={idx} 
          className="h-[420px]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
        >
          {project ? (
            <ProjectCard project={project} />
          ) : (
            <motion.div 
              className="rounded-2xl h-full bg-gray-100/50 backdrop-blur-sm opacity-50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectsList;
