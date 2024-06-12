import React, { unstable_LowPriority, useEffect, useState } from "react";
import "./AddRecipe.scss";
import { Ingredient } from "../types/Recipes";

const AddRecipe = () => {
  useEffect(() => {});

  const [hasError, setHasError] = useState<boolean>(false);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: "" },
  ]);

  const [recipeSteps, setRecipeSteps] = useState<string[]>([""]);

  const handleRemoveIngredients = (e: MouseEvent) => {
    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];
    console.log(ingredients);

    if (ingredients.length > 1) {
      const removedIngredientArr = ingredients
        .slice(0, index)
        .concat(ingredients.slice(index + 1));
      setIngredients(removedIngredientArr);
    } else {
      alert("Need at least 1 ingredient");
    }
  };

  const handleRenameIngredients = (e: Event) => {
    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];

    console.log(ingredients);

    let ingredientsCopy = [...ingredients];
    ingredientsCopy[index].name = e.target.value;
    setIngredients(ingredientsCopy);
    console.log(ingredients);
  };

  const handleChangeIngredientAmount = (e) => {
    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];

    console.log(ingredients);

    let ingredientsCopy = [...ingredients];
    ingredientsCopy[index].amount = e.target.value;
    setIngredients(ingredientsCopy);
    console.log(ingredients);
  };
  const handleAddIngredients = (e) => {
    console.log(e.target);

    if (ingredients.length < 12) {
      setIngredients([...ingredients, { name: "", amount: "" }]);
    } else {
      alert("Cannot have more than 12 ingredients");
    }
  };

  const handleChangeRecipeStep = (e: Event) => {
    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];

    let recipeStepCopy = [...recipeSteps];
    recipeStepCopy[index] = e.target.value;
    setRecipeSteps(recipeStepCopy);
    console.log(recipeSteps);
  };

  const handleRemoveRecipeSteps = (e: Event) => {
    let target = e.target as EventTarget;
    let id = target.id;
    let index = id.match(/\d+$/)[0];
    console.log(index);

    if (recipeSteps.length > 1) {
      const removedRecipeStepsArr = recipeSteps.filter((element, i) => {
        console.log(
          "index pressed: ",
          index,
          " this index: ",
          i,
          " same: ",
          i != index
        );

        return i != index;
      });

      console.log(removedRecipeStepsArr);

      setRecipeSteps(removedRecipeStepsArr);
    } else {
      alert("Need at least 1 recipe step");
    }
  };

  const handleAddRecipeSteps = () => {
    if (recipeSteps.length < 12) {
      setRecipeSteps([...recipeSteps, ""]);
    } else {
      alert("Can't have more than 12 steps");
    }
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setHasError(false);
    const ingredientCount = ingredients.length;
    const recipeStepCount = recipeSteps.length;

    const target = e.target;

    //checks for null
    const recipeTitle = target[0].value;
    const recipeAuthor = target[1].value;
    const recipeImage_url = target[2].value;
    if (!recipeTitle || !recipeAuthor || !recipeImage_url) {
      console.log("primitive issue");
      setHasError(true);
    }
    console.log(hasError);

    const recipeIngredients = [];
    for (let i = 0; i < ingredientCount; i++) {
      // if (target[3 + 4 * i].value != "" && target[3 + 4 * i + 1].value != "") {
      //   console.log(target[3 + 4 * i].value);
      //   console.log(target[3 + 4 * i + 1].value);

      //   const ingredient = {
      //     name: target[3 + 4 * i].value,
      //     amount: target[3 + 4 * i + 1].value,
      //   };
      //   recipeIngredients.push(ingredient);
      //   console.log(recipeIngredients);
      // } else {
      //   console.log("Cannot leave ingredients blank");
      //   setHasError(true);
      // }
      if (ingredients[i].name == "" || ingredients[i].amount == "") {
        console.log("Cannot leave any ingredient parts blank");

        setHasError(true);
      }
    }
    // setIngredients(recipeIngredients);
    console.log(hasError);

    for (let i = 0; i < recipeStepCount; i++) {
      // if (target[3 + 4 * ingredientCount + 3 * i].value != "") {
      //   recipeRecipe_steps.push(target[3 + 4 * ingredientCount + 3 * i].value);
      // } else {
      //   console.log("Recipe steps cannot be blank");
      //   setHasError(true);
      // }
      if (recipeSteps[i] == "") {
        console.log("Recipe steps cannot be blank");
        setHasError(true);
      }
    }
    // setRecipeSteps(recipeRecipe_steps);
    console.log(hasError);

    const date = new Date();
    const current_date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const newRecipe = {
      title: recipeTitle,
      author: recipeAuthor,
      image_url: recipeImage_url,
      date_created: current_date,
      ingredients: ingredients,
      recipe_steps: recipeSteps,
    };

    console.log(hasError);

    if (hasError) {
      console.log(newRecipe);

      alert("there are blank fields");
    } else {
      console.log(JSON.stringify(newRecipe));
      fetch(`http://localhost:8080/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });
    }
  };

  return (
    <div className="add-recipe-page">
      <h1>Add recipe</h1>
      <form className="add-recipe-page__form" onSubmit={handleSubmit}>
        <div className="add-recipe-page__simple-input">
          <label>Recipe name</label>
          <input type="text"></input>
        </div>

        <div className="add-recipe-page__simple-input">
          <label>Author</label>
          <input type="text"></input>
        </div>

        <div className="add-recipe-page__simple-input">
          <label>Image url</label>
          <input type="text"></input>
        </div>

        {ingredients.map((ingredient, index) => {
          return (
            <div className="add-recipe-page__ingredient-container">
              <label>Ingredient {index + 1}</label>
              <input
                type="text"
                onChange={handleRenameIngredients}
                id={`ing-textbox-${index}`}
              ></input>

              <label>Amount</label>
              <input
                type="text"
                onChange={handleChangeIngredientAmount}
                id={`ing-amount-textbox-${index}`}
              ></input>

              <button onClick={handleAddIngredients} type="button">
                Add ingredients
              </button>
              <button
                onClick={handleRemoveIngredients}
                type="button"
                id={`remove-ing-button-${index}`}
              >
                remove
              </button>
            </div>
          );
        })}

        {recipeSteps.map((recipeStep, index) => {
          return (
            <div className="add-recipe-page__recipe-step-container">
              <label>Recipe step {index + 1}</label>
              <input
                type="text"
                onChange={handleChangeRecipeStep}
                id={`rec-textbox-${index}`}
              ></input>

              <div>
                <button onClick={handleAddRecipeSteps} type="button">
                  Add recipe steps
                </button>
                <button
                  onClick={handleRemoveRecipeSteps}
                  type="button"
                  id={`remove-rec-button-${index}`}
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}

        {hasError ? <p>You need to fill out all inputs</p> : <></>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddRecipe;
