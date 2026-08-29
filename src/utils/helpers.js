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
 * Statically imports every recipe image under `src/assets/images/recipes/`
 * so Vite can process, hash, and bundle them correctly for production.
 *
 * `import.meta.glob` requires a static string literal pattern (no variables)
 * since Vite scans it at build time.
 *
 * `eager: true`  -> imports are resolved immediately (no dynamic `import()`,
 *                   simplest option when the number of images is modest).
 * `import: "default"` -> returns the resolved URL string directly instead of
 *                   the full module object (`{ default: url }`).
 *
 * Resulting shape of `imageModules`:
 * {
 *   "../assets/images/recipes/recipe-1.jpg": "/assets/recipe-1-a1b2c3.jpg",
 *   "../assets/images/recipes/recipe-2.jpg": "/assets/recipe-2-d4e5f6.jpg",
 *   ...
 * }
 *
 * @type {Record<string, string>}
 */
const imageModules = import.meta.glob(
  "../assets/images/recipes/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
    import: "default",
  },
);

/**
 * Lookup table mapping a bare filename (e.g. "recipe-1.jpg") to its
 * resolved, hashed build URL, so callers can look up an image without
 * knowing or caring about the full glob path.
 *
 * @type {Record<string, string>}
 */
const imagesByFilename = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [
    path.split("/").pop(),
    url,
  ]),
);

/**
 * Fallback image shown whenever a recipe's `image` field doesn't match
 * any file found by the glob above (missing asset, typo, unmapped id, etc).
 */
import placeholder from "../assets/images/placeholder.jpg";

/**
 * Resolve a recipe's `image` field to a real, bundler-safe image URL.
 *
 * @param {string} image - The recipe's raw `image` field, expected to be a
 *   bare filename (e.g. `"recipe-1.jpg"`) matching a file in
 *   `src/assets/images/recipes/`.
 * @returns {string} The resolved image URL, or the placeholder URL if no
 *   matching file was found.
 *
 * @example
 * getRecipeImage("recipe-1.jpg"); // -> "/assets/recipe-1-a1b2c3.jpg"
 * getRecipeImage("missing.jpg");  // -> placeholder URL
 */
export function getRecipeImage(image) {
  return imagesByFilename[image] || placeholder;
}
