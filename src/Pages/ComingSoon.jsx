
import React from 'react';
import Logo from '../Images/LOGO (2).png';

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <div className="container">
        <img src={logo} alt="Golden Beit logo" className="logo" />
        <h1>Coming Soon</h1>
        <p>
          Something extraordinary is being forged in silence.<br />
          Stay close... the gold is about to shine.
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