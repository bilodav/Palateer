import { useState } from "react";
import {
  filterCategory,
  filterCookTime,
  filterCuisine,
  filterDifficulty,
  searchFilter,
  sortRecipes,
} from "../utils/helpers";

//This function will now own all the search/sort/filter state and runs the pipleline against whatever list passed in. It is used by both my RecipesPage.jsx and FavoritesPage.jsx so the logic is not then duplicated across both

export function useRecipeFilters(list) {
  const [searchValue, setSearchValue] = useState("");
  const [searchByValue, setSearchByValue] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [cuisineValue, setCuisineValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [difficultyValue, setDifficultyValue] = useState("");
  const [cookTimeValue, setCookTimeValue] = useState("");

  let results = searchFilter(searchByValue, searchValue, list);

  results = sortRecipes(sortBy, results);

  results = filterCuisine(cuisineValue, results);

  results = filterCategory(categoryValue, results);

  results = filterDifficulty(difficultyValue, results);

  results = filterCookTime(cookTimeValue, results);

  const isFiltering =
    searchValue ||
    cuisineValue ||
    categoryValue ||
    difficultyValue ||
    cookTimeValue;

  const resetFilters = () => {
    setSearchValue("");
    setSearchByValue("");
    setSortBy("name-asc");
    setCuisineValue("");
    setCategoryValue("");
    setDifficultyValue("");
    setCookTimeValue("");
  };

  // Grouping the values to match SearchBar and filterBars prop shapes so that I can just spread these onto the components when calling
  return {
    results,
    isFiltering,
    resetFilters,
    searchBar: {
      searchBy: searchByValue,
      onSearchBy: setSearchByValue,
      searchValue,
      onSearchChange: setSearchValue,
      sortValue: sortBy,
      onSortChange: setSortBy,
    },
    filterBar: {
      cuisineValue,
      onCuisineChange: setCuisineValue,
      categoryValue,
      onCategoryChange: setCategoryValue,
      difficultyValue,
      onDifficultyChange: setDifficultyValue,
      cookTimeValue,
      onCookTimeChange: setCookTimeValue,
    },
  };
}
