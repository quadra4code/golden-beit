import React, { useState, useContext } from 'react';
import AppContext from '../Context/AppContext';
const NumberInput = ({placeholder,numberInpValue, setNumberInpValue }) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setNumberInpValue(numericValue);
  };
  return (
    <input
      type="text"
      id="custom-number-input"
      value={numberInpValue}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default NumberInput;