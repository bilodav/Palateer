import PropTypes from "prop-types";
import styles from "./Card.module.css";

function Card({ image, title }) {
  return (
    <div className={styles["card"]}>
      <img src={image} alt={title} />
      <span>{title}</span>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
