import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import SuccessPopup from '../Components/SuccessPopup';
import Popup from '../Components/Popup';

const InquiryPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [hasInquired, setHasInquired] = useState(false);
  const { token, openNotificationWithIcon, contextHolder } = useContext(AppContext);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const inquiryTimes = localStorage.getItem('oneTimeInquiry');
    if (inquiryTimes === 'true') {
      setHasInquired(true);
    }
    console.log(inquiryTimes,hasInquired,token);
    
  }, []);
  const winnerData = (response) => {
    return response
  };
  const handleSubmit = (e) => {
    setShowPopup(false);
    e.preventDefault();
    if (!token && hasInquired) {
      openNotificationWithIcon('info', 'يجب تسجيل الدخول', 'لقد قمت بالاستعلام مرة واحدة بالفعل. يرجى تسجيل الدخول للاستعلام مرة أخرى.');
      return;
    }
    axios
      .post(
        'https://golden-gate-three.vercel.app/core/draw-results',
        { full_name: inputValue },
        // { headers: { Authorization: `Bearer ${token}` } }
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
        if (!token) {
          localStorage.setItem('oneTimeInquiry', 'true');
          setHasInquired(true);
        }
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'عملية خاطئه ', err.response.data.msg);
      });
  };
  return (
    <>
      {showPopup && <SuccessPopup message={popupMessage} />}
      <Popup/>
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
            <button type="submit">بحث</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InquiryPage;