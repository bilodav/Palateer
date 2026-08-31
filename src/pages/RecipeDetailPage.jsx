import { useParams } from "react-router-dom";
import { recipesData } from "../data/recipesData";
import RecipeDetail from "../components/recipe/RecipeDetail";

function RecipeDetailPage() {
  const { id } = useParams();
  const recipe = recipesData.find((r) => r.id === Number(id));
  return (
    <section
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <RecipeDetail recipe={recipe} />
    </section>
  );
}

export default RecipeDetailPage;
