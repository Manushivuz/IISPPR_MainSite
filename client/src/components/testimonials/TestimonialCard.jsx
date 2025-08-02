import React from 'react'

const TestimonialCard = ({ key, name, testimonialdata, color, imageSrc }) => {

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
            <div key={key}
                style={{ backgroundColor: color }}
                // className={`bg-[${color}]  p-6 rounded-xl testimonial-card w-[340px] m-6 h-[400px] text-white hover:bg-[#23291C]`}
                className={` p-6 rounded-xl testimonial-card w-[340px] m-6 h-[360px] max-h-[360px] text-white`}>
                <div className="flex flex-col items-center mb-4">
                    <div className="w-[100px] h-[100px] bg-gray-700 rounded-full overflow-hidden mb-2">
                        <img
                            src={`${imageSrc}`}
                            alt={name}

                            className="w-[100px] h-[100px] object-cover bg-[#23291C] rounded-full "
                        />
                    </div>
                    <h4 className="font-medium leading-4 tex-xl mt-2">{name}</h4>
                </div>
                <p className="text-[18px] px-6 py-3 font-normal text-center">
                    {testimonialdata}               </p>
            </div>
        </>
    )
}

export default TestimonialCard
