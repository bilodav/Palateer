import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";
import styles from "./RecipeList.module.css";
import { useNavigate } from "react-router-dom";

function RecipeList({ list = [] }) {
  const navigate = useNavigate();
  return (
    <div className={styles["recipe-list"]}>
      {list.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          cookingTime={recipe.cookTime}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
          onNavigate={() => navigate(`/recipes/${recipe.id}`)}
        />
      ))}
    </div>
  );
}

RecipeList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      cookTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      servings: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      difficulty: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RecipeList;
