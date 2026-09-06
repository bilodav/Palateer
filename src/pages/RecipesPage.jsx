import { recipesData } from "../data/recipesData";
import styles from "./RecipesPage.module.css";
import SearchBar from "../components/ui/SearchBar";
import RecipeList from "../components/recipe/RecipeList";
import FilterBar from "../components/ui/FilterBar";
import { useRecipeFilters } from "../hooks/useRecipeFilters";

function RecipesPage() {
  const { results, isFiltering, searchBar, filterBar } =
    useRecipeFilters(recipesData);
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
          <SearchBar {...searchBar} />
          <FilterBar {...filterBar} />
        </div>
        <div className={styles["rec-display"]}>
          {results && (
            <>
              {isFiltering && results.length > 0 && (
                <p>Found {results.length} Results</p>
              )}
              <RecipeList list={results} />
            </>
          )}
          {recipesData.length > 0 && results.length === 0 && (
            <p>There is none that matches your search</p>
          )}
          {recipesData.length === 0 && (
            <p>You have not yet picked any favorites</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecipesPage;
