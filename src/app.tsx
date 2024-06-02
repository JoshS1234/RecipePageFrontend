import { useEffect, useState } from "preact/hooks";
import { Recipe } from "./types/Recipes";
import RecipeCardContainer from "./Components/RecipeCardContainer";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";

export function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    let totalArr: Recipe[] = [];
    const response = await fetch(`http://localhost:8080/recipes`);
    if (response.ok) {
      const formattedResponse = await response.json();
      totalArr = totalArr.concat(formattedResponse);
    } else {
      throw new Error("API request failed");
    }
    return totalArr;
  };

  useEffect(() => {
    setIsLoading(true);
    getRecipes()
      .then((data) => {
        setRecipes(data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Header />
          <NavBar />
          <RecipeCardContainer recipes={recipes} />
        </div>
      )}
    </div>
  );
}
