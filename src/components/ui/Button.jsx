import PropTypes from "prop-types";

function Button({
  title,
  className = "btn-primary",
  text = "click me",
  onClick = () => {},
  type,
}) {
  return (
    <button type={type} title={title} className={className} onClick={onClick}>
      {text}
    </button>
  );
}

Button.PropTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
