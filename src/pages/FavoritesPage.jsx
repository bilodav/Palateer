import { useFavorites } from "../components/context/FavoritesContext";
import Card from "../components/ui/Card";
import { recipesData } from "../data/recipesData";

function FavoritesPage() {
  const { isFavorite } = useFavorites();
  return (
    <section
      style={{ marginLeft: "50px", maxHeight: "100vh", overflow: "auto" }}
    >
      <h1>Favorites</h1>
      {recipesData
        .filter((recipe) => isFavorite(recipe.id))
        .map((recipe) => (
          <Card
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            cookingTime={recipe.cookTime}
            servings={recipe.servings}
            difficulty={recipe.difficulty}
          />
        ))}
    </section>
  );
}

export default FavoritesPage;
