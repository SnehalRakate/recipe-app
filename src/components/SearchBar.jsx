import React from "react";

const SearchBar = ({ setIngredient, fetchRecipes }) => {
  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const popularIngredients = ["Chicken", "Beef", "Pasta", "Tomato", "Rice", "Fish", "Cheese"];

  
  

  return (
    <div className="search-bar">
      <select onChange={(e) => setIngredient(e.target.value)}>
    <option value="">Select an ingredient</option>
    {popularIngredients.map((item) => (
      <option key={item} value={item.toLowerCase()}>
        {item}
      </option>
    ))}
  </select>
 
      <button onClick={fetchRecipes}>Search</button>
    </div>
  );
};

export default SearchBar;
