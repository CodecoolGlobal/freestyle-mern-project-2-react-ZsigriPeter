import React from "react";
import "./Learn.css";

function BlackHoleItem({ blackHole }) {
  return (
    <li key={blackHole._id}>
      <h2>{blackHole.name[0]}</h2>
      <h3>{blackHole.kind}</h3>
      <p>List: {blackHole.list}</p>
      <img src={blackHole.image} alt={blackHole.kind} className="imgC" />
        <p className="inputQu">Constellation: {blackHole.constellation}</p>
        <p className="inputQu">Discovery Year: {blackHole.discovery.year}</p>
        <p className="inputQu">Discovery Location: {blackHole.discovery.location}</p>
        <p className="inputQu">Discoverer: {blackHole.discovery.discoverer}</p>
        <p className="inputQu">Redshift: {blackHole.redshift}</p>
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
