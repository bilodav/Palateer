import PropTypes from "prop-types";
import { useMealPlanner } from "../context/MealPlannerContext";
import MealSlot from "./MealSlot";
import styles from "./DayCard.module.css";
import { dateFormat } from "../../utils/helpers";

function DayCard({ date }) {
  const { getMealForDate } = useMealPlanner();
  const entry = getMealForDate(dateFormat(date));
  const meal = entry?.meal || {};

  const mealSlots = [
    { key: "breakfast", label: "Breakfast", recipeId: meal.breakfast },
    { key: "lunch", label: "Lunch", recipeId: meal.lunch },
    { key: "dinner", label: "Dinner", recipeId: meal.dinner },
  ];

  return (
    <div className={styles["day-card"]}>
      {mealSlots.map(({ key, label, recipeId }) => (
        <MealSlot
          key={key}
          mealType={key}
          label={label}
          recipeId={recipeId}
          date={date}
        />
      ))}
    </div>
  );
}

DayCard.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default DayCard;
