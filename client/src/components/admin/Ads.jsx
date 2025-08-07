import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminAdManager from "./AdminAdManager.jsx";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showManager, setShowManager] = useState(false);
  const backend = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`${backend}/api/ads`);
        setAds(res.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (showManager) {
    return <AdminAdManager />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] px-4 sm:px-6 md:px-8 pt-28 pb-10">
      <div className="bg-[#1E1E2F] text-white rounded-2xl px-6 py-4 shadow mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-center sm:text-left">
          Manage Ads
        </h2>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center mt-10">Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No ads found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-[1.01]"
            >
              <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {ad.title}
                </h3>
                {ad.description && (
                  <p className="text-sm text-gray-600 mt-2">{ad.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ads;
