import axios from 'axios';
import React, { useState, useContext } from 'react';
import AppContext from '../Context/AppContext';
import SuccessPopup from '../Components/SuccessPopup';

const InquiryPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const { token, openNotificationWithIcon, contextHolder } = useContext(AppContext);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const winnerData = (response) => {
    return response
  };
  const handleSubmit = (e) => {
    setShowPopup(false);
    e.preventDefault();
    axios
      .post(
        'https://golden-gate-three.vercel.app/core/draw-results',
        { full_name: inputValue },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const response = res.data.data;
        if (response.length < 1) {
          openNotificationWithIcon('error', 'عملية خاطئه ', 'لا يوجد مطابقة لبحثك');
          return;
        }
        const message = winnerData(response);
        setPopupMessage(message);
        setShowPopup(true);
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'عملية خاطئه ', err.response.data.msg);
      });
  };
  return (
    <>
      {showPopup && <SuccessPopup message={popupMessage} />}
      <div className="input-page">
        {contextHolder}
        <div className="container">
          <h1>استعلام عن الفائزين</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputField">من فضلك أدخل الاسم</label>
              <input
                type="text"
                id="inputField"
                value={inputValue}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InquiryPage;