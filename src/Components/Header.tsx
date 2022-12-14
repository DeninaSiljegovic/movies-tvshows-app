import classes from "./Header.module.css";
import { Fragment } from "react";
import movieStrips from "../Assets/fg.jpg";

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>TVLand</h1>
      </header>
      <div className={classes["main-image"]}>
        {/* <img src={movieStrips} alt="Movie strip"></img> */}
      </div>
    </Fragment>
  );
};

export default Header;
