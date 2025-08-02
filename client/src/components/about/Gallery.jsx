import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GalleryCarousel = () => {
  const images = Array.from(
    { length: 32 },
    (_, i) => `/gallery/im${i + 1}.jpg`
  );
  const slides = Array.from({ length: 3 }, (_, i) =>
    images.slice(i * 6, (i + 1) * 6)
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 640);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: isMobile ? 16 : 0,
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
    <section className="relative bg-primary-light/25 pt-20 py-6 pb-20 px-2 sm:px-10 text-gray-900">
      <div className="w-full max-w-7xl mx-auto px-2 md:px-8 select-none">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-2 sm:px-5">
          <h2 className="text-4xl font-semibold text-primary font-serif">
            Our Gallery
          </h2>
          <Link
            to="/gallery"
            className="text-md font-semibold flex flex-row items-center gap-1 mt-3 hover:text-accent hover:scale-110 transition-transform"
          >
            <p className="text-base">Learn More</p>
            <ChevronRight size={18} className="text-accent" />
          </Link>
        </div>

        {isMobile ? (
          <div className="relative">
            <div ref={sliderRef} className="keen-slider">
              {images.map((src, i) => (
                <div key={i} className="keen-slider__slide">
                  <div className="w-full h-[260px] sm:h-[300px]">
                    <img
                      src={src}
                      alt={`Gallery Image ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-lg border border-accent/30 shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-center gap-8 mt-4">
              <div
                aria-label="Previous"
                onClick={() => instanceRef.current?.prev()}
                className="bg-primary border-2 border-accent text-white rounded-full size-8 flex items-center justify-center shadow-md hover:bg-accent hover:text-primary transition"
              >
                <ChevronLeft size={22} />
              </div>
              <div
                aria-label="Next"
                onClick={() => instanceRef.current?.next()}
                className="bg-primary border-2 border-accent text-white rounded-full size-8 flex items-center justify-center shadow-md hover:bg-accent hover:text-primary transition"
              >
                <ChevronRight size={22} />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative mx-2 sm:mx-6">
            <div
              ref={sliderRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="keen-slider"
            >
              {slides.map((group, idx) => (
                <div
                  key={idx}
                  className="keen-slider__slide grid grid-cols-4 gap-4"
                >
                  {group.map((src, i) => {
                    const widthClasses = [
                      "col-span-1",
                      "col-span-2",
                      "col-span-1",
                      "col-span-1",
                      "col-span-1",
                      "col-span-2",
                    ];
                    return (
                      <div
                        key={i}
                        className={`overflow-hidden h-[260px] sm:h-[300px] ${
                          widthClasses[i % widthClasses.length]
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Gallery Image ${idx * 6 + i + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-lg border border-accent/30 shadow-md transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div
              aria-label="Previous"
              onClick={() => instanceRef.current?.prev()}
              className="absolute top-1/2 -left-20 -translate-y-1/2 bg-primary border-2 border-accent text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg hover:bg-accent hover:text-primary transition"
            >
              <ChevronLeft size={28} />
            </div>
            <div
              aria-label="Next"
              onClick={() => instanceRef.current?.next()}
              className="absolute top-1/2 -right-20 -translate-y-1/2 bg-primary border-2 border-accent text-white bg-none rounded-full w-11 h-11 flex items-center justify-center shadow-lg hover:bg-accent hover:text-primary transition"
            >
              <ChevronRight />
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, idx) => (
              <div
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-8 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === idx
                    ? "bg-accent scale-110 shadow"
                    : "bg-primary border border-accent"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryCarousel;