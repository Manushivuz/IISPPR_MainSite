// Ads.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get("/api/ads");
        setAds(res.data); // ✅ Advertisement model returns array
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Created Ads</h2>

      {loading ? (
        <p className="text-gray-500">Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-gray-500">No ads found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-medium">{ad.title}</h3>
              {ad.description && (
                <p className="text-sm text-gray-600 mt-1">{ad.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ads;
