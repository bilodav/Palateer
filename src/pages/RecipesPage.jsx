import { recipesData } from "../data/recipesData";

function RecipesPage() {
  return (
    <section
      style={{ marginLeft: "50px", maxHeight: "100vh", overflow: "auto" }}
    >
      <h1>recipes</h1>
      {recipesData.map((recipe) => (
        <>
          <p>{recipe.id}</p>
          <h2>{recipe.title}</h2>
          <p>{recipe.cookTime}</p>
          <img
            src={`../src/assets/images/recipes/${recipe.image}`}
            alt="food"
          />
          <ul style={{ listStyleType: "disc" }}>
            {recipe.ingredients.map((ing) => (
              <li>{ing}</li>
            ))}
          </ul>
          <ol style={{ listStyleType: "number", marginBottom: "20px" }}>
            {recipe.instructions.map((ing) => (
              <li>{ing}</li>
            ))}
          </ol>
        </>
      ))}
    </section>
  );
}

export default RecipesPage;
