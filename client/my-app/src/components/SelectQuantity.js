import React, { memo } from 'react';
import './SelectQuantity.css'; // Import file CSS

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className="select-quantity-container">
      <span onClick={() => handleChangeQuantity('minus')} className="quantity-button">
        -
      </span>
      <input
        className="quantity-input"
        type="text"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <span onClick={() => handleChangeQuantity('plus')} className="quantity-button">
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
