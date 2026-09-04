import AudioPlayer from "../components/media/AudioPlayer";
import styles from "./Home.module.css";
function Home() {
  return (
    <section className={styles["home-page"]}>
      <div className={styles["home-banner"]}>
        <h1>PALATEER</h1>
        <p>Explore. Plan. Cook.</p>

        <h2>Explore Cooking tips</h2>
        <AudioPlayer src="./assets/audio/tip1.mp3" />
      </div>
      <div>
        <div>
          <h2>
            Your next upcoming meal ??Wondering Whats for dinner We got you
          </h2>
        </div>
        <div>
          <h2>Make sure your pantry is stocked for your meals tomoorw tect</h2>
        </div>
      </div>
      <div>
        <h2>Some of our cuisines hori with rect cards</h2>
      </div>
      <div>
        <h3>Whats trending horizontal A brekkie for the champs</h3>
      </div>
    </section>
  );
}

export default Home;
