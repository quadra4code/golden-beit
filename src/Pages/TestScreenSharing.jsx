import React, { useRef, useState, useContext } from 'react';
import AppContext from '../Context/AppContext';
import Popup from '../Components/Popup';

const ScreenShare = () => {
  const {setIsOpen, authDone} = useContext(AppContext)
  const videoRef = useRef(null); // Reference to the video element
  const [isSharing, setIsSharing] = useState(false); // State to track screen sharing
  const startScreenShare = async () => {
    if (!authDone) return setIsOpen(true);
  };
  return (
    <>
      <Popup/>
      <div className='share-screen-container'>
        <button onClick={startScreenShare} disabled={isSharing}>
          {isSharing ? 'Sharing...' : 'بدء عرض الشاشة'}
        </button>
        <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%' }} />
        <iframe width="100%" height="709" src="https://www.youtube.com/embed/pc-dAFilXYk" title="كيف تحولت من تارك للصلاة إلى متلذذ بالصلاة؟" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
};

export default ScreenShare;