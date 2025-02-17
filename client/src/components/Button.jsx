import React, { useState } from "react";

const Button = ({ title, onClickFn, isActive }) => {
  return (
    <button
      className={`is-family-code is-capitalized button ${
        isActive ? "is-inverted is-light" : "is-info is-outlined"
      }`}
      key={title}
      onClick={() => onClickFn(title)}
    >
      {title}
    </button>
  );
};

export default Button;
