import { useEffect, useState } from "react";
import axios from "axios";

const pages = ["home", "about", "gallery", "reports", "articles", "testimonials"];

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

  console.log("allAds content:", allAds);

  useEffect(() => {
    fetchAds();
    fetchPageAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await axios.get(`${backend}/api/ads`); // ✅ gets all ads from Advertisement model
      setAllAds(res.data); // res.data is an array
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

        if (!pageMap[page]) {
          pageMap[page] = [];
        }

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

  const handleAssign1 = async (adId) => {
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
    if (!image || !title) {
      alert("Image and title are required");
      return;
    }

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
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">Admin Ad Manager</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              setActivePage(page);
              setShowAssignPanel(false);
              setMessage("");
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activePage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Assigned Ads */}
      <section className="bg-white border rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Assigned Ads for "{activePage}"
        </h2>

        {topAds.length === 0 && bottomAds.length === 0 ? (
          <div className="text-gray-500 mb-4">No ads assigned for this page.</div>
        ) : (
          <>
            {topAds.length > 0 && (
              <>
                <h3 className="text-md font-semibold mt-2 text-gray-600">Top Ads</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {topAds.map((ad) => (
                    <div key={ad._id} className="border rounded-lg p-2 shadow-sm">
                      <img src={ad.imageUrl} alt={ad.title} className="w-full h-24 object-contain mb-2" />
                      <p className="text-sm font-medium text-gray-700 truncate">{ad.title}</p>
                      <button
                        onClick={() => handleUnassign(ad._id,"top")}
                        className="mt-2 w-full text-sm text-red-600 hover:text-red-800 transition"
                      >
                        Unassign
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
            {bottomAds.length > 0 && (
              <>
                <h3 className="text-md font-semibold mt-4 text-gray-600">Bottom Ads</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {bottomAds.map((ad) => (
                    <div key={ad._id} className="border rounded-lg p-2 shadow-sm">
                      <img src={ad.imageUrl} alt={ad.title} className="w-full h-24 object-contain mb-2" />
                      <p className="text-sm font-medium text-gray-700 truncate">{ad.title}</p>
                      <button
                        onClick={() => handleUnassign(ad._id,"bottom")}
                        className="mt-2 w-full text-sm text-red-600 hover:text-red-800 transition"
                      >
                        Unassign
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <div className="mt-6">
          <button
            onClick={() => setShowAssignPanel(!showAssignPanel)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            {showAssignPanel ? "Cancel" : "Assign Ad"}
          </button>
        </div>
      </section>

      {/* Assign Ad Panel */}
      {showAssignPanel && (
        <section className="bg-white border rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Assign Ad to "{activePage}"</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Ad Position</label>
            <select
              value={assignPosition}
              onChange={(e) => setAssignPosition(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.isArray(allAds) && allAds.map((ad) => (
              <div
                key={ad._id}
                className="border rounded-lg p-2 cursor-pointer hover:shadow-md transition"
              >
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-24 object-contain mb-2" />
                <p className="text-sm font-medium text-gray-700 truncate">{ad.title}</p>
                <button
                  onClick={() => handleAssign(ad._id)}
                  className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Assign
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Create Ad */}
      <section className="bg-white border rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New Ad</h2>
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
      </section>

      {/* Delete Ads */}
      <section className="bg-white border rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Delete Ads</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {Array.isArray(allAds) && allAds.map((ad) => (
            <div key={ad._id} className="border p-2 rounded">
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
                <p className="text-sm font-medium text-gray-700 truncate">{ad.title}</p>
              </div>
              <img src={ad.imageUrl} alt={ad.title} className="w-full h-24 object-contain" />
            </div>
          ))}
        </div>
        <button
          onClick={handleDeleteAds}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
        >
          Delete Selected Ads
        </button>
      </section>

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
