import { useEffect, useState, useRef } from "react";
import Button from "../ui/Button";
import styles from "./Media.module.css";
function VideoPlayer({ videoUrl, className }) {
  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (isOpen) {
      d.showModal();
    } else {
      d.close();
    }
  }, [isOpen]);

  const toggleIsOpen = () => {
    setIsOpen((p) => !p);
  };

  return (
    <div className={`${className} ${styles["video-player"]}`}>
      <Button
        className={`btn-coral ${styles["btn-play"]} `}
        text="▶"
        onClick={toggleIsOpen}
      />
      <dialog
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            toggleIsOpen();
          }
        }}
      >
        <Button
          className={`btn-coral ${styles["btn-close"]} `}
          text="X"
          onClick={toggleIsOpen}
        />
        {/* Conditionally rendering the iframe so that it unmounts on dialog close and video stops */}
        {isOpen && (
          <iframe
            className={styles["iframe"]}
            src="https://www.youtube.com/embed/YzhbwPB5kq0?si=waL3AFSLzCUDw16w"
            title="Recipe Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </dialog>
    </div>
  );
}

export default VideoPlayer;
