import React, { useState, useEffect } from "react";
import "../Learn.css";

const fetchBlackHoles = async (kind) => {
  try {
    const url = kind ? `/api/blackholes?kind=${kind}` : "/api/blackholes";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch black holes");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching black holes:", error);
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
    }
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h1>Cosmic Entities</h1>
      <ul>
        {blackHoles.map((blackHole) => (
          <li key={blackHole._id}>
            <h2>{blackHole.name[0]}</h2>
            <h3>{blackHole.kind}</h3>
            <p>List: {blackHole.list}</p>
            <img src={blackHole.image} alt={blackHole.kind} />
            <p>Constellation: {blackHole.constellation}</p>
            <p>Discovery Year: {blackHole.discovery.year}</p>
            <p>Discovery Location: {blackHole.discovery.location}</p>
            <p>Discoverer: {blackHole.discovery.discoverer}</p>
            <p>Redshift: {blackHole.redshift}</p>
            <button>
              <a href={blackHole.map}>InterStellar location</a>
            </button>
            <button>
              <a href={blackHole.wikipedia}>More information</a>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Learn;
