import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
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

  const fetchReports = async () => {
    try {
      const res = await fetch(`${backend}/api/documents?type=report`);
      const data = await res.json();
      if (data.success) {
        setReports(data.documents);
      } else {
        setError("Failed to load reports");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching reports");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const res = await fetch(`${backend}/api/documents?type=report`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });

      const result = await res.json();
      if (result.success) {
        setReports((prev) => prev.filter((r) => r._id !== id));
      } else {
        alert("Failed to delete report.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during deletion.");
    }
  };

  const handleAddReport = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("author_names", formData.author_names);
    form.append("date", formData.date);
    form.append("type", "report");
    form.append("pdf", formData.pdf);

    try {
      const res = await fetch(`${backend}/api/documents`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setReports((prev) => [data.document, ...prev]);
        setShowModal(false);
        setFormData({ title: "", author_names: "", date: "", pdf: null });
      } else {
        alert("Failed to add report");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding report");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Reports</h2>

      {loading ? (
        <p className="text-gray-600">Loading reports...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-600">No reports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white p-5 rounded-xl shadow border space-y-2 relative"
            >
              <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
              <p className="text-sm text-gray-600">
                {report.author_names.join(", ")} •{" "}
                {format(new Date(report.date), "yyyy-MM-dd")}
              </p>

              <a
                href={report.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View PDF →
              </a>
              <br />
              <button
                onClick={() => handleDelete(report._id)}
                className="text-sm mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Report Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          + Add Report
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Report</h3>

            <form onSubmit={handleAddReport} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Title"
                className="w-full p-2 border rounded"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <input
                type="text"
                required
                placeholder="Authors (comma separated)"
                className="w-full p-2 border rounded"
                value={formData.author_names}
                onChange={(e) => setFormData({ ...formData, author_names: e.target.value })}
              />

              <input
                type="date"
                required
                className="w-full p-2 border rounded"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />

              <input
                type="file"
                required
                accept=".pdf"
                className="w-full"
                onChange={(e) => setFormData({ ...formData, pdf: e.target.files[0] })}
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
