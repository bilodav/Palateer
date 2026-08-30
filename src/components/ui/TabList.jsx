import { useState } from "react";
import styles from "./UI.module.css";
import { capitalizeString } from "../../utils/helpers";

function TabList({ headers = [], content = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  function handleClick(id) {
    setActiveIndex(id);
  }
  return (
    <div className={styles["tabbed"]}>
      <div className={styles["tabbed-headers"]}>
        {headers.map((heading, index) => (
          <div key={index} id={index} onClick={() => handleClick(index)}>
            <span className={activeIndex === index ? styles["active"] : null}>
              {capitalizeString(heading)}
            </span>
          </div>
        ))}
      </div>
      <div className={styles["tabbed-content"]}>{content[activeIndex]}</div>
    </div>
  );
}

export default TabList;
