import styles from "./filterBar.module.css";

function FilterBar() {
  return (
    <div className={styles["filter-bar"]}>
      <span className={styles["filter"]}>Filter By Cuisine</span>
      <div className={styles["filter-cats"]}></div>
      <span className={styles["filter"]} value="all">
        All
      </span>
      <span className={styles["filter"]} value="american">
        American
      </span>
      <span className={styles["filter"]} value="japanese">
        Japanese
      </span>
      <span className={styles["filter"]} value="french">
        French
      </span>
      <span className={styles["filter"]} value="mexican">
        Mexican
      </span>
      <span className={styles["filter"]} value="middle-eastern">
        Middle Eastern
      </span>
      <span className={styles["filter"]} value="italian">
        Italian
      </span>
      <span className={styles["filter"]} value="mediterranean">
        Mediterranean
      </span>
    </div>
  );
}

export default FilterBar;
