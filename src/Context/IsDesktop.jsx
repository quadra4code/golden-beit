import React, { createContext, useState, useEffect } from 'react';
const IsDesktop = createContext();
export const DesktopProvider = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1056);
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 786);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 520);
  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 1056);
      setIsLaptop(window.innerWidth >= 786);
      setIsTablet(window.innerWidth >= 520);
    };
    window.addEventListener('resize', updateMedia);
    return () => {
      window.removeEventListener('resize', updateMedia);
    };
  }, []);
  return (
    <IsDesktop.Provider value={{ isDesktop, isLaptop, isTablet }}>
      {children}
    </IsDesktop.Provider>
  );
};

export default IsDesktop;
