import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../../utils/helpers";

// The container to hold the shared state
const FavoritesContext = createContext(null);

// This is the key to store and retrieve
const STORAGE_KEY = "favoriteIds";

// The provider component which holds the data and passes it down to components wrapped inside it
export function FavoritesProvider({ children }) {
  // Try to get favoriteIds from storage but if there is nothing then use an empty arry instead
  // creating sets so that duplicate IDs are removed from my list automatically
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(loadFromStorage(STORAGE_KEY, [])),
  );

  // Useing a useEffect so that whenever favoriteIds changes it saves the new list to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEY, [...favoriteIds]);
  }, [favoriteIds]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const nextArr = new Set(prev);
      if (nextArr.has(id)) {
        nextArr.delete(id);
      } else {
        nextArr.add(id);
      }
      return nextArr;
    });
  };

  // A helper function to see if an ID has been favorited already
  const isFavorite = (id) => favoriteIds.has(id);

  //   Return the context box so the children can have acces to the state
  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// This is a custom hook so that components can just use the useFavorites()
export function useFavorites() {
  const context = useContext(FavoritesContext);

  //   Check to see if useFavorites is used in a component that isnt wrapped in <FavoritesProvider>
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
