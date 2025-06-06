import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';
const CustomInpSelect = ({ value, onChange, currency, onCurrencyChange, isReq }) => {
  const {currencies} = useContext(AppContext);
  return (
    <div className="custom-inp-container">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
        placeholder="ادخل القيمة"
        required={isReq}
        onWheel={(e) => e.target.blur()} 
        onFocus={(e) => e.target.select()}
        // onWheel={(e) => e.preventDefault()}
      />
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="select"
        required={isReq}
      >
        <option value="اختر العملة" selected disabled hidden>اختر العملة</option>
        {currencies&&currencies.length>0&& currencies.map((curr,key) => (
          <option key={key} value={curr.id}>
            {curr.name} 
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomInpSelect;