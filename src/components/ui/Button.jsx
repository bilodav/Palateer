import PropTypes from "prop-types";

function Button({
  className = "btn-primary",
  text = "click me",
  onClick = () => {},
}) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

Button.PropTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
