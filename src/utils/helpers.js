/**
 * Loads and parses a value from localStorage.
 *
 * Wrapped in a try/catch because localStorage can fail or return malformed
 * data (e.g. corrupted JSON, storage disabled in the browser, or the value
 * was never set). In any of those cases, the fallback is returned instead
 * of letting the error crash the app.
 *
 * @template T
 * @param {string} key - The localStorage key to read (e.g. "favoriteIds").
 * @param {T} fallback - The value to return if nothing is stored, or if
 *   reading/parsing fails. Should match the shape you expect back
 *   (e.g. [] for an array, {} for an object).
 * @returns {T} The parsed value from storage, or `fallback` if unavailable.
 *
 * @example
 * const favoriteIds = loadFromStorage("favoriteIds", []);
 * // -> [1, 4, 7]  (or [] if nothing was saved yet)
 */
export function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Serializes and saves a value to localStorage under the given key.
 *
 * Wrapped in a try/catch because writing can fail (e.g. storage quota
 * exceeded, storage disabled, or the browser blocking access). On failure,
 * the error is logged rather than thrown, so a storage issue doesn't crash
 * the rest of the app.
 *
 * @param {string} key - The localStorage key to write to (e.g. "mealPlan").
 * @param {*} value - Any JSON-serializable value (array, object, string,
 *   number, boolean). Note: types like `Set` or `Map` are NOT directly
 *   serializable — convert them (e.g. with `[...mySet]`) before calling this.
 * @returns {void}
 *
 * @example
 * saveToStorage("mealPlan", [{ date: "2026-08-27", day: "Thursday", meal: "Pasta" }]);
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save "${key}" to localStorage`, err);
  }
}

/**
 * Capitalizes the first character of a string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} The input string with its first character uppercased,
 *   or an empty string if `str` is not a non-empty string.
 *
 * @example
 * capitalizeString("hello"); // "Hello"
 * capitalizeString("");      // ""
 * capitalizeString(null);    // ""
 */
export function capitalizeString(str) {
  if (typeof str !== "string" || str.length === 0) return;
  return str[0].toUpperCase() + str.slice(1);
}

// DATE HELPERS
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// A helper function that get the start of any week you are currently in
export function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // returns a num
  const diff = (day === 0 ? -6 : 1) - day; //Shifts to monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// A helper function to add day to an initial starting days
export function addDays(date, n) {
  const d = new Date(date); // d is now a new date object that is cloned from date
  d.setDate(d.getDate() + n); // mutating d, not the original date
  return d;
}

//A helper function to see if to dates are the same
export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function rangeFormat(start) {
  const end = addDays(start, 6);
  if (start.getMonth() === end.getMonth()) {
    return `${MONTHS[start.getMonth()]} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
  }
  return `${MONTHS[start.getMonth()]} ${start.getDate()} – ${MONTHS[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
}

export function dateFormat(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Search sort and filter Functions

// Filter the incoming array according to the searchValue

export function searchFilter(searchByValue, searchValue, arr) {
  if (searchByValue === "title" || searchByValue === "") {
    return arr.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  } else if (searchByValue === "ingredients") {
    // Some returns true if an ingredient is in the ingredient array
    return arr.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }

  return arr;
}

// An array to help sort the order for difficulties
const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

// Sort the incoming arr by its sort value
export function sortRecipes(sortBy, arr) {
  switch (sortBy) {
    case "name-asc":
      return [...arr].sort((a, b) => a.title.localeCompare(b.title));

    case "name-desc":
      return [...arr].sort((a, b) => b.title.localeCompare(a.title));

    case "time-asc":
      return [...arr].sort((a, b) => a.cookTime - b.cookTime);

    case "time-desc":
      return [...arr].sort((a, b) => b.cookTime - a.cookTime);

    case "difficulty-asc":
      return [...arr].sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
      );

    case "difficulty-desc":
      return [...arr].sort(
        (a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty],
      );

    default:
      return arr;
  }
}

// filter the incoming arr by its filter value for cuisines
export function filterCuisine(cuisineValue, arr) {
  if (
    cuisineValue.toLowerCase() === "" ||
    cuisineValue.toLowerCase() === "all"
  ) {
    return arr;
  } else {
    return arr.filter(
      (recipe) => recipe.cuisine.toLowerCase() === cuisineValue.toLowerCase(),
    );
  }
}

// filter the incoming arr by its filter value for category
export function filterCategory(categoryValue, arr) {
  if (
    categoryValue.toLowerCase() === "" ||
    categoryValue.toLowerCase() === "all"
  ) {
    return arr;
  } else {
    return arr.filter(
      (recipe) => recipe.category.toLowerCase() === categoryValue.toLowerCase(),
    );
  }
}

// filter the incoming arr by its filter value for difficulty
export function filterDifficulty(difficultyValue, arr) {
  if (
    difficultyValue.toLowerCase() === "" ||
    difficultyValue.toLowerCase() === "all"
  ) {
    return arr;
  } else {
    return arr.filter(
      (recipe) =>
        recipe.difficulty.toLowerCase() === difficultyValue.toLowerCase(),
    );
  }
}

// filter the incoming arr by its cookTime value
export function filterCookTime(cookTimeValue, arr) {
  switch (cookTimeValue) {
    case "quick":
      return arr.filter((recipe) => recipe.cookTime <= 20);
    case "moderate":
      return arr.filter(
        (recipe) => recipe.cookTime > 20 && recipe.cookTime <= 40,
      );
    case "long":
      return arr.filter(
        (recipe) => recipe.cookTime > 40 && recipe.cookTime <= 60,
      );
    case "very-long":
      return arr.filter((recipe) => recipe.cookTime > 60);

    default:
      return arr;
  }
}
