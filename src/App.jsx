import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/Home";
import RecipesPage from "./pages/RecipesPage";
import MealPlannerPage from "./pages/MealPlannerPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFound from "./pages/NotFound";
import "./App.css";
import { FavoritesProvider } from "./components/context/FavoritesContext";
import { MealPlannerProvider } from "./components/context/MealPlannerContext";

function App() {
  return (
    <>
      <FavoritesProvider>
        <MealPlannerProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/meal-planner" element={<MealPlannerPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MealPlannerProvider>
      </FavoritesProvider>
    </>
  );
}

export default App;
