import React from "react";
import "./square.css";

const Square = ({ clicked, toggleClicked, letter }) => {
  return (
    <button className={clicked ? "clicked" : ""} onClick={toggleClicked}>
      {letter}
    </button>
  );
};

export default Square;
