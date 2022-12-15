import React, { useState, useEffect, useCallback } from "react";
import InfoItem from "../Components/InfoItem";
import { Props } from "../interfaces";
import "./MoviesTvShowsPage.css";
import MainLinks from "../Components/MainLinks";
import { useSelector } from "react-redux";
import { RootState } from "../Store/index";
import Search from "../Components/Search";

const TvShows = () => {
  const [tvShows, setTvShows] = useState<Props[]>();
  const [error, setError] = useState("");

  const searchContent = useSelector((state: RootState) => state.searchTxt);

  const fetchTVShowsHandler = useCallback(async (type: String) => {
    let response;
    try {
      if (type === "") {
        response = await fetch(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US&page=1"
        );
      } else {
        response = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US&query=${type}&page=1&include_adult=false`
        );
      }

      if (response && !response.ok) {
        throw new Error("OOOppssss...Something went wrong :(");
      }

      if (response) {
        const data = await response.json();

        //console.log(data);
        let transformedTvShows;
        if (type === "") {
          transformedTvShows = data.results
            .slice(0, 10)
            .map((tvShow: Props) => {
              return {
                id: tvShow.id,
                name: tvShow.name,
                poster_path: tvShow.poster_path,
                type: "tvshow",
              };
            });
        } else {
          transformedTvShows = data.results.map((tvShow: Props) => {
            return {
              id: tvShow.id,
              name: tvShow.name,
              poster_path: tvShow.poster_path,
              type: "tvshow",
            };
          });
        }

        setTvShows(transformedTvShows);
      }
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      setError(message);
    }
  }, []);

  useEffect(() => {
    if (searchContent.length > 2) {
      const timer = setTimeout(() => {
        console.log("Fired a call t");
        fetchTVShowsHandler(searchContent);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      fetchTVShowsHandler("");
    }
  }, [fetchTVShowsHandler, searchContent]);

  return (
    <React.Fragment>
      <header className="header-style">
        <h1>TVLand</h1>
        <p>One place, thousands of moves and tv shows</p>
      </header>

      <MainLinks />

      <Search />

      <div className="content__display">
        {error === "" && tvShows?.length === 0 && <h2>Found no TV shows.</h2>}
        {error === "" &&
          tvShows?.map((item) => (
            <div className="content__display_child">
              <InfoItem key={item.id} info={item} />
            </div>
          ))}
        {error !== "" && <h2>{error}</h2>}
      </div>
    </React.Fragment>
  );
};

export default TvShows;
