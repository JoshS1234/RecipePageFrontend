import { Recipe } from "../types/Recipes";
import "./RecipeCard.scss";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  console.log(recipe);
  return (
    <div className="recipe-card">
      <h4>Recipe: {recipe.title}</h4>
      <h5>By {recipe.author}</h5>
      {console.log(recipe.imageUrl)}
      <img src={recipe.imageUrl} />
      <h5>Ingredients</h5>
      <ul>
        {recipe.ingredients.map((ingredient) => {
          return (
            <li>
              {ingredient.name} ({ingredient.amount})
            </li>
          );
        })}
      </ul>
      <h5>Steps</h5>
      <ul>
        {recipe.recipeSteps.map((step) => {
          return <li>{step}</li>;
        })}
      </ul>
      <h6>Rating: {recipe.rating}</h6>
    </div>
  );
};

export default RecipeCard;
