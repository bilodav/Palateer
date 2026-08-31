import { useEffect, useState, useRef } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal.jsx";
import styles from "./Video.module.css";
function VideoPlayer({ videoUrl, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  // A regex to test if videoUrl is either a video that is online or via a  youTube source or vimeo
  const videoRegex =
    /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/|vimeo\.com\/(?:video\/)?)[\w-]{11,15}/g;

  const isURL = videoRegex.test(videoUrl);

  const toggleIsOpen = () => {
    setIsOpen((p) => !p);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <div className={`${className} ${styles["video-player"]}`}>
      <Button
        className={`btn-coral ${styles["btn-play"]} `}
        text="▶"
        onClick={toggleIsOpen}
        title="Watch Recipe Video"
      />

      <Modal isOpen={isOpen} onClose={closeModal}>
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
      </Modal>
    </div>
  );
}

export default VideoPlayer;
