import PropTypes from "prop-types";
function AudioPlayer({ src, style }) {
  return (
    <audio style={style} controls preload="metadata">
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audi element
    </audio>
  );
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default AudioPlayer;
