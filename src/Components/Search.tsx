import "./Search.css";
import { searchActions } from "../Store/index";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { RootState } from "../Store/index";

const Search = () => {
  const dispatch = useDispatch();
  const searchContent = useSelector((state: RootState) => state.searchTxt);

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
            onChange={(e) => {
              dispatch(searchActions.changeSearchTxt(e.target.value));
            }}
            value={searchContent}
          />
        </label>
      </div>
    </div>
  );
};

export default Search;
