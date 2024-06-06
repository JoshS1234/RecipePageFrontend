import { Link } from "react-router-dom";
import { Recipe } from "../types/Recipes";
import "./RecipeCard.scss";
import { useState } from "preact/hooks";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [isFront, setIsFront] = useState<boolean>(true);
  const [recipeToDisplay, setRecipeToDisplay] = useState<Recipe>(recipe);

  const handleUpvote = async () => {
    const response = await fetch(
      `http://localhost:8080/recipes/upvote/${recipe.id}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    setRecipeToDisplay(data);
  };

  const handleDownvote = async () => {
    const response = await fetch(
      `http://localhost:8080/recipes/downvote/${recipe.id}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    setRecipeToDisplay(data);
  };

  const handleFlipRecipeCard = () => {
    setIsFront(!isFront);
  };

  return isFront ? (
    <div className="recipe-card">
      <div className="recipe-card__navigation-button-container">
        <button>
          <Link to={`/recipe/${recipeToDisplay.id}`}>Edit recipe</Link>
        </button>
        <button onClick={handleFlipRecipeCard}>Full recipe</button>
      </div>
      <h4>{recipeToDisplay.title}</h4>
      <h5>By {recipeToDisplay.author}</h5>
      <img src={recipeToDisplay.image_url} className="recipe-card__image" />
      <div className="recipe-card__ratings-container">
        <div className="recipe-card__button-container">
          <div className="recipe-card__voting-block">
            <p>Upvotes: {recipeToDisplay.upvotes}</p>
            <button onClick={handleUpvote}>Upvote</button>
          </div>
          <div className="recipe-card__voting-block">
            <p>Downvotes: {recipeToDisplay.downvotes}</p>
            <button onClick={handleDownvote}>Downvote</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="recipe-card">
      <div className="recipe-card__navigation-button-container">
        <button>
          <Link to={`/recipe/${recipeToDisplay.id}`}>Edit recipe</Link>
        </button>
        <button onClick={handleFlipRecipeCard}>Summary</button>
      </div>
      <div className="recipe-card__ingredients-container">
        <h5>Ingredients</h5>
        <ul>
          {recipeToDisplay.ingredients.map((ingredient) => {
            return (
              <li>
                {ingredient.name} ({ingredient.amount})
              </li>
            );
          })}
        </ul>
      </div>
      <div className="recipe-card__recipe-container">
        <h5>Recipe steps</h5>
        <ul>
          {recipeToDisplay.recipe_steps.map((step) => {
            return <li>{step}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;
