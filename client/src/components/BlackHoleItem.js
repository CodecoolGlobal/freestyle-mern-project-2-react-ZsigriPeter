import React from "react";
import "./Learn.css";

function BlackHoleItem({ blackHole }) {
  return (
    <li key={blackHole._id}>
      <h2>{blackHole.name[0]}</h2>
      <img src={blackHole.image} alt={blackHole.kind} />
      <div className="glassed">
        <h3>{blackHole.kind}</h3>
        <p>List: {blackHole.list}</p>
        <p>Constellation: {blackHole.constellation}</p>
        <p>Discovery Year: {blackHole.discovery.year}</p>
        <p>Discovery Location: {blackHole.discovery.location}</p>
        <p>Discoverer: {blackHole.discovery.discoverer}</p>
        <p>Redshift: {blackHole.redshift}</p>
      </div>
      <button>
        <a href={blackHole.map}>InterStellar location</a>
      </button>
      <button>
        <a href={blackHole.wikipedia}>More information</a>
      </button>
    </li>
  );
}

export default BlackHoleItem;
