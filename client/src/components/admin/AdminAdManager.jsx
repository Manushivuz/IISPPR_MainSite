import { useEffect, useState } from "react";
import axios from "axios";

const pages = [
  "home",
  "about",
  "gallery",
  "reports",
  "articles",
  "testimonials",
];

const AdminAdManager = () => {
  const [allAds, setAllAds] = useState([]);
  const [assignedAds, setAssignedAds] = useState({});
  const [activePage, setActivePage] = useState("home");
  const [showAssignPanel, setShowAssignPanel] = useState(false);
  const [assignPosition, setAssignPosition] = useState("top");
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const backend = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchAds();
    fetchPageAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await axios.get(`${backend}/api/ads`);
      setAllAds(res.data);
    } catch (err) {
      console.error("Failed to fetch ads:", err);
    }
  };

  const fetchPageAds = async () => {
    try {
      const res = await axios.get(`${backend}/api/pageads/getall`);
      const pageMap = {};
      res.data.data.forEach((entry) => {
        const page = entry.page;
        const position = entry.position;
        const ads = entry.adIds;
        if (!pageMap[page]) pageMap[page] = [];
        ads.forEach((ad) => {
          pageMap[page].push({ ...ad, position });
        });
      });
      setAssignedAds(pageMap);
    } catch (err) {
      console.error("Failed to fetch assigned ads:", err);
    }
  };

  const handleAssign = async (adId) => {
    try {
      await axios.post(`${backend}/api/pageads`, {
        adId,
        pages: [activePage],
        position: assignPosition,
      });
      setMessage("Ad assigned successfully.");
      setShowAssignPanel(false);
      fetchPageAds();
    } catch (err) {
      console.error("Failed to assign ad:", err);
      setMessage("Failed to assign ad.");
    }
  };

  const handleUnassign = async (adId, position) => {
    try {
      await axios.delete(`${backend}/api/pageads/unassign`, {
        data: { adId, page: activePage, position },
      });
      setMessage("Ad unassigned successfully.");
      fetchPageAds();
    } catch (err) {
      console.error("Failed to delete ad:", err.response?.data || err.message);
      setMessage("Failed to delete ad.");
    }
  };

  const handleCreateAd = async (e) => {
    e.preventDefault();
    if (!image || !title) return alert("Image and title are required");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post(`${backend}/api/ads`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setDescription("");
      setImage(null);
      fetchAds();
      setMessage("Ad created successfully.");
    } catch (err) {
      console.error("Error uploading ad:", err);
      setMessage("Failed to create ad.");
    }
  };

  const handleDeleteAds = async () => {
    if (selectedIds.length === 0) return alert("Select ads to delete.");
    try {
      await axios.delete(`${backend}/api/ads`, {
        data: { ids: selectedIds },
      });
      setSelectedIds([]);
      fetchAds();
      setMessage("Ads deleted successfully.");
    } catch (error) {
      console.error("Deletion failed:", error);
      setMessage("Failed to delete ads.");
    }
  };

  const adsForPage = assignedAds[activePage] || [];
  const topAds = adsForPage.filter((ad) => ad.position === "top");
  const bottomAds = adsForPage.filter((ad) => ad.position === "bottom");

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8">
      <div className="bg-white rounded-xl p-6 shadow mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Manage Ads</h3>
          <button
            onClick={() => setShowAssignPanel(!showAssignPanel)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {showAssignPanel ? "Cancel" : "+ Assign Ad"}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              setActivePage(page);
              setShowAssignPanel(false);
              setMessage("");
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activePage === page
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {(topAds.length > 0 || bottomAds.length > 0) && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
          {[...topAds, ...bottomAds].map((ad) => (
            <div key={ad._id} className="bg-white rounded-lg shadow p-4">
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-32 object-contain mb-2"
              />
              <h2 className="text-sm font-semibold text-gray-800 truncate">
                {ad.title}
              </h2>
              <p className="text-xs text-gray-500">
                {ad.position.toUpperCase()} Position
              </p>
              <button
                onClick={() => handleUnassign(ad._id, ad.position)}
                className="mt-3 bg-red-100 text-red-600 text-sm px-3 py-1 rounded hover:bg-red-200"
              >
                Unassign
              </button>
            </div>
          ))}
        </div>
      )}

      {showAssignPanel && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Assign Ad to "{activePage}"
          </h2>
          <div className="mb-4">
            <label className="text-sm font-medium">Ad Position</label>
            <select
              value={assignPosition}
              onChange={(e) => setAssignPosition(e.target.value)}
              className="w-full mt-1 border px-4 py-2 rounded"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allAds.map((ad) => (
              <div
                key={ad._id}
                className="bg-gray-50 border rounded-lg p-3 hover:shadow"
              >
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-24 object-contain mb-2"
                />
                <p className="text-sm font-medium text-gray-700 truncate">
                  {ad.title}
                </p>
                <button
                  onClick={() => handleAssign(ad._id)}
                  className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Assign
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Ad */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Create New Ad
        </h2>
        <form onSubmit={handleCreateAd} className="space-y-4">
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <textarea
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Upload Ad
          </button>
        </form>
      </div>

      {/* Delete Ads */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Delete Ads</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {allAds.map((ad) => (
            <div key={ad._id} className="border rounded p-2">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedIds.includes(ad._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds([...selectedIds, ad._id]);
                    } else {
                      setSelectedIds(selectedIds.filter((id) => id !== ad._id));
                    }
                  }}
                />
                <p className="text-sm font-medium text-gray-700 truncate">
                  {ad.title}
                </p>
              </div>
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-24 object-contain"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleDeleteAds}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
        >
          Delete Selected Ads
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="text-sm mt-4 text-green-700 bg-green-100 px-4 py-2 border border-green-200 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default AdminAdManager;
