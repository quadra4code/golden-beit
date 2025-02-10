import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
          <DotLottieReact
            src="https://lottie.host/37d4af8f-d382-4438-b96f-d6a1197d7818/X3u7fvqHFA.lottie"
            loop
            autoplay
          />
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
