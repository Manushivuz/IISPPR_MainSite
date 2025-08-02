import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const ProjectsHighlight = () => {
  const projects = [
    {
      title: 'Project 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum sem quis eros posuere.',
      image: '/gallery/im1.jpg'
    },
    {
      title: 'Project 2',
      description:
        'Sed ultricies libero quis sem porttitor lacinia. Nunc a ultrices ex. Nulla facilisi.',
      image: '/gallery/im2.jpeg'
    },
    {
      title: 'Project 3',
      description:
        'Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus.',
      image: '/gallery/im3.jpeg'
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto">
            Explore our impactful projects driving positive change in communities worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={fadeInUp}
              className="relative overflow-hidden rounded-xl group h-64 sm:h-72 md:h-80"
            >
              {/* Background Image */}
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-primary/70 transition-opacity"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-white/90 mb-4">{project.description}</p>
                <Link
                  to="/projects"
                  className="inline-flex items-center mt-auto text-sm font-medium text-accent hover:text-white transition-colors"
                >
                  Learn More <span className="ml-1">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          custom={4}
          className="mt-10 text-center"
        >
          <Link to="/projects">
            <button className="bg-accent text-primary font-semibold px-6 py-3 rounded-full transition duration-300 hover:bg-white hover:text-primary">
              View All Projects <span className="ml-1">→</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsHighlight;
