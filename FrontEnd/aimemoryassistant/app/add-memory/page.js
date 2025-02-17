// app/add-memory/page.js
"use client";

import React, { useState } from "react";
import api from "../../utils/api";

const AddMemory = () => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("text", text);
    if (audio) {
      formData.append("audio", audio);
    }

    try {
      const response = await api.post("/memories/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Memory saved:", response.data);
      setSuccess(true);
      setText("");
      setAudio(null);
    } catch (error) {
      console.error("Error saving memory:", error);
      setError("Failed to save memory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Add a Memory
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Memory Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your memory here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Audio (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setAudio(e.target.files[0])}
              accept="audio/*"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Save Memory"}
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          {success && (
            <p className="mt-4 text-green-500 text-center">
              Memory saved successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddMemory;
