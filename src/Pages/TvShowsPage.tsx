import React, { useState, useEffect, useCallback } from "react";
import InfoItem from "../Components/InfoItem";
import { Props } from "../interfaces";
import "../Components/InfoItemsCard.css";
import MainLinks from "../Components/MainLinks";
import Header from "../Components/Header";

const TvShows = () => {
  const [tvShows, setTvShows] = useState<Props[]>();
  const [error, setError] = useState("");

  const fetchTVShowsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US&page=1"
      );

      if (!response.ok) {
        throw new Error("OOOppssss...Something went wrong :(");
      }

      const data = await response.json();

      //console.log(data);

      const transformedTvShows = data.results
        .slice(0, 10)
        .map((tvShow: Props) => {
          return {
            id: tvShow.id,
            name: tvShow.name,
            poster_path: tvShow.poster_path,
            type: "tvshow",
          };
        });

      //console.log(transformedTvShows);

      setTvShows(transformedTvShows);
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      setError(message);
    }
  }, []);

  useEffect(() => {
    fetchTVShowsHandler();
  }, [fetchTVShowsHandler]);

  return (
    <React.Fragment>
      <Header />

      <MainLinks />

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
