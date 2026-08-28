import { useFavorites } from "../context/FavoritesContext";
import Favorite from "../ui/Favorite";
import styles from "./Recipe.module.css";

function RecipeCard({
  image,
  id,
  title,
  cookingTime,
  difficulty,
  onNavigate,
  servings,
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <div className={styles["recipe-card"]} id={id} onClick={onNavigate}>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className={styles["card-image"]}
      >
        <Favorite
          isFull={isFavorite(id)}
          className={styles["favorite"]}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
        />
      </div>
      <div className={styles["card-info"]}>
        <h4>{title}</h4>
        <div className={styles["card-details"]}>
          <span>
            {cookingTime} min ✦ {difficulty}
          </span>
          <span title="Servings">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path
                fill="rgb(1, 1, 1)"
                d="M64 240C64 204.7 92.7 176 128 176C128.5 176 129.1 176 129.6 176C137 139.5 169.3 112 208 112C223 112 237 116.1 248.9 123.2C262.2 97.5 289 80 320 80C351 80 377.8 97.6 391.1 123.2C403.1 116.1 417.1 112 432 112C470.7 112 503 139.5 510.4 176C510.9 176 511.5 176 512 176C547.3 176 576 204.7 576 240C576 251.7 572.9 262.6 567.4 272L72.6 272C67.1 262.6 64 251.7 64 240zM64 347.4C64 332.3 76.3 320 91.4 320L548.5 320C563.6 320 575.9 332.3 575.9 347.4C575.9 417.9 531.5 478.1 469.2 501.5L467.5 516C465.5 532 451.9 544 435.7 544L204.2 544C188.1 544 174.4 532 172.4 516L170.6 501.6C108.4 478.1 64 417.9 64 347.4z"
              />
            </svg>
            {servings}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
