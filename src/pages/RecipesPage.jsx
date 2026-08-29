import { recipesData } from "../data/recipesData";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/recipe/RecipeCard";
import { getRecipeImage } from "../utils/helpers";

function RecipesPage() {
  const navigate = useNavigate();
  return (
    <section
      style={{ marginLeft: "50px", maxHeight: "100vh", overflow: "auto" }}
    >
      <h1>recipes</h1>
      {recipesData.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={getRecipeImage(recipe.image)}
          cookingTime={recipe.cookTime}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
          onNavigate={() => navigate(`/recipes/${recipe.id}`)}
        />
      ))}
    </section>
  );
}

export default RecipesPage;
