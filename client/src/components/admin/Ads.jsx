// Ads.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminAdManager from "./AdminAdManager.jsx"; // ✅ Import AdminAdManager

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showManager, setShowManager] = useState(false); // ✅ State to toggle admin view
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

  // ✅ If "Manage Ads" is clicked, render AdminAdManager
  if (showManager) {
    return <AdminAdManager />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Created Ads</h2>
        <button
          onClick={() => setShowManager(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Manage Ads
        </button>
      </div>

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
