import Button from "../ui/Button";
import styles from "./MealPicker.module.css";

function MealPicker() {
  return (
    <form className={styles["meal-picker"]}>
      <h3>Add To Meal Plan</h3>
      <input type="date" />
      <select name="mealType" id="mealType">
        <option value="breakfast">Breakfast</option>
        <option value="breakfast">Lunch</option>
        <option value="breakfast">Dinner</option>
      </select>
      <Button text="Add to Plan" />
    </form>
  );
}

export default MealPicker;
