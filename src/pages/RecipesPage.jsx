import { recipesData } from "../data/recipesData";
import Favorite from "../components/ui/Favorite";
import Card from "../components/ui/Card";

function RecipesPage() {
  return (
    <section
      style={{ marginLeft: "50px", maxHeight: "100vh", overflow: "auto" }}
    >
      <h1>recipes</h1>
      {recipesData.map((recipe) => (
        <Card
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={"../src/assets/images/recipes/" + recipe.image}
          cookingTime={recipe.cookTime}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
        />
      ))}
    </section>
  );
}

export default RecipesPage;
