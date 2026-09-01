import { useState } from "react";
import { recipesData } from "../../data/recipesData";
import styles from "./MealSlot.module.css";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import MealPicker from "./MealPicker";
import { useMealPlanner } from "../context/MealPlannerContext";
import { dateFormat } from "../../utils/helpers";

function findRecipeById(id) {
  return recipesData.find((recipe) => recipe.id === id);
}

function MealSlot({ label, recipeId, date, mealType }) {
  const [isOptionsActive, setisOptionsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recipe = recipeId ? findRecipeById(recipeId) : null;
  const navigate = useNavigate();
  const { removeMeal } = useMealPlanner();

  const handleCardClick = () => {
    if (recipe) {
      navigate(`/recipes/${recipeId}`);
    }
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setisOptionsActive(false);
    setIsModalOpen(true);
  };

  const handleOptionsClick = () => {
    setisOptionsActive((prev) => !prev);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    removeMeal(dateFormat(date), mealType);
    setisOptionsActive(false);
  };

  return (
    <div className={styles["meal-slot"]}>
      <p className={styles["label"]}>{label}</p>
      <div className={styles["meal-slot-card"]}>
        <img
          src={recipe ? recipe.image : "/assets/images/placeholder2.jpg"}
          alt={recipe ? recipe.title : ""}
          onClick={handleCardClick}
        />
        <span className={styles["title"]} onClick={handleCardClick}>
          {recipe ? recipe.title : "Click to add Meal "}
        </span>
        {recipe && (
          <div onClick={handleOptionsClick} className={styles["options"]}>
            ...
          </div>
        )}
        {isOptionsActive && (
          <div className={styles["options-active"]}>
            <span onClick={handleEditClick}>Edit</span>
            <span onClick={handleDelete}>Delete</span>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <MealPicker
          key={`${date}-${mealType}-${isModalOpen}`}
          onDone={closeModal}
          date={dateFormat(date)}
          mealType={mealType}
        />
      </Modal>
    </div>
  );
}

export default MealSlot;
