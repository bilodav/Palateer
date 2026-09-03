import { useNavigate } from "react-router-dom";
import { useFavorites } from "../components/context/FavoritesContext";
import RecipeCard from "../components/recipe/RecipeCard";
import { recipesData } from "../data/recipesData";
import styles from "./FavoritesPage.module.css";
import SearchBar from "../components/ui/SearchBar";
import { useState } from "react";

function FavoritesPage() {
  const { isFavorite, favoriteIds } = useFavorites();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchByValue, setSearchByValue] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  let favoriteRecipes = recipesData.filter((recipe) => isFavorite(recipe.id));

  let searchRecipes;

  if (searchByValue === "title" || searchByValue === "") {
    searchRecipes = favoriteRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  } else if (searchByValue === "ingredients") {
    searchRecipes = favoriteRecipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }

  const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

  switch (sortBy) {
    case "name-asc":
      searchRecipes = [...searchRecipes].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
      break;
    case "name-desc":
      searchRecipes = [...searchRecipes].sort((a, b) =>
        b.title.localeCompare(a.title),
      );
      break;
    case "time-asc":
      searchRecipes = [...searchRecipes].sort(
        (a, b) => a.cookTime - b.cookTime,
      );
      break;
    case "time-desc":
      searchRecipes = [...searchRecipes].sort(
        (a, b) => b.cookTime - a.cookTime,
      );
      break;
    case "difficulty-asc":
      searchRecipes = [...searchRecipes].sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
      );
      break;
    case "difficulty-desc":
      searchRecipes = [...searchRecipes].sort(
        (a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty],
      );
      break;
  }

  return (
    <section className={styles["fav-page"]}>
      <div className={styles["header-search"]}>
        <div className={styles["intro-group"]}>
          <h1>My Favorites</h1>
          <div className={styles["counter-container"]}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="rgb(1, 1, 1)"
                  d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                />
              </svg>
            </span>
            <span className={styles["span-text"]}>
              {favoriteIds.size}{" "}
              {favoriteIds.size === 1 ? "recipe " : "recipes "}
              saved
            </span>
          </div>
        </div>
        <div className={styles["utility-group"]}>
          <SearchBar
            searchBy={searchByValue}
            onSearchBy={setSearchByValue}
            onSearchChange={setSearchValue}
            searchValue={searchValue}
            onSortChange={setSortBy}
            sortValue={sortBy}
          />
        </div>
      </div>
      <div className={styles["fav-display"]}>
        {searchRecipes && (
          <>
            {(searchByValue || searchValue) && (
              <p>Found {searchRecipes.length} Results</p>
            )}
            <div className={styles["fav-list"]}>
              {searchRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  cookingTime={recipe.cookTime}
                  servings={recipe.servings}
                  difficulty={recipe.difficulty}
                  onNavigate={() => navigate(`/recipes/${recipe.id}`)}
                />
              ))}
            </div>
          </>
        )}
        {favoriteRecipes.length > 0 && searchRecipes.length === 0 && (
          <p>There is none that matches your search</p>
        )}
        {favoriteRecipes.length === 0 && (
          <p>You have not yet picked any favorites</p>
        )}
      </div>
    </section>
  );
}

export default FavoritesPage;
