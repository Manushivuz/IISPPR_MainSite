import React from "react";
import { motion } from "framer-motion";

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

const WorkTogether = () => {
  return (
    <section className="relative bg-white w-full overflow-hidden">

      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-lg font-medium text-accent mb-2">About Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Together We Can Make <br />
            A Greener World
          </h3>
          <p className="max-w-2xl mx-auto text-gray-600">
            At IISPPR, we believe that environmental change starts with individual action. 
            By working together, we can protect our natural resources, reduce carbon emissions, 
            and create sustainable communities for future generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Image with Content */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
            <img
              src="/gallery_carousel/gi15.webp"
              alt="Environmental initiative"
              className="w-full h-52 md:h-64 object-cover"
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-primary mb-3">Our Mission</h4>
              <p className="text-gray-600 mb-4">
                Our mission is to create a sustainable future through community engagement and 
                innovative environmental solutions that protect our planet for generations to come.
              </p>
              <a href="/about" className="text-accent font-medium hover:underline">
                Learn more →
              </a>
            </div>
          </div>

          {/* Right Image with Content */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
            <img
              src="/gallery_carousel/gi17.webp"
              alt="Green environment"
              className="w-full h-52 md:h-64 object-cover"
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-primary mb-3">Our Approach</h4>
              <p className="text-gray-600 mb-4">
                We focus on practical, sustainable solutions through education, conservation,
                and implementing green technologies that make a real difference in our communities.
              </p>
              <a href="/projects" className="text-accent font-medium hover:underline">
                View our projects →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/about"
            className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-full hover:bg-accent-dark transition-colors"
          >
            Our Approach →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkTogether;
