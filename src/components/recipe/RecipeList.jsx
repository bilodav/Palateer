import RecipeCard from "./RecipeCard";
import styles from "./RecipeList.module.css";
import { useNavigate } from "react-router-dom";

function RecipeList({ list }) {
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

export default RecipeList;
