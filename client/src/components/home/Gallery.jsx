import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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

const GalleryCarousel = () => {
  const images = Array.from({ length: 18 }, (_, i) => `/gallery_carousel/gi${i + 1}.webp`);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  var images1 = [images[0],images[1],images[5],images[3],images[11],images[6],images[8]];
  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 640);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: isMobile ? 1 : 1,
      spacing: isMobile ? 16 : 0
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    if (!instanceRef.current) return;
    const interval = setInterval(() => instanceRef.current.next(), 6000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const handleMouseEnter = () => instanceRef.current?.pause();
  const handleMouseLeave = () => instanceRef.current?.play();

  return (
    <section className="relative bg-black/10 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-center mb-10 px-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 md:mb-0">Our Gallery</h2>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1 bg-accent text-primary px-5 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors"
          >
            View All <span className="ml-1">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={1}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {images1.map((src, index) => (
            <div 
              key={index} 
              className={`overflow-hidden rounded-xl ${
                index === 1 || index === 4 ? 'sm:col-span-2 md:col-span-1' : ''
              } ${
                index === 2 || index === 5 ? 'sm:col-span-1 md:col-span-2' : ''
              }`}
            >
              <img
                src={src}
                alt={`Agricultural image ${index + 1}`}
                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={2}
          className="mt-8 text-center"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1 text-primary font-semibold hover:text-accent transition-colors"
          >
            See More Images <span className="ml-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
