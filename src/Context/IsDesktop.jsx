import React, { createContext, useState, useEffect } from 'react';
const IsDesktop = createContext();
export const DesktopProvider = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', updateMedia);
    return () => {
      window.removeEventListener('resize', updateMedia);
    };
  }, []);
  return (
    <IsDesktop.Provider value={{ isDesktop }}>
      {children}
    </IsDesktop.Provider>
  );
};

export default IsDesktop;
