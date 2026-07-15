import { useParams } from "react-router-dom"

function RecipeDetails({ items }) {
    const { id } = useParams();

    const recipe = items.find(
    (item) => item.id === Number(id)
    );

    if (!recipe) {
        return <h2> Loading... </h2>
    }

    return (
        <div> 
            <h1> {recipe.title}</h1>

            <img
                src={recipe.image}
                alt={recipe.title}
            />

            <p>
                Ready in: {recipe.readyInMinutes} minutes!
            </p>
            <p>
                Servings: {recipe.servings}!
            </p>

            <p>
                Vegetarian: {recipe.vegetarian ? "Yes" : "No"}
            </p>

            <p 
            dangerouslySetInnerHTML={{ __html: recipe.summary }} 
            />


        </div>
    );
}

export default RecipeDetails;