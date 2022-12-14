import React, { useState, useEffect, useCallback } from "react";
import InfoItem from "../Components/InfoItem";
import { movieProps, Props } from "../interfaces";
import "../Components/InfoItemsCard.css";
import MainLinks from "../Components/MainLinks";
import Header from "../Components/Header";
import Search from "../Components/Search";
import { useSelector } from "react-redux";

const Movies = () => {
  const [movies, setMovies] = useState<Props[]>();
  const [error, setError] = useState("");

  const fetchMoviesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US&page=1"
      );

      if (!response.ok) {
        throw new Error("OOOppssss...Something went wrong :(");
      }

      const data = await response.json();

      //console.log(data);

      const transformedMovies = data.results
        .slice(0, 10)
        .map((movie: movieProps) => {
          return {
            id: movie.id,
            name: movie.title,
            poster_path: movie.poster_path,
            type: "movie",
          };
        });

      //console.log(transformedMovies);

      setMovies(transformedMovies);
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      setError(message);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <Header />

      <MainLinks />

      <Search info={"movie"} />

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
