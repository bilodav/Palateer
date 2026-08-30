import { useState } from "react";

function List({
  list = [],
  ordered = false,
  checked = false,
  listStyleType,
  listStylePosition = "inside",
  checkedList,
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

export default List;
