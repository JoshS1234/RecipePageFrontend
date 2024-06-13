import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

type NavBarProps = { handleDatabaseUpdate: () => void };

const NavBar = ({ handleDatabaseUpdate }: NavBarProps) => {
  return (
    <div className="navbar">
      <Link to="/" onClick={handleDatabaseUpdate} className="navbar__link">
        Home
      </Link>
      <Link
        to="/add-recipe"
        onClick={handleDatabaseUpdate}
        className="navbar__link"
      >
        Add recipe
      </Link>
      <Link
        to="/recipes/top-rated"
        onClick={handleDatabaseUpdate}
        className="navbar__link"
      >
        Top rated
      </Link>
    </div>
  );
};

export default NavBar;
