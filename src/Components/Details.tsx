import React, { useState, useEffect, useCallback } from "react";
import { basicData, videoProps } from "../interfaces";
import placeholderImg from "../Assets/no-poster.jpg";
import "./Details.css";

const Details: React.FC<{ info: basicData }> = ({ info }) => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [trailer, setTrailer] = useState(false);
  const [error, setError] = useState("");

  const fetchDataHandler = useCallback(async () => {
    try {
      let response;
      let videoResponse;
      if (info.type === "movie") {
        response = await fetch(
          `https://api.themoviedb.org/3/movie/${info.itemId}?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US`
        );

        videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${info.itemId}/videos?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US`
        );
      } else if (info.type === "tvshow") {
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${info.itemId}?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US`
        );

        videoResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${info.itemId}/videos?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US`
        );
      }

      if (response && !response.ok) {
        throw new Error("OOOppssss...Something went wrong :(");
      }

      if (response) {
        const data = await response.json();

        if (info.type === "tvshow") setTitle(data.name);
        else setTitle(data.title);
        setOverview(data.overview);
        setImgSrc(data.poster_path);

        if (videoResponse) {
          const video = await videoResponse.json();

          let res = video.results.find((x: videoProps) => {
            if (x.type === "Trailer" && x.official && x.site === "YouTube") {
              return x;
            }
          });

          if (res.official === true) {
            setTrailer(true);
            setVideoSrc("https://www.youtube.com/embed/" + res.key);
          }
        }
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
      {!trailer && imgSrc !== null && (
        <img src={"https://image.tmdb.org/t/p/w400" + imgSrc}></img>
      )}
      {!trailer && imgSrc === null && (
        <img className="placeholderImgD" src={placeholderImg}></img>
      )}
      {trailer && (
        <iframe
          width="920"
          height="550"
          src={videoSrc}
          title="YouTube video player"
        ></iframe>
      )}
      <h2>{title}</h2>
      {overview.length !== 0 && <p>{overview}</p>}
      {overview.length === 0 && <p>Overview is not avaliable.</p>}
    </div>
  );
};

export default Details;
