// app/home/page.js
"use client";

import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const Home = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/memories/")
      .then((response) => {
        setMemories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching memories:", error);
        setError("Failed to load memories. Please try again later.");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "No date available"; // Fallback for missing or null dates
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date"; // Fallback for invalid dates
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Your Memories
        </h1>
        {memories.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No memories found. Start adding some!</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {memories.map((memory) => (
              <li
                key={memory.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {memory.text}
                  </h2>
                  {memory.audio && (
                    <div className="mt-4">
                      <audio controls className="w-full">
                        <source src={memory.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    Created on: {formatDate(memory.timestamp)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {memory.category}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
