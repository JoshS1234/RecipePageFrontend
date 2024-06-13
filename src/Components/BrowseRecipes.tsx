import RecipeCardContainer from "./RecipeCardContainer";
import { Recipe } from "../types/Recipes";
import "./BrowseRecipes.scss";

type RecipeCardContainerProps = {
  recipes: Recipe[];
};

const BrowseRecipes = ({ recipes }: RecipeCardContainerProps) => {
  return (
    <div className="browse-recipes-page">
      <h2>Add filtering here</h2>
      <RecipeCardContainer recipes={recipes} />
    </div>
  );
};

export default BrowseRecipes;
