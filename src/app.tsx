import { useEffect, useState } from "preact/hooks";
import { Recipe } from "./types/Recipes";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import { HashRouter, Route, Routes } from "react-router-dom";
import BrowseRecipes from "./Components/BrowseRecipes";
import SpecificRecipePage from "./Components/SpecificRecipePage";
import AddRecipe from "./Components/AddRecipe";
import TopRatedRecipes from "./Components/TopRatedRecipes";
import PageNotFound from "./Components/PageNotFound";
import "./app.scss";

export function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasUpdatedDB, setHasUpdatedDB] = useState<boolean>(false);

  const handleDatabaseUpdate = () => {
    setHasUpdatedDB(!hasUpdatedDB);
  };

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
  }, [hasUpdatedDB]);

  return (
    <HashRouter>
      <div className="app">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <Header />
            <NavBar handleDatabaseUpdate={handleDatabaseUpdate} />
            <Routes>
              <Route
                path="/"
                element={
                  <BrowseRecipes
                    recipes={recipes}
                    handleDatabaseUpdate={handleDatabaseUpdate}
                  />
                }
              />
              <Route
                path="/recipe/:id"
                element={
                  <SpecificRecipePage
                    handleDatabaseUpdate={handleDatabaseUpdate}
                  />
                }
              />
              <Route
                path="/add-recipe"
                element={
                  <AddRecipe handleDatabaseUpdate={handleDatabaseUpdate} />
                }
              />
              <Route
                path="/recipes/top-rated"
                element={<TopRatedRecipes recipes={recipes} />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        )}
      </div>
    </HashRouter>
  );
}
