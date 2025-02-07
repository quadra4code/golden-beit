import React, {createContext, useState} from 'react';
const AppContext = createContext();
export const AppProvider = ({children}) => {
  const [popupContent, setPopupContent] = useState('')
  const [popupHeader, setPopupHeader] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  console.log(popupContent, popupHeader);
  return (
    <AppContext.Provider 
      value={{isOpen, setIsOpen, popupContent,
      setPopupContent, popupHeader, setPopupHeader 
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext