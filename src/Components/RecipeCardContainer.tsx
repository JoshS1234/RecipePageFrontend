import { Recipe } from "../types/Recipes";
import RecipeCard from "./RecipeCard";
import "./RecipeCardContainer.scss";

type RecipeCardContainerProps = {
  recipes: Recipe[];
};

const RecipeCardContainer = ({ recipes }: RecipeCardContainerProps) => {
  return (
    <div className="recipe-card-container">
      {recipes.map((recipe) => {
        return <RecipeCard recipe={recipe} />;
      })}
    </div>
  );
};

export default RecipeCardContainer;
