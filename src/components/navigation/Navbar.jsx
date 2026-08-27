import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

const links = [
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  viewBox="0 0 512 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M240 6.1c9.1-8.2 22.9-8.2 32 0l232 208c9.9 8.8 10.7 24 1.8 33.9s-24 10.7-33.9 1.8l-8-7.2 0 205.3c0 35.3-28.7 64-64 64l-288 0c-35.3 0-64-28.7-64-64l0-205.3-8 7.2c-9.9 8.8-25 8-33.9-1.8s-8-25 1.8-33.9L240 6.1zm16 50.1L96 199.7 96 448c0 8.8 7.2 16 16 16l48 0 0-104c0-39.8 32.2-72 72-72l48 0c39.8 0 72 32.2 72 72l0 104 48 0c8.8 0 16-7.2 16-16l0-248.3-160-143.4zM208 464l96 0 0-104c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24l0 104z"/></svg>`,
    label: "Home",
    to: "/",
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M112 8.1S245.4-.1 233 112.5c0 0 19.1-74.9 103-40.6 0 0-17.7 74-88 56 0 0 14.6-54.6 66.1-56.6 0 0-39.9-10.3-82.1 48.8 0 0-19.8-94.5-93.6-99.7 0 0 75.2 19.4 77.6 107.5 0 .1-106.4 7-104-119.8zM424 323.7c0 48.5-9.7 95.3-32 132.3-42.2 30.9-105 48-168 48-62.9 0-125.8-17.1-168-48-22.3-37-32-83.8-32-132.3 0-48.4 17.7-94.7 40-131.7 42.2-30.9 97.1-48.6 160-48.6 63 0 117.8 17.6 160 48.6 22.3 37 40 83.3 40 131.7zM144 428a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zm0-66.2a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zm0-66.2a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zM216 428a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zm0-66.2a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zm0-66.2a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zM288 428a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zm0-66.2a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zm0-66.2a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zM360 428a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zm0-66.2a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zm0-66.2a28 28 0 1 0 -56 0 28 28 0 1 0 56 0zM384 256c-4.8-22.3-7.4-36.9-16-56-38.8-19.9-90.5-32-144-32S118.8 180.1 80 200c-8.8 19.5-11.2 33.9-16 56 42.2-7.9 98.7-14.8 160-14.8s117.8 6.9 160 14.8z"/></svg>`,
    label: "Recipes",
    to: "/recipes",
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M120 0c13.3 0 24 10.7 24 24l0 40 160 0 0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-40c0-13.3 10.7-24 24-24zm0 112l-56 0c-8.8 0-16 7.2-16 16l0 48 352 0 0-48c0-8.8-7.2-16-16-16l-264 0zM48 224l0 192c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-192-352 0z"/></svg>`,
    label: "Meal Planner",
    to: "/meal-planner",
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"/></svg>`,
    label: "Favorites",
    to: "/favorites",
  },
];

function Navbar() {
  const navRef = useRef(null);

  return (
    <nav ref={navRef}>
      <div className={styles["logo-container"]}></div>
      <div className={styles["link-box"]}>
        {links.map(({ svg, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <span dangerouslySetInnerHTML={{ __html: svg }} />
            <span className={styles.label}> {label}</span>
          </NavLink>
        ))}
      </div>
      <div className={styles["nav-filler"]}></div>
    </nav>
  );
}

export default Navbar;
