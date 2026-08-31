import { recipesData } from "../../data/recipesData";
import { useMealPlanner } from "../context/MealPlannerContext";
import MealSlot from "./MealSlot";
import styles from "./DayCard.module.css";

function DayCard({ date }) {
  const { getMealForDate } = useMealPlanner();
  const entry = getMealForDate(date);
  const meal = entry?.meal || {};

  const mealSlots = [
    { label: "Breakfast", recipeId: meal.breakfast },
    { label: "Lunch", recipeId: meal.lunch },
    { label: "Dinner", recipeId: meal.dinner },
  ];

  function handleAddMeal(mealType) {
    console.log(`Open modal for ${mealType} on ${date}`);
  }

  function handleOptions(mealType, recipeId) {
    console.log(`Options for ${mealType} recipe ${recipeId} on ${date}`);
  }
  return (
    <div className={styles["day-card"]}>
      {mealSlots.map(({ label, recipeId }) => (
        <MealSlot
          key={label}
          label={label}
          recipeId={recipeId}
          onAddMeal={() => handleAddMeal(key)}
          onOptions={(id) => handleOptions(key, id)}
        />
      ))}
    </div>
  );
}

export default DayCard;
