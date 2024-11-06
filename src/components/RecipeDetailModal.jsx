import React, { useEffect, useState } from "react";

const RecipeDetailModal = ({ recipeId, close }) => {
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      setRecipeDetails(data.meals[0]);
    };
    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipeDetails) return null;

  return (
    <div className="modal">
      <button onClick={close}>Close</button>
      <h2>{recipeDetails.strMeal}</h2>
      <img src={recipeDetails.strMealThumb} alt={recipeDetails.strMeal} />
      <p>{recipeDetails.strInstructions}</p>
      <ul>
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipeDetails[`strIngredient${i + 1}`];
          const measure = recipeDetails[`strMeasure${i + 1}`];
          return ingredient ? <li key={i}>{`${ingredient} - ${measure}`}</li> : null;
        })}
      </ul>
    </div>
  );
};

export default RecipeDetailModal;
