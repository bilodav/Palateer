import { useEffect, useState } from "react";
import styles from "./Card.module.css";

function Card({ image, title }) {
  return (
    <div className={styles["card"]}>
      <img src={image} alt={title} />
      <span>{title}</span>
    </div>
  );
}

export default Card;
