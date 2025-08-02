import React from 'react';
import Hero from '../components/home/Hero';
import ProjectsHighlight from '../components/home/ProjectsHighlight';
import Gallery from '../components/home/Gallery';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AboutSection from '../components/home/AboutSection';

const Home = () => {
  return (
    <div className="overflow-x-hidden w-full">
      {/* Hero Section */}
      <Hero />
	  
      {/* Stats Section */}
      <StatsSection />
	  
      {/* About Section */}
      <AboutSection />
	  
      
      {/* Gallery Section */}
      <Gallery />
      
      {/* Projects Section */}
      <ProjectsHighlight />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      
    </div>
  );
};

export default Home;
