import { Link } from "react-router-dom"

function RecipeCard({ item }) {
    return (
        <Link to={`/recipe/${item.id}`}>
            <div className="recipeCard">
                <h3>
                    {item.title}
                </h3>
                <img 
                src={item.image}
                alt={item.title}
                />
                <p>
                    Price: ${(item.pricePerServing / 100).toFixed(2)}
                </p>
                <p>
                    {item.dishTypes?.join(", ")}
                </p>
            </div>
        </Link>
    )
}

export default RecipeCard;