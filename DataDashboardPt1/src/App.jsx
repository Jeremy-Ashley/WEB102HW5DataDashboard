import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([]);
  const [search,setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const totalItems = items.length;
  const averagePrice = items.reduce((sum, item) => sum + item.pricePerServing, 0) / items.length / 100;
  const vegetarianMeals = items.filter((item) => item.vegetarian).length;
  const mostExpensive = Math.max(...items.map((item) => item.pricePerServing));
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect (() => {
    async function fetchData() {
      const API_KEY = "47b034fd105b4f46bd339f0a4c98c0bd";

      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?number=20&addRecipeInformation=true&apiKey=${"47b034fd105b4f46bd339f0a4c98c0bd"}`
      );
      const data = await response.json();
      setItems(data.results);
      console.log(data.results);
    }
    fetchData();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
    .toLowerCase()
    .includes(search.toLowerCase());


  const matchesCategory =
    category === "All" ||
    item.dishTypes?.some(type =>
      type.toLowerCase().includes(category.toLowerCase()));

  const matchesPrice =
    item.pricePerServing <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (

    <div className="recipeApp">
      <h1>Welcome!</h1>
        <div>
          <h2>
            Total Recipes: {totalItems}
          </h2>
          <h2>
            Average Price Per Meal: ${averagePrice.toFixed(2)}
          </h2>
          <h2>
            Most Expensive Meal: ${mostExpensive.toFixed(2)}
          </h2>
          <h2>
            Vegetarian Meals: {vegetarianMeals}
          </h2>
        </div>

        <input 
          type="text" 
          placeholder="Search" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="main course">Main Course</option>
          <option value="drink">Drinks</option>
          <option value="appetizer">Appetizer</option>
          <option value="soup">Soups</option>
        </select>

        <label>
          Max Price (in cents):
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        
        <div className="images">
          {filteredItems.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} />
              <p>Dish Type: {item.dishTypes?.join(", ")}</p>
              <p>Price Per Serving: ${(item.pricePerServing / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>


    </div>
  )
}

export default App
