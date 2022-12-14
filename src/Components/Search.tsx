import { useState } from "react";
import "./Search.css";

const Search: React.FC<{ info: String }> = ({ info }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

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
      </div>
    </div>
  );
};

export default Search;
