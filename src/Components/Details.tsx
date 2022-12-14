import React, { useState, useEffect, useCallback } from "react";
import { basicData } from "../interfaces";
import "./Details.css";

const Details: React.FC<{ info: basicData }> = ({ info }) => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [error, setError] = useState("");

  // let imgSrc = "https://image.tmdb.org/t/p/w200";

  const fetchDataHandler = useCallback(async () => {
    try {
      let response;
      if (info.type === "movie") {
        response = await fetch(
          `https://api.themoviedb.org/3/movie/${info.itemId}?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US`
        );
      } else if (info.type === "tvshow") {
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${info.itemId}?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US`
        );
      }

      if (response && !response.ok) {
        throw new Error("OOOppssss...Something went wrong :(");
      }

      if (response) {
        const data = await response.json();

        setTitle(data.name);
        setOverview(data.overview);
        setImgSrc("https://image.tmdb.org/t/p/w400" + data.poster_path);
      }
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      setError(message);
    }
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <div className="parent_card">
      <img src={imgSrc}></img>
      <h2>{title}</h2>
      <p>{overview}</p>
    </div>
  );
};

export default Details;
