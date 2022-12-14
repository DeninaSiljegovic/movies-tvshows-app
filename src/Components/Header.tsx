import classes from "./Header.module.css";
import { Fragment } from "react";
import movieStrips from "../Assets/fg.jpg";

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>TVLand</h1>
    </header>
  );
};

export default Header;
