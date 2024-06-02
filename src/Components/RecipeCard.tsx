import { Recipe } from "../types/Recipes";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  console.log(recipe);
  return (
    <div>
      <h1>Recipe: {recipe.author}</h1>
      <p>{recipe.author}</p>
    </div>
  );
};

export default RecipeCard;
