import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import "./App.css";

const App = () => {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
        setError(null);
      } else {
        setRecipes([]);
        setError("No recipes found. Try using different ingredients.");
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
    }
  };

  

  return (
    <Router>
      <div className="App">
        <h1>Recipe Ideas for Taylor</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar setIngredient={setIngredient} fetchRecipes={fetchRecipes} />
                {error ? <p className="error">{error}</p> : <RecipeList recipes={recipes} />}
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
