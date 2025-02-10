import React, { useState, useContext } from 'react';
import AppContext from '../Context/AppContext';
const NumberInput = ({placeholder}) => {
  // const [value, setValue] = useState('');
  const { numberInpValue, setNumberInpValue } = useContext(AppContext)
  // Handle input change
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Use a regex to allow only numbers
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    // Update the state with the sanitized value
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