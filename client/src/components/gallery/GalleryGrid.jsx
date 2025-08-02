import React from 'react';

const GalleryGrid = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-primary rounded-full mb-2">
                {item.category}
              </span>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-white/80">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
