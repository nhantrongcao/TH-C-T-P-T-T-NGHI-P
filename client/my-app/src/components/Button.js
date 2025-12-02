import React, { memo } from "react";
import "./Button.css";

const Button = ({ name, handleOnClick, style, iconsBefore, iconAfter }) => {
  return (
    <button
      type="button"
      className={`button ${style || ""}`}
      onClick={handleOnClick}
    >
      {iconsBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default memo(Button);