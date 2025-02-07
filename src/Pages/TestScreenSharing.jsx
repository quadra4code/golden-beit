import React, { useRef, useState } from 'react';

const ScreenShare = () => {
  const videoRef = useRef(null); // Reference to the video element
  const [isSharing, setIsSharing] = useState(false); // State to track screen sharing

  // Function to start screen sharing
  const startScreenShare = async () => {
    try {
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
    <div>
      <h1>Screen Sharing Demo</h1>
      <button onClick={startScreenShare} disabled={isSharing}>
        {isSharing ? 'Sharing...' : 'Start Screen Share'}
      </button>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '800px' }} />
    </div>
  );
};

export default ScreenShare;