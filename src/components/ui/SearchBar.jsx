import styles from "./SearchBar.module.css";

function SearchBar({
  searchBy,
  onSearchBy,
  searchValue,
  onSearchChange,
  placeholder = "Search recipes...",
  onSortChange,
  sortValue,
}) {
  return (
    <div className={styles["search-bar"]}>
      <div className={styles["input-group"]}>
        <select value={searchBy} onChange={(e) => onSearchBy(e.target.value)}>
          <option value="" hidden>
            Search using:
          </option>
          <option value="title">Name:</option>
          <option value="ingredients">Ingredients:</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>

      <select onChange={(e) => onSortChange(e.target.value)} value={sortValue}>
        <option value="" hidden>
          Sort By:
        </option>
        <option value="name-asc">Name: A–Z</option>
        <option value="name-desc">Name: Z–A</option>
        <option value="time-asc">Cooking time: Shortest</option>
        <option value="time-desc">Cooking time: Longest</option>
        <option value="difficulty-asc">Difficulty: Easiest</option>
        <option value="difficulty-desc">Difficulty: Hardest</option>
      </select>
    </div>
  );
}

export default SearchBar;
// 065 625 2741

// 1468 3313 86
// 470010
