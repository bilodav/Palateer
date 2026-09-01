import {
  addDays,
  DAYS,
  isSameDay,
  rangeFormat,
  startOfWeek,
} from "../../utils/helpers";
import Button from "../ui/Button";
import DayCard from "./DayCard";
import styles from "./MealPlanner.module.css";
import { useState, useMemo } from "react";

function MealPlanner() {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const today = useMemo(() => new Date(), []);
  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  function goWeek(i) {
    setWeekStart((prev) => addDays(prev, i * 7));
  }

  const isCurrentWeek = weekDates.some((d) => isSameDay(d, today));

  return (
    <div className={styles["meal-planner"]}>
      <div>
        <h1>My Meal Plan</h1>
      </div>
      <div className={styles["week-nav"]}>
        <Button
          className={`${styles["btn-nav"]} btn-secondary`}
          text="‹"
          onClick={() => goWeek(-1)}
        />
        <span>
          {rangeFormat(weekStart)}
          {!isCurrentWeek && (
            <Button
              className={`${styles["btn-pill"]} btn-ghost`}
              text="Today"
              onClick={() => setWeekStart(startOfWeek(new Date()))}
            />
          )}
        </span>

        <Button
          className={`${styles["btn-nav"]} btn-secondary`}
          text="›"
          onClick={() => goWeek(1)}
        />
      </div>
      <div className={styles["week-strip"]}>
        {weekDates.map((d, index) => {
          const isSelected = isSameDay(d, selectedDate);
          const isToday = isSameDay(d, today);
          const styleString = `${isSelected ? styles["selected-block"] : ""} ${isToday ? styles["today-block"] : ""} ${styles["date-block"]}`;
          return (
            <div
              key={index}
              className={styleString}
              onClick={() => setSelectedDate(d)}
            >
              <span>{DAYS[index]}</span>
              <span>{d.getDate()}</span>
            </div>
          );
        })}
      </div>
      <DayCard date={selectedDate} />
    </div>
  );
}

export default MealPlanner;
