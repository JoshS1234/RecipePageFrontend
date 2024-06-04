import RecipeCardContainer from "./RecipeCardContainer";
import { Recipe } from "../types/Recipes";

type RecipeCardContainerProps = {
  recipes: Recipe[];
};

const BrowseRecipes = ({ recipes }: RecipeCardContainerProps) => {
  return (
    <div>
      <h1>Recipe Card Container</h1>
      <h2>Add filtering here</h2>
      <RecipeCardContainer recipes={recipes} />
    </div>
  );
};

export default BrowseRecipes;
