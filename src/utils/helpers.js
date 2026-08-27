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
