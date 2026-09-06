import { useParams, useNavigate } from "react-router-dom";
import { recipesData } from "../data/recipesData";
import RecipeDetail from "../components/recipe/RecipeDetail";
import Button from "../components/ui/Button";

function RecipeDetailPage() {
  const { id } = useParams();
  const recipe = recipesData.find((r) => r.id === Number(id));
  const navigate = useNavigate();
  const styles = {
    maxHeight: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
  };

  if (!recipe) {
    return (
      <section
        style={{
          ...styles,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <h2>Recipe Not Found</h2>
        <p>It seems the recipe wandered off our menu</p>
        <p>Go back to the recipes to find more delicious recipes</p>
        <Button text="Back to Recipes" onClick={() => navigate("/recipes")} />
      </section>
    );
  }

  return (
    <section style={styles}>
      <RecipeDetail recipe={recipe} />
    </section>
  );
}

export default RecipeDetailPage;
