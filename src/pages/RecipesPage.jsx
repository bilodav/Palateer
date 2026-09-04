import { recipesData } from "../data/recipesData";
import styles from "./RecipesPage.module.css";
import SearchBar from "../components/ui/SearchBar";
import RecipeList from "../components/recipe/RecipeList";
import FilterBar from "../components/ui/FilterBar";

function RecipesPage() {
  return (
    <section className={styles["rec-page"]}>
      <div className={styles["rec-banner"]}>
        <h1>Recipes</h1>
        <p>
          Explore the full recipe collection, from everyday meals to special
          occasion feasts, not forgetting those simple snacks
        </p>
      </div>
      <div>
        <div>
          <SearchBar />
        </div>
        <RecipeList list={recipesData} />
      </div>
    </section>
  );
}

export default RecipesPage;
