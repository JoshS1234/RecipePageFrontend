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
      <div className="recipe-card__navigation-container">
        <button className="recipe-card__navigation-container-button">
          <Link to={`/recipe/${recipeToDisplay.id}`}>Edit</Link>
        </button>
        <button
          onClick={handleFlipRecipeCard}
          className="recipe-card__navigation-container-button"
        >
          Full recipe
        </button>
      </div>
      <h3>
        {recipeToDisplay.title} - {recipeToDisplay.author}
      </h3>
      <img src={recipeToDisplay.image_url} className="recipe-card__image" />
      <div className="recipe-card__ratings-container">
        <button
          onClick={handleUpvote}
          className="recipe-card__ratings-container-button"
        >
          <p>▲</p>
          <p>{recipeToDisplay.upvotes}</p>
        </button>
        <button
          onClick={handleDownvote}
          className="recipe-card__ratings-container-button"
        >
          <p>▼</p>
          <p>{recipeToDisplay.downvotes}</p>
        </button>
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
