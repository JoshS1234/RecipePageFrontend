import React, { useEffect, useState } from "react";
import { Recipe } from "../types/Recipes";
import RecipeCard from "./RecipeCard";

type TopRatedProps = {
  recipes: Recipe[];
};

const TopRatedRecipes = ({ recipes }: TopRatedProps) => {
  // const [topRecipe, setTopRecipe] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let topRecipe;

  let maxUpvotes = -Infinity;
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].upvotes >= maxUpvotes) {
      topRecipe = recipes[i];
      maxUpvotes = recipes[i].upvotes;
    }
  }

  return topRecipe ? <RecipeCard recipe={topRecipe} /> : <p>loading</p>;
};

export default TopRatedRecipes;
