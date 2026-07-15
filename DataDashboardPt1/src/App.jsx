import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import RecipeDetails from "./components/RecipeDetails"
import ChartsPage from "./components/ChartsPage"
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([]);

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

  return (
    <div> 
      <Sidebar />
        <Routes>
          <Route 
            path="/" 
            element={<Dashboard items={items} />}
          />
          <Route 
            path="/recipe/:id" 
            element={<RecipeDetails items={items} />}
          />
          <Route
            path="/charts"
            element={<ChartsPage items={items} />}
          />
        </Routes>
    </div>
  )
}

export default App
