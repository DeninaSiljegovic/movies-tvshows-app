import "./InfoItem.css";
import React from "react";
import { Props } from "../interfaces";
import { NavLink, Route } from "react-router-dom";

const InfoItem: React.FC<{ info: Props }> = ({ info }) => {
  let imgSrc = "https://image.tmdb.org/t/p/w200" + info.poster_path;

  return (
    <div className="card">
      <img src={imgSrc}></img>

      <nav className="well sb">
        <NavLink to={`/details/${info.type}/${info.id}`}>
          <h2>{info.name}</h2>
        </NavLink>
      </nav>
    </div>
  );
};

export default InfoItem;
