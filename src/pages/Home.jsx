import AudioPlayer from "../components/media/AudioPlayer";
import ShoppingList from "../components/mealPlanner/ShoppingList";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { recipesData } from "../data/recipesData";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useMealPlanner } from "../components/context/MealPlannerContext";
import { dateFormat } from "../utils/helpers";
function Home() {
  const navigate = useNavigate();
  const { getMealForDate } = useMealPlanner();

  const plannerEntry = getMealForDate(dateFormat(new Date()));
  const hasMeals =
    plannerEntry?.meal?.breakfast ||
    plannerEntry?.meal?.lunch ||
    plannerEntry?.meal?.dinner;

  const randomTip = Math.floor(Math.random() * 34) + 1;
  const breakfastList = recipesData.filter(
    (entry) => entry.category === "breakfast",
  );
  const dinnerList = recipesData.filter((entry) => entry.category === "dinner");

  const randomDinner =
    dinnerList[Math.floor(Math.random() * dinnerList.length) + 1];

  const randomBreakfast =
    breakfastList[Math.floor(Math.random() * breakfastList.length) + 1];

  console.log(randomDinner);

  return (
    <section className={styles["home-page"]}>
      <div className={styles["home-banner"]}>
        <h1>PALATEER</h1>
        <p>Explore. Plan. Cook.</p>

        <h2>Explore Cooking tips</h2>
        <AudioPlayer
          style={{ width: "300px", paddingLeft: "40px" }}
          src={`./assets/audio/tip${randomTip}.mp3`}
        />
      </div>
      <div className={styles["planned-meals-banner"]}>
        <div className={styles["meal-col"]}>
          <h3>Wondering Whats for Dinner</h3>
          <p>We got you</p>
          <div className={styles["dinner-card"]}>
            <img src={randomDinner.image} alt={randomDinner.title} />
            <span>{randomDinner.title}</span>
            <Button
              className="btn-ghost"
              text="view recipe"
              onClick={() => navigate(`/recipes/${randomDinner.id}`)}
            />
          </div>
        </div>
        <div className={styles["info-col"]}>
          {hasMeals && (
            <ShoppingList title="Dont forget these items for your meals" />
          )}
          {!hasMeals && (
            <div
              className={styles["meal-planner"]}
              onClick={() => navigate("/meal-planner")}
            >
              <h4>
                Add meals to your meal planner and view what ingredients you
                need in your pantry
              </h4>
            </div>
          )}
        </div>
      </div>
      <div className={styles["cuisine-banner"]}>
        <h2>Traverse Tantalizing Cuisines</h2>
        <div className={styles["cuisine-list"]}>
          <Card title={"Thai"} image={"./assets/images/thaiCuisine.jpg"} />
          <Card
            title={"Italian"}
            image={"./assets/images/italianCuisine.jpg"}
          />
          <Card
            title={"Japanese"}
            image={"./assets/images/japaneseCuisine.jpg"}
          />
          <Card title={"French"} image={"./assets/images/frenchCuisine.jpg"} />
          <Card
            title={"Mexican"}
            image={"./assets/images/mexicanCuisine.jpg"}
          />
        </div>
      </div>
      <div
        className={styles["breakfast-banner"]}
        onClick={() => navigate(`/recipes/${randomBreakfast.id}`)}
      >
        <h3>Whats trending today</h3>
        <span className={styles["breakfast-caption"]}>
          A brekki for the champs
        </span>
        <span className={styles["breakfast-title"]}>
          {randomBreakfast.title}
        </span>
        <img src={randomBreakfast.image} alt={randomBreakfast.image} />
      </div>
    </section>
  );
}

export default Home;
