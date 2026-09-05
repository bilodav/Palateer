function AudioPlayer({ src, style }) {
  return <audio style={style} src={src} controls preload="metadata"></audio>;
}

export default AudioPlayer;
