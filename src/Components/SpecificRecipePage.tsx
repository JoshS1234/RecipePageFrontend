import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Ingredient, Recipe } from "../types/Recipes";
import "./SpecificRecipePage.scss";

type SpecificRecipePageProps = {
  handleDatabaseUpdate: () => void;
};

const SpecificRecipePage = ({
  handleDatabaseUpdate,
}: SpecificRecipePageProps) => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<Recipe>();
  // const [hasError, setHasError] = useState<boolean>(false);
  const [hasCompletedForm, setHasCompletedForm] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeSteps, setRecipeSteps] = useState<string[]>([]);

  const [recipeTitle, setRecipeTitle] = useState<string>();
  const [recipeAuthor, setRecipeAuthor] = useState<string>();
  const [recipeImageUrl, setRecipeImageUrl] = useState<string>();

  const updateTitle = (e) => {
    setHasCompletedForm(false);
    setRecipeTitle(e.target.value);
  };

  const updateAuthor = (e) => {
    setHasCompletedForm(false);
    setRecipeAuthor(e.target.value);
  };
  const updateImage = (e) => {
    setHasCompletedForm(false);
    setRecipeImageUrl(e.target.value);
  };

  const cancelFormSubmissionMessage = () => {
    setHasCompletedForm(false);
  };

  const resetVariables = () => {
    setIngredients([{ name: "", amount: "" }]);
    setRecipeSteps([""]);
  };

  const handleRemoveIngredients = (e: MouseEvent) => {
    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];

    if (ingredients.length > 1) {
      const removedIngredientArr = ingredients.filter((element, i) => {
        return i != index;
      });
      setIngredients(removedIngredientArr);
    } else {
      alert("Need at least 1 ingredient");
    }
  };

  const handleRenameIngredients = (e: Event) => {
    cancelFormSubmissionMessage();
    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];

    let ingredientsCopy = [...ingredients];
    ingredientsCopy[index].name = e.target.value;
    setIngredients(ingredientsCopy);
  };

  const handleChangeIngredientAmount = (e) => {
    cancelFormSubmissionMessage();

    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];

    let ingredientsCopy = [...ingredients];
    ingredientsCopy[index].amount = e.target.value;
    setIngredients(ingredientsCopy);
  };
  const handleAddIngredients = (e) => {
    if (ingredients.length < 12) {
      setIngredients([...ingredients, { name: "", amount: "" }]);
    } else {
      alert("Cannot have more than 12 ingredients");
    }
  };

  const handleChangeRecipeStep = (e: Event) => {
    cancelFormSubmissionMessage();

    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];

    let recipeStepCopy = [...recipeSteps];
    recipeStepCopy[index] = e.target.value;
    setRecipeSteps(recipeStepCopy);
  };

  const handleRemoveRecipeSteps = (e: Event) => {
    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];

    if (recipeSteps.length > 1) {
      const removedRecipeStepsArr = recipeSteps.filter((element, i) => {
        return i != index;
      });

      setRecipeSteps(removedRecipeStepsArr);
    } else {
      alert("Need at least 1 recipe step");
    }
  };

  const handleAddRecipeSteps = () => {
    cancelFormSubmissionMessage();

    if (recipeSteps.length < 12) {
      setRecipeSteps([...recipeSteps, ""]);
    } else {
      alert("Can't have more than 12 steps");
    }
  };

  const handleDelete = () => {
    fetch(`http://localhost:8080/recipes/${id}`, { method: "DELETE" }).then(
      (data) => {
        alert("recipe has been deleted");
        console.log(data);
        handleDatabaseUpdate();
      }
    );
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    let hasError = false;
    setHasCompletedForm(false);
    const ingredientCount = ingredients.length;
    const recipeStepCount = recipeSteps.length;

    const target = e.target;

    //checks for null
    if (!recipeTitle || !recipeAuthor || !recipeImageUrl) {
      hasError = true;
    }

    for (let i = 0; i < ingredientCount; i++) {
      if (ingredients[i].name == "" || ingredients[i].amount == "") {
        hasError = true;
      }
    }

    for (let i = 0; i < recipeStepCount; i++) {
      if (recipeSteps[i] == "") {
        hasError = true;
      }
    }

    const date = new Date();
    const current_date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const newRecipe = {
      title: recipeTitle,
      author: recipeAuthor,
      image_url: recipeImageUrl,
      date_created: current_date,
      ingredients: ingredients,
      recipe_steps: recipeSteps,
    };

    if (hasError) {
      alert("there are blank fields");
    } else {
      fetch(`http://localhost:8080/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      setHasCompletedForm(true);
    }
  };

  const getRecipeData = async () => {
    let formattedResponse;
    const response = await fetch(`http://localhost:8080/recipes/${id}`);
    if (response.ok) {
      formattedResponse = await response.json();
    } else {
      throw new Error("API request failed");
    }
    return formattedResponse;
  };

  useEffect(() => {
    getRecipeData().then((data) => {
      setRecipe(data);
      setIngredients(data.ingredients);
      setRecipeSteps(data.recipe_steps);
      setRecipeTitle(data.title);
      setRecipeAuthor(data.author);
      setRecipeImageUrl(data.image_url);
    });
  }, []);

  return (
    <div className="add-recipe-page">
      <h1>Edit recipe</h1>
      <form className="add-recipe-page__form" onSubmit={handleSubmit}>
        <h3>Introduction</h3>
        <div className="add-recipe-page__simple-input">
          <label>Recipe name</label>
          <input type="text" onChange={updateTitle} value={recipeTitle}></input>
        </div>

        <div className="add-recipe-page__simple-input">
          <label>Author</label>
          <input
            type="text"
            onChange={updateAuthor}
            value={recipeAuthor}
          ></input>
        </div>

        <div className="add-recipe-page__simple-input">
          <label>Image url</label>
          <input
            type="text"
            onChange={updateImage}
            value={recipeImageUrl}
          ></input>
        </div>

        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => {
          return (
            <div className="add-recipe-page__ingredient-container">
              <div className="add-recipe-page__ing-input">
                <label>Ingredient {index + 1}</label>
                <input
                  type="text"
                  onChange={handleRenameIngredients}
                  id={`ing-textbox-${index}`}
                  value={ingredient.name}
                ></input>
              </div>

              <div className="add-recipe-page__ing-input">
                <label>Amount</label>
                <input
                  type="text"
                  onChange={handleChangeIngredientAmount}
                  id={`ing-amount-textbox-${index}`}
                  value={ingredient.amount}
                ></input>
              </div>

              <button
                onClick={handleRemoveIngredients}
                type="button"
                id={`remove-ing-button-${index}`}
              >
                🗑
              </button>
            </div>
          );
        })}
        <button onClick={handleAddIngredients} type="button">
          Add ingredients
        </button>

        <h3>Recipe</h3>
        {recipeSteps.map((recipeStep, index) => {
          return (
            <div className="add-recipe-page__recipe-container">
              <div className="add-recipe-page__recipe-input">
                <label>Recipe step {index + 1}</label>
                <input
                  type="text"
                  onChange={handleChangeRecipeStep}
                  id={`rec-textbox-${index}`}
                  value={recipeStep}
                ></input>
              </div>

              <button
                onClick={handleRemoveRecipeSteps}
                type="button"
                id={`remove-rec-button-${index}`}
              >
                🗑
              </button>
            </div>
          );
        })}
        <button onClick={handleAddRecipeSteps} type="button">
          Add recipe steps
        </button>

        {/* {hasError ? <p>You need to fill out all inputs</p> : <></>} */}
        {hasCompletedForm ? <p>Recipe has been updated</p> : <></>}

        <div className="form-end-button-container">
          <button type="button" onClick={handleDelete}>
            <Link to="/">Delete 🗑</Link>
          </button>

          <button type="button">
            <Link to="/">Cancel ✗</Link>
          </button>
          <button type="submit">Update ✔</button>
        </div>
      </form>
    </div>
  );
};

export default SpecificRecipePage;
