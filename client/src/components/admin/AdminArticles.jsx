import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const backend = import.meta.env.VITE_BASE_URL;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author_names: "",
    date: "",
    pdf: null,
  });

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${backend}/api/documents?type=article`);
      const data = await res.json();
      if (data.success) {
        setArticles(data.documents);
      } else {
        setError("Failed to load articles");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching articles");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;

    try {
      const res = await fetch(`${backend}/api/documents?type=article`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });

      const result = await res.json();
      if (result.success) {
        setArticles((prev) => prev.filter((a) => a._id !== id));
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during deletion.");
    }
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("author_names", formData.author_names);
    form.append("date", formData.date);
    form.append("type", "article");
    form.append("pdf", formData.pdf);

    try {
      const res = await fetch(`${backend}/api/documents`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setArticles((prev) => [data.document, ...prev]);
        setShowModal(false);
        setFormData({ title: "", author_names: "", date: "", pdf: null });
      } else {
        alert("Failed to add article");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding article");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] px-4 sm:px-6 md:px-8 pt-28 pb-10">
      {/* Header section */}
      <div className="bg-[#1E1E2F] text-white rounded-2xl px-6 py-4 shadow mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-semibold text-center sm:text-left">
          Manage Articles
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full w-full sm:w-auto"
        >
          + Add Article
        </button>
      </div>

      {/* Article list */}
      {loading ? (
        <p className="text-gray-600">Loading articles...</p>
      ) : error ? (
        <p className="text-red-600 font-medium">{error}</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-600">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {article.author_names.join(", ")} •{" "}
                {format(new Date(article.date), "yyyy-MM-dd")}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View PDF →
                </a>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl relative shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Add New Article
            </h3>

            <form onSubmit={handleAddArticle} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Title"
                className="w-full p-3 border rounded-xl"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                type="text"
                required
                placeholder="Authors (comma separated)"
                className="w-full p-3 border rounded-xl"
                value={formData.author_names}
                onChange={(e) =>
                  setFormData({ ...formData, author_names: e.target.value })
                }
              />

              <input
                type="date"
                required
                className="w-full p-3 border rounded-xl"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <input
                type="file"
                required
                accept=".pdf"
                className="w-full"
                onChange={(e) =>
                  setFormData({ ...formData, pdf: e.target.files[0] })
                }
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
