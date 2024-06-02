import { Recipe } from "../types/Recipes";
import RecipeCard from "./RecipeCard";

type RecipeCardContainerProps = {
  recipes: Recipe[];
};

const RecipeCardContainer = ({ recipes }: RecipeCardContainerProps) => {
  return (
    <div>
      <h1>Recipe Card Container</h1>
      <ul>
        {recipes.map((recipe) => {
          console.log(recipe.author);
          <li>
            <p>{recipe.author}</p>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default RecipeCardContainer;
