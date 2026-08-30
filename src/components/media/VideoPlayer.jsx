import { useEffect, useState, useRef } from "react";
import Button from "../ui/Button";
import styles from "./Media.module.css";
function VideoPlayer({ videoUrl, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  // A regex to test if videoUrl is either a video that is online or via a  youTube source or vimeo
  const videoRegex =
    /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/|vimeo\.com\/(?:video\/)?)[\w-]{11,15}/g;

  const isURL = videoRegex.test(videoUrl);

  //   Using a "ref" to act as a direct pointer to the <dialog> element to call the showModal/close
  const dialogRef = useRef(null);

  //   Anytime isOpen changes the dialog element will open or close using the useEffect
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

  // Reset error state everytime the dialog is closed or opened or url changes
  useEffect(() => {
    setHasError(false);
  }, [videoUrl, isOpen]);

  return (
    <div className={`${className} ${styles["video-player"]}`}>
      <Button
        className={`btn-coral ${styles["btn-play"]} `}
        text="▶"
        onClick={toggleIsOpen}
        title="Watch Recipe Video"
      />

      {/* Native dialog methods should also change the state correctly to be true */}
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
        {/* Conditionally rendering the iframe if the path is a url and also so that it unmounts on dialog close and video stops */}
        {isOpen && isURL && (
          <iframe
            className={styles["iframe"]}
            src={videoUrl}
            title="Recipe Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {/* Conditionally rendering the video if the path is a local file and also so that it unmounts on dialog close and video stops */}
        {isOpen && !isURL && !hasError && (
          <video controls Autoplay onError={() => setHasError(true)}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag
          </video>
        )}
        {/* Error state shown when the local file path is broken/missing */}
        {isOpen && !isURL && hasError && (
          <div className={styles["video-error"]}>
            <p style={{ height: "200px", marginTop: "150px", padding: "20px" }}>
              ⚠️ This video could not be loaded.
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}

export default VideoPlayer;
