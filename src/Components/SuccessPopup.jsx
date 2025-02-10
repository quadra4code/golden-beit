import React, { useState, useEffect } from 'react';
const SuccessPopup = ({ message }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  if (!show) {
    return null;
  }
  return (
    <main className='success-popup'>
      <div className="popup">
        <div className="popup-content">
          <div className="icon">
          <iframe src="https://lottie.host/embed/27ce34d2-256d-4972-bcb4-03b04ffab370/nGgaGVReix.lottie"></iframe>
          </div>
          <div className='success-msg'>
            <p>الاسم : {message.winner_name}</p>
            <p>اسم المشروع : {message.project_name}</p>
            <p>رقم الوحدة : {message.property_number}</p>
            <p>رقم العمارة / اسم المنطقة : {message.building_or_region}</p>
            <p>الطابق : {message.floor}</p>
          </div>
          <button className='close' onClick={()=>{setShow(false)}}>
            أغلاق
          </button>
        </div>
      </div>
    </main>
  );
};

export default SuccessPopup;
