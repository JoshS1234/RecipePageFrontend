import { Recipe } from "../types/Recipes";
import RecipeCard from "./RecipeCard";

type RecipeCardContainerProps = {
  recipes: Recipe[];
};

const RecipeCardContainer = ({ recipes }: RecipeCardContainerProps) => {
  return (
    <div>
      {recipes.map((recipe) => {
        console.log(recipe.author);
        return <RecipeCard recipe={recipe} />;
      })}
    </div>
  );
};

export default RecipeCardContainer;
