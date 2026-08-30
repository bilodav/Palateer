import MealPlanner from "../components/mealPlanner/MealPlanner";

function MealPlannerPage() {
  return (
    <section
      style={{
        height: "100%",
        maxHeight: "100vh",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <MealPlanner />
    </section>
  );
}

export default MealPlannerPage;
