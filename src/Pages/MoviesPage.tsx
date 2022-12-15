import React, { useState, useEffect, useCallback } from "react";
import InfoItem from "../Components/InfoItem";
import { movieProps, Props } from "../interfaces";
import "./MoviesTvShowsPage.css";
import MainLinks from "../Components/MainLinks";
import Search from "../Components/Search";
import { useSelector } from "react-redux";
import { RootState } from "../Store/index";

const Movies = () => {
  const [movies, setMovies] = useState<Props[]>();
  const [error, setError] = useState("");

  const searchContent = useSelector((state: RootState) => state.searchTxt);

  const fetchMoviesHandler = useCallback(async (type: String) => {
    console.log("fun start: ", type);

    try {
      let response;
      if (type === "") {
        response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US&page=1"
        );
      } else {
        response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US&query=${type}&page=1&include_adult=false`
        );
      }

      if (response && !response.ok) {
        throw new Error("OOOppssss...Something went wrong :(");
      }

      if (response) {
        const data = await response.json();

        //console.log(data);
        let transformedMovies;
        if (type === "") {
          transformedMovies = data.results
            .slice(0, 10)
            .map((movie: movieProps) => {
              return {
                id: movie.id,
                name: movie.title,
                poster_path: movie.poster_path,
                type: "movie",
              };
            });
        } else {
          transformedMovies = data.results.map((movie: movieProps) => {
            return {
              id: movie.id,
              name: movie.title,
              poster_path: movie.poster_path,
              type: "movie",
            };
          });
        }

        //console.log(transformedMovies);

        setMovies(transformedMovies);
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
        console.log("Fired a call m");
        fetchMoviesHandler(searchContent);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      fetchMoviesHandler("");
    }
  }, [fetchMoviesHandler, searchContent]);

  return (
    <React.Fragment>
      <header className="header-style">
        <h1>TVLand</h1>
        <p>One place, thousands of moves and tv shows</p>
      </header>

      <MainLinks />

      <Search />

      <div className="content__display">
        {error === "" && movies?.length === 0 && <h2>Found no movies.</h2>}
        {error === "" &&
          movies?.map((item) => (
            <div className="content__display_child">
              <InfoItem key={item.id} info={item} />
            </div>
          ))}
        {error !== "" && <h2>{error}</h2>}
      </div>
    </React.Fragment>
  );
};
export default Movies;
