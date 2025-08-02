import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const TestimonialsSection = () => {
  const testimonials = [
    {
      imageSrc: '/home/t8.webp',
      text: "The program has provided me with hands-on training in data analytics and its applications in public policy.",
      author: "Christopher K.",
    },
    {
      imageSrc: '/home/t2.webp',
      text: "I learned how to use tools like R, Power BI, and SPSS to analyze data and make better decisions in public policy.",
      author: "Latifa M.",
    },
    {
      imageSrc: '/home/t3.webp',
      text: "The knowledge is unprecedented! The recordings of the lessons continue to be valuable resources for my learning.",
      author: "Samson A.",
    },
    {
      imageSrc: '/home/t4.webp',
      text: "The facilitators created a collaborative learning environment that fostered innovation and critical thinking.",
      author: "Derrick B.",
    },
    {
      imageSrc: '/home/t5.webp',
      text: "I look forward to staying connected with the organization and contributing to its initiatives in the future.",
      author: "Utsab B.",
    },
    {
      imageSrc: '/home/t6.webp',
      text: "The sessions were practical and engaging, helping me see how data can improve public service delivery.",
      author: "Mohamed A.",
    },
    {
      imageSrc: '/home/t7.webp',
      text: "I will use these skills to create positive impact in the industry and educate youth in my community.",
      author: "Jack K.",
    },
    {
      imageSrc: '/home/t1.webp',
      text: "My experience during the program was wonderful. I have no regrets about the knowledge I gained.",
      author: "Anthony M.",
    },
  ];

  return (
    <section className="relative bg-primary py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h3 className="text-accent text-lg font-medium mb-3">— Testimonials —</h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by leaders <br />
            <span className="text-accent">from various industries</span>
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
            Learn why professionals trust our solutions to complete their development journeys
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={1}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} {...testimonial} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={2}
          className="mt-12 text-center"
        >
          <Link to="/testimonials">
            <button className="bg-accent text-primary font-semibold px-6 py-3 rounded-full transition duration-300 hover:bg-white hover:text-primary">
              Read Success Stories <span className="ml-1">→</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Card component with Framer Motion
const Card = ({ imageSrc, text, author, index }) => (
  <motion.div
    variants={fadeInUp}
    custom={index * 0.1}
    className="bg-white/10 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:bg-white/20 backdrop-blur-sm h-full flex flex-col"
  >
    <div className="flex-grow">
      <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-4">
        "{text}"
      </p>
    </div>
    <div className="flex items-center mt-auto">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="testimonial"
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <div className="ml-3">
        <p className="text-white text-xs sm:text-sm font-semibold">{author}</p>
      </div>
    </div>
  </motion.div>
);

export default TestimonialsSection;