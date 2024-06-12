import React from "react";
import { Link } from "react-router-dom";

type NavBarProps = { handleDatabaseUpdate: () => void };

const NavBar = ({ handleDatabaseUpdate }: NavBarProps) => {
  return (
    <div>
      <Link to="/" onClick={handleDatabaseUpdate}>
        Home
      </Link>
      <Link to="/add-recipe">Add a new recipe</Link>
      <Link to="/recipes/top-rated">Top rated</Link>
    </div>
  );
};

export default NavBar;
