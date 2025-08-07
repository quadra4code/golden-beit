
import React from 'react';
import Logo from '../Images/LOGO (2).png';

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <div className="container">
        <img src={Logo} alt="Golden Beit logo" className="logo" />
        <h1>قريباً</h1>
        <p>
          شركة Golden Beit، أول موقع متخصص في بيع وشراء الوحدات الخاصة بطروحات هيئة المجتمعات العمرانية.<br />
          ... قريبًا Golden Beit هيغير مفهوم الطروحات!
هتبيع و تشتري بطغطة واحدة!!.
        </p>
        
        <div className="footer">
          Follow us:
          <a href="#">Instagram</a> · 
          <a href="#">Facebook</a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
