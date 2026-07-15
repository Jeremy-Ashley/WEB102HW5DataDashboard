import { useState } from "react";
import RecipeCard from "./RecipeCard";
import Charts from "./Charts";
function Dashboard ({ items }) {
    const [search,setSearch] = useState("");
    const [category, setCategory] = useState("All");  
    const [maxPrice, setMaxPrice] = useState(1000);

    const totalItems = items.length;

    const averagePrice =
        items.length > 0
        ? items.reduce((sum, item) => sum + item.pricePerServing, 0) /
            items.length /
            100
        : 0;

    const vegetarianMeals = items.filter(
        (item) => item.vegetarian
    ).length;

    const mostExpensive =
        items.length > 0
        ? Math.max(...items.map((item) => item.pricePerServing)) / 100
        : 0;

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

        const matchesCategory =
        category === "All" ||
        item.dishTypes?.some((type) =>
            type.toLowerCase().includes(category.toLowerCase())
        );

        const matchesPrice =
        item.pricePerServing <= maxPrice;

        return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
        );
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
    <div className="filters">

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
            Max Price:
            <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
        </label>
        <Charts items={items} />

    </div>
    <div className="images">
        {filteredItems.map((item) => (
            <RecipeCard 
                key={item.id}
                item={item}
            />
        ))}
    </div>


    </div>
    );

}

export default Dashboard;