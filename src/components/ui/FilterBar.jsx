import PropTypes from "prop-types";
import styles from "./filterBar.module.css";

function FilterBar({
  onCuisineChange,
  cuisineValue,
  onCategoryChange,
  categoryValue,
  onDifficultyChange,
  difficultyValue,
  onCookTimeChange,
  cookTimeValue,
}) {
  return (
    <div className={styles["filter-bar"]}>
      <span>Filter By:</span>
      <select
        onChange={(e) => onCuisineChange(e.target.value)}
        value={cuisineValue}
      >
        <option value="" hidden>
          Cuisines:
        </option>
        <option value="all">All Cuisines</option>
        <option value="american">American</option>
        <option value="british">British</option>
        <option value="chinese">Chinese</option>
        <option value="french">French</option>
        <option value="greek">Greek</option>
        <option value="indian">Indian</option>
        <option value="italian">Italian</option>
        <option value="japanese">Japanese</option>
        <option value="mediterranean">Mediterranean</option>
        <option value="mexican">Mexican</option>
        <option value="middle eastern">Middle Eastern</option>
        <option value="moroccan">Morroccan</option>
        <option value="russian">Russian</option>
        <option value="thai">Thai</option>
      </select>
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        value={categoryValue}
      >
        <option value="" hidden>
          Category:
        </option>
        <option value="all">All Categories</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="dessert">Dessert</option>
        <option value="snack">Snacks</option>
      </select>
      <select
        onChange={(e) => onDifficultyChange(e.target.value)}
        value={difficultyValue}
      >
        <option value="" hidden>
          Difficulty:
        </option>
        <option value="all">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <select
        onChange={(e) => onCookTimeChange(e.target.value)}
        value={cookTimeValue}
      >
        <option value="" hidden>
          Cooking Time:
        </option>
        <option value="all">All Cooking Times:</option>
        <option value="quick">0-20 minutes</option>
        <option value="moderate">20-40 minutes</option>
        <option value="long">40-60 minutes</option>
        <option value="very-long">Over 60 minutes</option>
      </select>
    </div>
  );
}

FilterBar.propTypes = {
  onCuisineChange: PropTypes.func.isRequired,
  cuisineValue: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  categoryValue: PropTypes.string.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  difficultyValue: PropTypes.string.isRequired,
  onCookTimeChange: PropTypes.func.isRequired,
  cookTimeValue: PropTypes.string.isRequired,
};

export default FilterBar;
