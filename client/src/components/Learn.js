import React, { useState, useEffect } from "react";
import BlackHoleItem from './BlackHoleItem';
import "../Learn.css";

const fetchBlackHoles = async (kind) => {
  try {
    const url = kind ? `/api/blackholes?kind=${kind}` : "/api/blackholes";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch black holes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching black holes:", error);
    return [];
  }
};

function Learn() {
  const [blackHoles, setBlackHoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBlackHoles()
      .then((blackHoles) => setBlackHoles(blackHoles))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchBlackHoles(searchQuery)
        .then((blackHoles) => setBlackHoles(blackHoles))
        .catch((error) => console.error("Error:", error));
    } else {
      fetchBlackHoles()
      .then((blackHoles) => setBlackHoles(blackHoles))
      .catch((error) => console.error("Error", error))
    }
  }, [searchQuery]);

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h1>Cosmic Entities</h1>
      <ul>
        {blackHoles.map((blackHole) => (
          <BlackHoleItem key={blackHole._id} blackHole={blackHole} />
        ))}
      </ul>
    </div>
  );
}

export default Learn;
