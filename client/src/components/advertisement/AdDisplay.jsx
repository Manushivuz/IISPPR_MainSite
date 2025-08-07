import { useEffect, useState } from 'react';
import axios from 'axios';

const AdDisplay = ({ pageType, position }) => {
  const [ad, setAd] = useState(null);
  const backend = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axios.get(`${backend}/api/pageads`, {
          params: { page: pageType, position }, // ✅ pass both
        });

        // Backend returns { page, position, ads: [...] }
        if (res.data?.ads?.length > 0) {
          setAd(res.data.ads[0]); // Assuming you want to display the first ad
        } else {
          console.log(`No ad assigned for "${pageType}" at position "${position}".`);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          console.log(`No ad found for "${pageType}" at "${position}".`);
        } else {
          console.error("Error fetching ad:", err.message);
        }
        setAd(null);
      }
    };

    setAd(null); // reset between renders
    fetchAd();
  }, [pageType, position]);

  if (!ad) return null;

  return (
    <div className="w-full bg-gray-900 flex justify-center py-2">
      <img src={ad.imageUrl} alt={ad.title} className="max-w-full h-auto" />
    </div>
  );
};

export default AdDisplay;
