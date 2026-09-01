import { useState } from "react";
import Button from "../ui/Button";
import styles from "./MealPicker.module.css";
import { useMealPlanner } from "../context/MealPlannerContext";
import { recipesData } from "../../data/recipesData";
function MealPicker({ recipeId, date, mealType, title, onDone }) {
  const { updateMealSlot } = useMealPlanner();

  const [selectedDate, setSelectedDate] = useState(date || "");
  const [selectedMealType, setSelectedMealType] = useState(mealType || "");
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipeId || "");
  function handleSubmit(selectedDate, selectedMealType, selectedRecipeId) {
    updateMealSlot(selectedDate, selectedMealType, selectedRecipeId);
    setSelectedMealType("");
    setSelectedDate("");
    setSelectedRecipeId("");
    onDone?.();
  }

  return (
    <form
      className={styles["meal-picker"]}
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit(selectedDate, selectedMealType, selectedRecipeId);
      }}
    >
      <h3>{title || "Add to Meal Plan"}</h3>
      {/* If no date render date selector */}
      {!date && (
        <input
          value={selectedDate || ""}
          required
          onChange={(e) => setSelectedDate(e.target.value)}
          type="date"
        />
      )}
      {/* If no Mealtype render Meal type selectoe */}
      {!mealType && (
        <select
          required
          value={selectedMealType}
          name="mealType"
          id="mealType"
          onChange={(e) => setSelectedMealType(e.target.value)}
        >
          <option disabled hidden value="">
            Select Meal Time
          </option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      )}
      {!recipeId && (
        <select
          required
          onChange={(e) => setSelectedRecipeId(Number(e.target.value))}
          value={selectedRecipeId}
        >
          <option hidden disabled value="">
            Choose a Meal
          </option>
          {recipesData.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {recipe.title}
            </option>
          ))}
        </select>
      )}

      <Button
        text="Add to Plan"
        className={`${styles["submit"]} btn-primary `}
        type="submit"
      />
    </form>
  );
}

export default MealPicker;
