// app/home/page.js
"use client";

import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const Home = () => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    api
      .get("/memories/")
      .then((response) => {
        setMemories(response.data);
      })
      .catch((error) => console.error("Error fetching memories:", error));
  }, []);

  return (
    <div>
      <h1>Your Memories</h1>
      <ul>
        {memories.map((memory) => (
          <li key={memory.id}>
            <h2>{memory.text}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
