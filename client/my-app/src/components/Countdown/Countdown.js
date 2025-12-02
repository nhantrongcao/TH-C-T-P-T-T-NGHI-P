import React, { memo } from "react";
import "./Countdown.css";

const Countdown = ({ unit, number }) => {
  return (
    <div className="countdown-item">
      <span className="countdown-number">{number}</span>
      <span className="countdown-unit">{unit}</span>
    </div>
  );
};

export default memo(Countdown);
