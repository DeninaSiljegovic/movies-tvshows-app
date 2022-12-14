import { NavLink } from "react-router-dom";
import classes from "./MainLinks.module.css";

const MainLinks = () => {
  return (
    <div className={classes.header}>
      <nav>
        <div className={classes.parent}>
          <div className={classes.child}>
            <NavLink activeClassName={classes.active} to="/movies">
              Movies
            </NavLink>
          </div>

          <div className={classes.child}>
            <NavLink activeClassName={classes.active} to="/tvshows">
              TvShows
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainLinks;
