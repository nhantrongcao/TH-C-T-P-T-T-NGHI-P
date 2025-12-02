import React from "react";
import "./InputField.css";

const InputField = ({ value, setValue, nameKey = "", type = "text" }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="input-container">
      <input
        type={type}
        className="input-field"
        placeholder={nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
        value={value || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
