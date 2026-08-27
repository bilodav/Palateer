import { useFavorites } from "../context/FavoritesContext";
import Favorite from "./Favorite";
import styles from "./Card.module.css";

function Card({
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
    <div className={styles["recipe-card"]} id={id}>
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
        <div className="card-details">
          <span>
            {cookingTime} min * {difficulty}
          </span>
          <span>{servings}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
