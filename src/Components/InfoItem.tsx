import "./InfoItem.css";
import React from "react";
import { Props } from "../interfaces";
import { NavLink } from "react-router-dom";
import placeholderImg from "../Assets/no-poster.jpg";

const InfoItem: React.FC<{ info: Props }> = ({ info }) => {
  let imgSrc = "https://image.tmdb.org/t/p/w200" + info.poster_path;
  //console.log("poster path: ", !info.poster_path);

  return (
    <div className="card">
      {info.poster_path !== null && <img src={imgSrc}></img>}
      {info.poster_path === null && (
        <img className="placeholderImg" src={placeholderImg}></img>
      )}

      <nav className="well sb">
        <NavLink to={`/details/${info.type}/${info.id}`}>
          <h2>{info.name}</h2>
        </NavLink>
      </nav>
    </div>
  );
};

export default InfoItem;
