import React from 'react'

const TestimonialWallpapers = () => {
    const testimonialsData = [
        {
            imageSrc: '/home/t8.webp',
            testimonialData: "The program has provided me with hands-on training in data analytics and its applications in public policy.",
            name: "Christopher K.",
        },
        {
            name: "Samson A.",
            testimonialData: "The knowledge is unprecedented! The recordings of the lessons continue to be valuable resources for my learning.",
            imageSrc: "/home/t3.webp"
        },
        {
            name: "Derrick B.",
            testimonialData: "The facilitators created a collaborative learning environment that fostered innovation and critical thinking.",
            imageSrc: "/home/t4.webp"
        },
    ];




    return (
        <>

            <section className="relative w-full h-[50vh] min-h-[400px] sm:min-h-[0px] sm:h-[60vh] md:h-[80vh] lg:h-[100vh] bg-cover bg-center bg-no-repeat">
                {/* Background image with responsive sizing */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("/testimonials/testimonial1.png")' }}
                ></div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content positioned inside the image */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start px-4 sm:px-6 md:px-10 pt-12 md:pt-20 z-10 text-white">

                    {/* Heading box */}
                    <div className="max-w-lg md:max-w-xl lg:max-w-2xl mb-6 md:mb-8">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">Testimonials</h2>
                        <p className="mt-2 md:mt-4 text-base md:text-lg text-white/90 ml-1">
                            Hear from our farmers and partners who've worked with us and seen great results in the field.
                        </p>
                    </div>

                    {/* Testimonial box */}
                    <div className="bg-white/5 hover:scale-105 hover:ease-in-out transition-all duration-300 backdrop-blur-md border border-white/30 rounded-xl p-4 md:p-8 w-full mt-4 md:mt-20 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-lg">
                        <p className="text-base sm:text-lg md:text-xl italic">
                            "{testimonialsData[0].testimonialData}"
                        </p>

                        {/* Profile section */}
                        <div className="flex items-center mt-4 md:mt-6">
                            <img
                                src={testimonialsData[0].imageSrc}
                                alt="Profile"
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-white object-cover"
                            />
                            <div className="ml-4">
                                <h4 className="text-lg md:text-xl font-semibold">{testimonialsData[0].name}</h4>
                                <p className="text-xs sm:text-sm text-white/80">Volunteer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-[100vh] bg-cover bg-center bg-no-repeat">
                {/* Background image with responsive sizing */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("/testimonials/testimonial2.png")' }}
                ></div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content container */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-end px-4 sm:px-6 md:px-10 z-10">

                    {/* Testimonial box on the right side */}
                    <div className="bg-white/10 hover:scale-105 hover:ease-in-out transition-all duration-300  backdrop-blur-md border border-white/30 rounded-xl p-4 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-lg">
                        <p className="text-base sm:text-lg md:text-xl italic text-white">
                            "{testimonialsData[1].testimonialData}"
                        </p>

                        {/* Profile section */}
                        <div className="flex items-center mt-4 md:mt-6">
                            <img
                                src={testimonialsData[1].imageSrc}
                                alt="Profile"
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-white object-cover"
                            />
                            <div className="ml-4">
                                <h4 className="text-lg md:text-xl font-semibold text-white">{testimonialsData[1].name}</h4>
                                <p className="text-xs sm:text-sm text-white/80">Volunteer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-[100vh] bg-cover bg-center bg-no-repeat">
                {/* Background image with responsive sizing */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("/testimonials/testimonial3.png")' }}
                ></div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Testimonial Box on the right side */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start px-4 sm:px-6 md:px-10 z-10">
                    <div className="bg-white/10 hover:scale-105 hover:ease-in-out transition-all duration-300 backdrop-blur-md border border-white/30 rounded-xl p-4 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-lg">
                        <p className="text-base sm:text-lg md:text-xl italic text-white">
                            "{testimonialsData[2].testimonialData}"
                        </p>

                        {/* Profile section */}
                        <div className="flex items-center mt-4 md:mt-6">
                            <img
                                src={testimonialsData[2].imageSrc}
                                alt="Profile"
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-white object-cover"
                            />
                            <div className="ml-4">
                                <h4 className="text-lg md:text-xl font-semibold text-white">{testimonialsData[2].name}</h4>
                                <p className="text-xs sm:text-sm text-white/80">Volunteer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TestimonialWallpapers;