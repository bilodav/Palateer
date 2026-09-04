import styles from "./AudioPlayer.module.css";

function AudioPlayer({ src, className, controls }) {
  return (
    <audio className={className} src={src} controls preload="metadata"></audio>
  );
}

export default AudioPlayer;
