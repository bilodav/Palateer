import styles from "./Recipe.module.css";
import Favorite from "../ui/Favorite";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import VideoPlayer from "../media/VideoPlayer";
import { useState, useEffect } from "react";
import List from "../ui/List";
import TabList from "../ui/TabList";
import { capitalizeString } from "../../utils/helpers";
import MealPicker from "../mealPlanner/MealPicker";
function RecipeDetail({
  recipe: {
    id,
    title,
    category,
    cuisine,
    difficulty,
    cookTime,
    servings,
    image,
    videoUrl,
    instructions,
    ingredients,
  },
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const [checkedList, setCheckedList] = useState(new Set([]));

  const toggleChecked = (id) => {
    setCheckedList((prev) => {
      const nextArr = new Set(prev);
      if (nextArr.has(id)) {
        nextArr.delete(id);
      } else {
        nextArr.add(id);
      }
      return nextArr;
    });
  };

  // Reset error state if the image prop changes (e.g. list re-filters)
  useEffect(() => {
    setHasError(false);
  }, [image]);
  return (
    <div className={styles["recipe-detail"]}>
      <div className={styles["recipe-detail-image"]}>
        <img
          src={hasError ? "/assets/images/placeholder.jpg" : image}
          alt={title}
          onError={() => setHasError(true)}
        />
        <VideoPlayer videoUrl={videoUrl} className={styles["video-button"]} />
        <Button
          className={`btn-accent ${styles["btn-return"]}`}
          text="<-"
          onClick={() => navigate("/recipes")}
        />
        <Favorite
          isFull={isFavorite(id)}
          className={styles["favorite"]}
          size="40px"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
        />
      </div>
      <div className={styles["recipe-detail-info"]}>
        <h2>{title}</h2>
        <div className={styles["recipe-details"]}>
          <div className={styles["recipe-details-block"]}>
            <span>{cookTime} min</span>
            <span>Prep & Cook</span>
          </div>
          <div className={styles["recipe-details-block"]}>
            <span>{capitalizeString(difficulty)}</span>
            <span>Prep & Cook</span>
          </div>
          <div className={styles["recipe-details-block"]}>
            <span>{servings}</span>
            <span>Servings</span>
          </div>
          <div className={styles["recipe-details-block"]}>
            <span>{cuisine}</span>
            <span>Cuisine</span>
          </div>
        </div>
        <p>Perfect for {category}</p>

        <div className={styles["recipe-details-group"]}>
          <TabList
            headers={["instructions", "ingredients"]}
            content={[
              <List
                key={"instructions"}
                list={instructions}
                listStyleType={"decimal"}
                ordered
              />,
              <List
                list={ingredients}
                key={"ingredients"}
                listStyleType={"circle"}
                checkedList={checkedList}
                onToggle={toggleChecked}
                checked
              />,
            ]}
          />
          <MealPicker recipeId={id} />
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
