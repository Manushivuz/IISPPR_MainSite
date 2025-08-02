
  import React, { useEffect, useRef, useState } from "react";

  const Gallery = () => {
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef(null);

    const images = [
      "/gallery/im1.jpg", "/gallery/im2.jpeg", "/gallery/im3.jpeg", "/gallery/im4.jpg",
      "/gallery/im5.jpeg", "/gallery/im6.jpg", "/gallery/im7.jpg", "/gallery/im8.jpg",
      "/gallery/im9.jpg", "/gallery/im10.jpg", "/gallery/im12.jpg",
      "/gallery/im13.jpg", "/gallery/im14.jpg", "/gallery/im15.jpg", "/gallery/im16.jpg",
      "/gallery/im17.jpg", "/gallery/im18.jpg", "/gallery/im19.jpg", "/gallery/im20.jpg",
      "/gallery/im21.jpg", "/gallery/im22.jpeg", "/gallery/im23.jpeg", "/gallery/im24.jpg",
      "/gallery/im25.jpg", "/gallery/im26.jpeg", "/gallery/im27.jpeg", "/gallery/im28.jpeg",
      "/gallery/im29.jpeg",
    ];

    useEffect(() => {
      let scrollInterval;
      let isScrollingBack = false;
      let delayTimeout;

      const startScrolling = () => {
        scrollInterval = setInterval(() => {
          if (isPaused || isScrollingBack) return;

          const scrollTop = window.scrollY;
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = document.documentElement.clientHeight;

          // If at bottom
          if (scrollTop + clientHeight >= scrollHeight - 1) {
            clearInterval(scrollInterval);
            isScrollingBack = true;

            setTimeout(() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              isScrollingBack = false;
              startScrolling(); // restart scrolling after scroll-to-top
            }, 2000); // wait for 2 seconds before scrolling to top
          } else {
            window.scrollBy({
              top: 1,
              behavior: "smooth",
            });
          }
        }, 30);
      };

      // Start scrolling only after 20 seconds
      if (!isPaused) {
        delayTimeout = setTimeout(() => {
          startScrolling();
        }, 2000); // 20 seconds delay
      }

      return () => {
        clearTimeout(delayTimeout);
        clearInterval(scrollInterval);
      };
    }, [isPaused]);

    return (
      <div
        className="min-h-screen bg-gradient-to-b from-[#202d1a] to-[#202d1a] text-white flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        ref={scrollRef}
      >
        {/* Masonry Gallery Grid */}
        <div className="flex-1 bg-[#5b5e5a] pt-12 pb-10 px-4 md:px-20">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-4">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full mb-4 rounded-xl shadow-lg break-inside-avoid"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Gallery;
