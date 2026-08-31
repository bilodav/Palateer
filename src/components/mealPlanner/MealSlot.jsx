import { recipesData } from "../../data/recipesData";
import styles from "./MealSlot.module.css";

function findRecipeById(id) {
  return recipesData.find((recipe) => recipe.id === id);
}

function MealSlot({ label, recipeId }) {
  const recipe = recipeId ? findRecipeById(recipeId) : null;
  return (
    <div className={styles["meal-slot"]}>
      <p className={styles["label"]}>{label}</p>
      <div className={styles["meal-slot-card"]}>
        <img
          src={recipe ? recipe.image : "/assets/images/placeholder2.jpg"}
          alt={recipe ? recipe.title : ""}
        />
        <span className={styles["title"]}>
          {recipe ? recipe.title : "Click to add Meal "}
        </span>
        {recipe && <div className={styles["options"]}>...</div>}
      </div>
    </div>
  );
}

export default MealSlot;
