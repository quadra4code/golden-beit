import React, { useRef, useState } from 'react';
import Popup from '../Components/Popup';

const ScreenShare = () => {
  const videoRef = useRef(null); // Reference to the video element
  const [isSharing, setIsSharing] = useState(false); // State to track screen sharing
  const [inpPass, setInpPass] = useState()
  const startScreenShare = async () => {
    try {
      if(inpPass!=='3126531265#'){
        return
      }
      // Request screen capture
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false, // Set to true if you want to share audio as well
      });
      // Set the stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsSharing(true);
      // Handle when the user stops sharing
      stream.getTracks().forEach((track) => {
        track.onended = () => {
          setIsSharing(false);
        };
      });
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };
  return (
    <>
      <div className='share-screen-container'>
        <div className='header'>
          <button onClick={startScreenShare} disabled={isSharing}>
            {isSharing ? 'Sharing...' : 'بدء عرض الشاشة'}
          </button>
          <input onChange={(e)=>{setInpPass(e.target.value)}} type='password' className='pass' />
        </div>
        <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%' }} />
        <iframe width="100%" height="709" src="https://www.youtube.com/embed/SVOnXcVgIoI" title="اجراء القرعة العلنية اليدوية لتخصيص الوحدات السكنية يوم 8 فبراير 2025" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
};

export default ScreenShare;
