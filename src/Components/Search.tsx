import "./Search.css";
import { searchActions } from "../Store/index";
import { useDispatch } from "react-redux/es/exports";

const Search: React.FC<{ info: String }> = ({ info }) => {
  const dispatch = useDispatch();

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
            onChange={(e) =>
              dispatch(searchActions.changeSearchTxt(e.target.value))
            }
          />
        </label>
      </div>
    </div>
  );
};

export default Search;
