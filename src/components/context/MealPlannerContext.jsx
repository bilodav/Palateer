import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../../utils/helpers";

// The container to hold the shared state
const MealPlannerContext = createContext(null);

// This is the key to store and retrieve
const STORAGE_KEY = "mealPlan";

// The provider component which holds the data and passes it down to components wrapped inside it
export function MealPlannerProvider({ children }) {
  // Try to get mealPlan from storage but if there is nothing then use an empty arry instead
  const [mealPlan, setMealPlan] = useState(() =>
    loadFromStorage(STORAGE_KEY, []),
  );

  // Adds a brand new meal entry to the array.
  // entry would look like { date, day, meal }.
  const addMeal = (entry) => {
    setMealPlan((prev) => [...prev, entry]);
  };

  const removeMeal = (date) => {
    setMealPlan((prev) => prev.filter((entry) => entry.date !== date));
  };

  // A helper to look up whatever meal is planned for one specific date.
  // Returns undefined if nothing is planned for that date yet.
  const getMealForDate = (date) =>
    mealPlan.find((entry) => entry.date === date);

  // Useing a useEffect so that whenever mealPlan changes it saves the new list to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEY, mealPlan);
  }, [mealPlan]);

  //   Return the context box so the children can have acces to the state
  return (
    <MealPlannerContext.Provider
      value={{ mealPlan, addMeal, removeMeal, getMealForDate }}
    >
      {children}
    </MealPlannerContext.Provider>
  );
}

// This is a custom hook so that components can just use the useMealPlanner()
export function useMealPlanner() {
  const context = useContext(MealPlannerContext);

  //   Check to see if useFavorites is used in a component that isnt wrapped in <MealPLannerProvider>
  if (!context) {
    throw new Error("useMealPlanner must be used within a MealPlannerProvider");
  }

  return context;
}
