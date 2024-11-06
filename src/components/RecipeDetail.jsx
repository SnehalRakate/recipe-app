import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        
        if (data.meals) {
          setRecipeDetails(data.meals[0]);
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        setError("Failed to fetch recipe details. Please try again later.");
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!recipeDetails) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipeDetails.strMeal}</h2>
      <img src={recipeDetails.strMealThumb} alt={recipeDetails.strMeal} />
      <h3>Ingredients:</h3>
      <ul>
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipeDetails[`strIngredient${i + 1}`];
          const measure = recipeDetails[`strMeasure${i + 1}`];
          return ingredient ? <li key={i}>{`${ingredient} - ${measure}`}</li> : null;
        })}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipeDetails.strInstructions}</p>
     
    </div>
  );
};

export default RecipeDetail;
