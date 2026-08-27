import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="page-not-found">
      <div className="btn-container">
        <Button text="Go Back Home" onClick={() => navigate("/")} />
        <Button
          text="Explore Recipes"
          className={"btn-coral"}
          onClick={() => navigate("/recipes")}
        />
      </div>
    </section>
  );
}

export default NotFound;
