import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/recipe/1">Recipe1</Link>
      <Link to="/add-recipe">Add a new recipe</Link>
      <Link to="/recipes/top-rated">Top rated</Link>
      <Link to="/blahblah">Error page</Link>
    </div>
  );
};

export default NavBar;
