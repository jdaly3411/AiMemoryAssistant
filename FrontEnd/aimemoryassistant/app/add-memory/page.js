// app/add-memory/page.js
"use client";

import React, { useState } from "react";
import api from "../../utils/api";

const AddMemory = () => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("audio", audio);

    try {
      const response = await api.post("/memories/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Memory saved:", response.data);
    } catch (error) {
      console.error("Error saving memory:", error);
    }
  };

  return (
    <div>
      <h1>Add a Memory</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your memory..."
        ></textarea>
        <input
          type="file"
          onChange={(e) => setAudio(e.target.files[0])}
          accept="audio/*"
        />
        <button type="submit">Save Memory</button>
      </form>
    </div>
  );
};

export default AddMemory;
