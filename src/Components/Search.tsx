import { useState } from "react";
import "./Search.css";
import { movieProps, Props } from "../interfaces";
import InfoItem from "./InfoItem";

const Search: React.FC<{ info: String }> = ({ info }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Props[]>();
  const [error, setError] = useState("");
  const [search, setSearch] = useState(false);

  console.log(query);
  const fetchDataHandler = async () => {
    try {
      let response;
      if (info === "movie") {
        response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US&query=${query}&page=1&include_adult=false`
        );
      } else if (info === "tvshow") {
        response = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=bb869eb04cc7887f2f1a34f8016e0943&language=en-US&query=${query}&page=1&include_adult=false`
        );
      }

      if (response && !response.ok) {
        throw new Error("OOOppssss...Something went wrong :(");
      }

      if (response) {
        const res = await response.json();
        console.log(res);

        let transformedData;

        if (info === "movie") {
          transformedData = res.results.map((movie: movieProps) => {
            return {
              id: movie.id,
              name: movie.title,
              poster_path: movie.poster_path,
              type: "movie",
            };
          });
        } else if (info === "tvshow") {
          transformedData = res.results.map((tvShow: Props) => {
            return {
              id: tvShow.id,
              name: tvShow.name,
              poster_path: tvShow.poster_path,
              type: "tvshow",
            };
          });
        }

        if (transformedData) {
          setData(transformedData);
          setSearch(true);
          console.log(transformedData);
        }
      }
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      setError(message);
    }
  };

  return (
    <div>
      <div className="search-wrapper">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search for..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button onClick={fetchDataHandler}>Fetch data from search</button>
        {/* {search &&
          data?.map((item) => (
            <div className="content__display_child">
              <InfoItem key={item.id} info={item} />
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default Search;
