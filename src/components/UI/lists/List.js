import React from "react";

const List = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.key}>{item.text}</li>
      ))}
    </ul>
  );
};

export default List;
