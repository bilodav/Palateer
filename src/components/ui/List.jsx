import PropTypes from "prop-types";

function List({
  list = [],
  ordered = false,
  checked = false,
  listStyleType,
  listStylePosition = "inside",
  checkedList = new Set(),
  onToggle,
}) {
  const inputStyles = {
    listStyleType,
    listStylePosition,
  };

  const listStyles = {
    marginBottom: "10px",
    cursor: `${checked ? "pointer" : "default"}`,
  };

  const items = list.map((item, index) => (
    <li
      key={index}
      style={{
        ...listStyles,
        textDecoration:
          checked && checkedList.has(index) ? "line-through" : "none",
      }}
      onClick={checked ? () => onToggle(index) : undefined}
    >
      {item}
    </li>
  ));
  return ordered ? (
    <ol style={inputStyles}>{items}</ol>
  ) : (
    <ul style={inputStyles}>{items}</ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.node),
  ordered: PropTypes.bool,
  checked: PropTypes.bool,
  listStyleType: PropTypes.string,
  listStylePosition: PropTypes.oneOf(["inside", "outside"]),
  checkedList: PropTypes.instanceOf(Set),
  onToggle: PropTypes.func,
};

export default List;
