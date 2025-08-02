import { useState, useEffect, useRef } from 'react'
import TestimonialCard from './TestimonialCard'


const testimonials = [
    {
        color: "#7A9164",
        name: "Christopher K.",

        testimonialdata: "The program has provided me with hands-on training in data analytics and its applications in public policy.",
        imageSrc: "/home/t8.webp"
    },
    {
        color: "#7A9164",
        name: "Latifa M.",

        testimonialdata: "I learned how to use tools like R, Power BI, and SPSS to analyze data and make better decisions in public policy.",
        imageSrc: "/home/t2.webp"
    },
    {
        color: "#7A9164",
        name: "Samson A.",

        testimonialdata: "The knowledge is unprecedented! The recordings of the lessons continue to be valuable resources for my learning.",
        imageSrc: "/home/t3.webp"
    },
    {
        color: "#475738",
        name: "Derrick B.",
        testimonialdata: "The facilitators created a collaborative learning environment that fostered innovation and critical thinking.",
        imageSrc: "/home/t4.webp"
    },
    {
        color: "#475738",
        name: "Utsab B.",
        testimonialdata: "I look forward to staying connected with the organization and contributing to its initiatives in the future.",
        imageSrc: "/home/t5.webp"
    },
    {
        color: "#475738",
        name: "Mohamed A.",
        testimonialdata: "The sessions were practical and engaging, helping me see how data can improve public service delivery.",
        imageSrc: "/home/t6.webp"
    },

];


const SeeMoreData = [
    {
        name: "A. Mark Kamara Jr.",
        testimonialData: "Wonderful experience with the fellowship! I gained valuable insights into R and SPSS, and appreciated the focus on time management. The structure of the sessions helped reinforce learning effectively and efficiently.",
        imageSrc: "/home/t1.webp"
    },
    {
        name: "L. Mustafa",
        testimonialData: "The fellowship provided practical training in R, SPSS, Stata, and Power BI. It helped me understand how to apply data analysis in real-world policy problems. It was engaging, insightful, and well-organized.",
        imageSrc: "/home/t2.webp"
    },
    {
        name: "A. S. Akinade",
        testimonialData: "Incredible experience! I learned advanced techniques in R, STATA, and SPSS. Access to recorded sessions allowed me to continue learning. The mentorship was excellent and the support team was top-notch.",
        imageSrc: "/home/t3.webp"
    },
    {
        name: "D. Byamungu",
        testimonialData: "This fellowship gave me hands-on skills in R Programming, Stata, and Power BI. The collaborative sessions were filled with useful insights that enhanced my understanding of evidence-based policy making.",
        imageSrc: "/home/t4.webp"
    },
    {
        name: "U. Bhattarai",
        testimonialData: "I greatly improved my data visualization skills with tools like Stata, Power BI, and R. The sessions were interactive and helped me build confidence while learning through practical examples.",
        imageSrc: "/home/t5.webp"
    },
    {
        name: "S. M. Abdi",
        testimonialData: "The training made a big difference in my understanding of data analytics in humanitarian contexts. Learning Stata, Power BI, and R helped me analyze and visualize data for real-world impact.",
        imageSrc: "/home/t6.webp"
    },
    {
        name: "U. J. Kamara",
        testimonialData: "Thanks to this fellowship, I now understand how to use SPSS, R, and Power BI. I’m motivated to apply what I’ve learned to uplift my community and support better decision-making.",
        imageSrc: "/home/t7.webp"
    },
    {
        name: "A. C. Kehinde",
        testimonialData: "The fellowship sharpened my skills in data interpretation and analysis using SPSS, R, and Power BI. The structure was excellent and I highly recommend it for future professionals in this field.",
        imageSrc: "/home/t8.webp"
    },
    {
        name: "M. O. Qasim",
        testimonialData: "An insightful journey into data-driven policy. With tools like R, SPSS, and Power BI, I gained technical expertise and learned how to turn complex datasets into actionable decisions for policy.",
        imageSrc: "/home/t9.webp"
    },
    {
        name: "Z. M. Abdul",
        testimonialData: "The teaching methods blended theory and practice seamlessly. I learned to perform meaningful data analysis and gained statistical insights under expert mentors who made learning truly enjoyable.",
        imageSrc: "/home/t10.webp"
    },
    {
        name: "G. K. Too",
        testimonialData: "A brilliant experience! The online sessions were engaging and informative. I connected with professionals worldwide and learned to use data for societal development and informed policy making.",
        imageSrc: "/home/t11.webp"
    },
    {
        name: "H. Sekpe",
        testimonialData: "This fellowship was a turning point in my career. The practical data sessions, real-life case studies, and in-depth guidance allowed me to see data as a vital policy tool.",
        imageSrc: "/home/t12.webp"
    },
    {
        name: "D. Bigaba",
        testimonialData: "Collaborative and practical training enhanced my knowledge in SPSS, R, and Power BI. I now feel empowered to advocate for data-driven decisions in my community and professional space.",
        imageSrc: "/home/t13.webp"
    },
    {
        name: "M. Apollo",
        testimonialData: "I explored data coding, statistical analysis, and tests using tools like R and SPSS. Despite technical challenges, access to recorded content ensured I never missed key learning moments.",
        imageSrc: "/home/t14.webp"
    },
    {
        name: "A. Kibet",
        testimonialData: "The fellowship expanded my knowledge of healthcare analytics. I now use R, SPSS, and Power BI to make informed decisions in public health research and clinical data interpretation.",
        imageSrc: "/home/t15.webp"
    },
    {
        name: "E. E. Edebor",
        testimonialData: "This program equipped me with robust skills in R, STATA, and Power BI. I now apply these to conduct research supporting trade and development under the AfCFTA framework.",
        imageSrc: "/home/t16.webp"
    },
    {
        name: "M. Khare",
        testimonialData: "Thanks to this training, I now understand how data drives policy. The case studies and mentorship helped me build a solid foundation in R, SPSS, and Power BI tools.",
        imageSrc: "/home/t17.webp"
    }
]






const TestimonialGrid = () => {

    const scrollContainerRef = useRef(null)
    // State to track if user is hovering over the container
    const [isHovering, setIsHovering] = useState(false)

    // Auto-scrolling effect
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        if (!scrollContainer) return

        let animationFrameId;
        let lastTimestamp;
        const scrollSpeed = 0.2 // pixels per millisecond

        const scroll = (timestamp) => {
            if (!lastTimestamp) lastTimestamp = timestamp

            // Don't scroll if user is hovering
            if (!isHovering) {
                const elapsed = timestamp - lastTimestamp
                scrollContainer.scrollLeft += scrollSpeed * elapsed

                // Reset to beginning when reaching the end
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
                    scrollContainer.scrollLeft = 0
                }
            }

            lastTimestamp = timestamp
            animationFrameId = requestAnimationFrame(scroll)
        }

        animationFrameId = requestAnimationFrame(scroll)

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [isHovering])

    const scrollbarHideStyles = `
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `

    const hoverCard = `
         .testimonial-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

    `

    return (
        <>
            <style jsx global>
                {hoverCard}
            </style>
            <div className="relative bg-white w-full h-full">

                <img className='absolute inset-0' src="/testimonials/diagonal.svg" alt="" />

                <div className="flex flex-col items-center justify-center w-full h-full ">
                    {/* =========================
                    Main Testimonial Section
                ========================= */}
                    <div className="relative mb-44 flex testimonial-card shadow-2xl flex-col  top-[120px] bg-gradient-to-br from-[#5e6457] from-20% to-[#e1e4de] to-45%  border border-[#F3FFE7] rounded-xl bg-black/80 items-start w-[360px] md:w-[800px] justify-end md:justify-center h-[390px] md:h-[250px]">
                        <div className="flex flex-col mb-8 md:mb-0 w-[360px] md:w-[400px] items-center justify-center">

                            <img className='bg-black w-28 h-28 rounded-full' src="/home/t1.webp" alt="" />
                            <span className="font-bold text-lg text-black p-2 text-center ">Anthony M.</span>
                        </div>

                        <div className="md:absolute w-full md:w-[50%] h-[150px] md:h-full rounded-xl  text-center flex items-center justify-center right-0 bg-[#F3FFE7]">
                            <span className="p-1 md:p-16 font-medium ">My experience during the program was wonderful. I have no regrets about the knowledge I gained.</span>
                        </div>
                    </div>


                    <div className="flex items-center gap-4 w-fit h-1 pb-14">
                        {/* <br className="bg-[#22370D] w-[8px] h-[1px]" /> */}
                        {/* <br className="bg-[#22370D] w-[8px] h-[1px]" /> */}
                        {/* <br className="bg-[#22370D] w-[8px] h-[1px]" /> */}
                        <div className="bg-[#22370D] w-[50px] h-[2px]"> </div>
                        <div className="bg-[#22370D] w-[50px] h-[2px]"> </div>
                        <div className="bg-[#22370D] w-[50px] h-[2px]"> </div>
                    </div>

                    {/* testimonialCards cards */}

                    <div className="flex flex-wrap justify-center items-center w-full h-max ">
                        {testimonials.map((t, index) => (
                            <TestimonialCard

                                key={index}
                                color={t.color}
                                name={t.name}
                                imageSrc={t.imageSrc}
                                testimonialdata={t.testimonialdata}
                            />
                        ))}
                    </div>


                </div>

                {/* SEE MORE SECTION */}

                <section className="py-16 bg-white relative overflow-hidden">
                    <style jsx >
                        {scrollbarHideStyles}
                    </style>


                    <div className="px-4 relative z-10">
                        <div className="flex items-center justify-center w-full gap-1 mb-10">
                            <div className="bg-[#252A34] w-[40px] h-[2px]"> </div>
                            <h2 className="text-4xl font-serif text-[#252A34]  font-medium text-center ">
                                See More
                            </h2>
                            <div className="bg-[#252A34] w-[40px] h-[2px]"> </div>
                        </div>


                        <div className="relative w-full">
                            <div className="flex  overflow-x-auto  scrollbar-hide -mx-4 px-4 space-x-6"
                                ref={scrollContainerRef}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                style={{ scrollBehavior: "smooth" }}
                            >
                                {SeeMoreData.map((t, index) => (
                                    <div key={index} className="flex-shrink-0  flex items-center justify-between text-[#FFFFFF]  w-96 bg-[#0E1705]/85 pt-8 p-6 rounded-xl shadow-lg ">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-[80px] h-[80px] bg-[#ffffff] rounded-full overflow-hidden mr-3">
                                                <img
                                                    src={t.imageSrc}
                                                    alt={t.name}
                                                    className=" rounded-full"
                                                />
                                            </div>
                                            <h4 className="text-center mt-2 mr-3 font-bold">{t.name}</h4>
                                        </div>
                                        <p className="text-sm flex-1 line-clamp-5 text-[#FFFFFF] text-center ">
                                            {t.testimonialData}
                                        </p>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                <div className="bg-[#606758] w-full h-[20px]"></div>
                <div className="bg-[#22370D] w-full h-[25px]"></div>
            </div >

        </>
    )
}

export default TestimonialGrid
