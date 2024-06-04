import { useEffect, useState } from "preact/hooks";
import { Recipe } from "./types/Recipes";
import RecipeCardContainer from "./Components/RecipeCardContainer";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import { HashRouter, Route, Routes } from "react-router-dom";
import BrowseRecipes from "./Components/BrowseRecipes";
import Home from "./Components/Home";
import SpecificRecipePage from "./Components/SpecificRecipePage";
import AddRecipe from "./Components/AddRecipe";
import TopRatedRecipes from "./Components/TopRatedRecipes";
import PageNotFound from "./Components/PageNotFound";

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
    <HashRouter>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <Header />
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/recipes"
                element={<BrowseRecipes recipes={recipes} />}
              />
              <Route path="/recipe/:id" element={<SpecificRecipePage />} />
              <Route path="/add-recipe" element={<AddRecipe />} />
              <Route path="/recipes/top-rated" element={<TopRatedRecipes />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        )}
      </div>
    </HashRouter>
  );
}
