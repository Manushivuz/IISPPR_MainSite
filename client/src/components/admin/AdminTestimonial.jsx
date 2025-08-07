import React, { useEffect, useState } from "react";
import axios from "axios";

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    author: "",
    text: "",
    image: null,
  });
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const token = localStorage.getItem("adminToken");
  const backend = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backend}/api/testimonials/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) {
          setTestimonials(res.data);
        } else {
          setError("Failed to load testimonials");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Error fetching testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;
    try {
      const res = await axios.delete(`${backend}/api/testimonials/`, {
        data: { ids: [id] },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert("Failed to delete testimonial.");
      }
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      alert("An error occurred during deletion.");
    }
  };

  const handleAddOrUpdateTestimonial = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("author", formData.author);
    form.append("text", formData.text);
    if (formData.image) form.append("image", formData.image);

    try {
      let res;
      if (editingTestimonial) {
        res = await axios.put(
          `${backend}/api/testimonials/${editingTestimonial._id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        res = await axios.post(`${backend}/api/testimonials/`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (res.data) {
        if (editingTestimonial) {
          setTestimonials((prev) =>
            prev.map((t) => (t._id === res.data._id ? res.data : t))
          );
        } else {
          setTestimonials((prev) => [res.data, ...prev]);
        }
        closeModal();
      } else {
        alert(`Failed to ${editingTestimonial ? "update" : "add"} testimonial`);
      }
    } catch (err) {
      console.error(
        `Error ${editingTestimonial ? "updating" : "adding"} testimonial:`,
        err
      );
      alert(`Error ${editingTestimonial ? "updating" : "adding"} testimonial`);
    }
  };

  const openAddModal = () => {
    setEditingTestimonial(null);
    setFormData({ author: "", text: "", image: null });
    setShowModal(true);
  };

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      author: testimonial.author,
      text: testimonial.text,
      image: null,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ author: "", text: "", image: null });
    setEditingTestimonial(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] px-4 sm:px-6 md:px-8 pt-28 pb-10">
      {/* Page Heading */}
      <div className="bg-[#1E1E2F] text-white rounded-2xl px-6 py-4 shadow mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-semibold text-center sm:text-left">
          Manage Testimonials
        </h3>
        <button
          onClick={openAddModal}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full w-full sm:w-auto"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500 text-center mt-10">
          Loading testimonials...
        </p>
      ) : error ? (
        <p className="text-red-500 text-center mt-10">{error}</p>
      ) : testimonials.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">
          No testimonials found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white rounded-2xl shadow-md p-6 text-center space-y-3 hover:shadow-lg transition-all"
            >
              <img
                src={testimonial.imageUrl || "/placeholder.svg"}
                alt={testimonial.author}
                className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-blue-500 shadow"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {testimonial.author}
              </h3>
              <p className="text-sm text-gray-600 italic">
                "{testimonial.text}"
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => openEditModal(testimonial)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition font-medium"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
              {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
            </h3>
            <form onSubmit={handleAddOrUpdateTestimonial} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Text
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter testimonial"
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingTestimonial
                    ? "Replace Image (optional)"
                    : "Upload Image"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required={!editingTestimonial}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingTestimonial ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsAdmin;
