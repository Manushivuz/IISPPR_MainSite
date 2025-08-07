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
    image: null, // Stores the File object for upload
  });
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const token = localStorage.getItem('adminToken');
  const backend = import.meta.env.VITE_BASE_URL;

  // Function to fetch testimonials from the backend
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      // Assuming the API endpoint for testimonials is /api/testimonials
      const res = await axios.get(`${backend}/api/testimonials/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        }
      });
      console.log(res);
      if (res.data) {
        setTestimonials(res.data); // Assuming 'documents' key holds the array of testimonials
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

  // Function to handle deleting a testimonial
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      // Assuming the DELETE API endpoint accepts an array of IDs in the request body
      const res = await axios.delete(`${backend}/api/testimonials/`, {
        data: { ids: [id] },
        headers: {
          Authorization: `Bearer ${token}`,
        }
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

  // Function to handle adding or updating a testimonial
  const handleAddOrUpdateTestimonial = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("author", formData.author);
    form.append("text", formData.text);
    if (formData.image) {
      form.append("image", formData.image); // Append the image file to FormData
    }

    try {
      let res;
      if (editingTestimonial) {
        // If editing, send a PUT request to update the existing testimonial
        res = await axios.put(`${backend}/api/testimonials/${editingTestimonial._id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Essential for file uploads
          },
        });
      } else {
        // If not editing, send a POST request to add a new testimonial
        res = await axios.post(`${backend}/api/testimonials/`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Essential for file uploads
          },
        });
      }

      if (res.data) {
        if (editingTestimonial) {
          // Update the testimonial in the local state
          setTestimonials((prev) =>
            prev.map((t) => (t._id === res.data._id ? res.data : t))
          );
        } else {
          // Add the new testimonial to the beginning of the local state
          setTestimonials((prev) => [res.data, ...prev]);
        }
        closeModal(); // Close the modal and reset form
      } else {
        alert(`Failed to ${editingTestimonial ? "update" : "add"} testimonial`);
      }
    } catch (err) {
      console.error(`Error ${editingTestimonial ? "updating" : "adding"} testimonial:`, err);
      alert(`Error ${editingTestimonial ? "updating" : "adding"} testimonial`);
    }
  };

  // Opens the modal for adding a new testimonial
  const openAddModal = () => {
    setEditingTestimonial(null); // Clear any editing state
    setFormData({ author: "", text: "", image: null }); // Reset form data
    setShowModal(true);
  };

  // Opens the modal for editing an existing testimonial
  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial); // Set the testimonial to be edited
    setFormData({ author: testimonial.author, text: testimonial.text, image: null }); // Pre-fill form with existing data, image is not pre-filled for security
    setShowModal(true);
  };

  // Closes the modal and resets all related states
  const closeModal = () => {
    setShowModal(false);
    setFormData({ author: "", text: "", image: null });
    setEditingTestimonial(null);
  };

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Manage Testimonials</h2>

      {loading ? (
        <p className="text-gray-600 text-center">Loading testimonials...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : testimonials.length === 0 ? (
        <p className="text-gray-600 text-center">No testimonials found. Add one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4 flex flex-col items-center text-center"
            >
              <img
                src={testimonial.imageUrl || "/placeholder.svg?height=100&width=100&query=person-avatar"}
                alt={testimonial.author}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-md"
                width={100}
                height={100}
              />
              <h3 className="text-xl font-semibold text-gray-900">{testimonial.author}</h3>
              <p className="text-base text-gray-700 italic">{"\""}{testimonial.text}{"\""}</p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => openEditModal(testimonial)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium shadow-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Testimonial Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={openAddModal}
          className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 text-lg font-semibold shadow-lg"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Modal for Add/Edit Testimonial */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative transform transition-all duration-300 scale-100 opacity-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h3>
            <form onSubmit={handleAddOrUpdateTestimonial} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Author Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Testimonial Author Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Text
                </label>
                <textarea
                  id="text"
                  required
                  placeholder="Enter testimonial text here..."
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-gray-800"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
                  {editingTestimonial ? "Upload New Image (optional)" : "Upload Image"}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  required={!editingTestimonial} // Image is required only for new testimonials
                  accept="image/*" // Accept all image types
                  className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files ? e.target.files[0] : null })}
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
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
