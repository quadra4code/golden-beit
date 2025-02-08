import axios from 'axios';
import React, {createContext, useState, useEffect, useRef} from 'react';
const AppContext = createContext();
export const AppProvider = ({children}) => {
  const [popupContent, setPopupContent] = useState('')
  const [popupHeader, setPopupHeader] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [singleUnit, setSingleUnit] = useState();
  const [filterData, setFilterData] = useState();
  console.log(popupContent, popupHeader);
  const token = localStorage.getItem('token')
  useEffect(()=>{
    axios.get('https://golden-gate-three.vercel.app/core/get-form-data',
      {headers: {'Authorization': `Bearer ${token}`}}
    )
    .then(response => {
      setFilterData(response.data.data)
      console.log(response.data.data);
      
    })
    .catch(error => console.error(error))
  },[])
  return (
    <AppContext.Provider 
      value={{isOpen, setIsOpen, popupContent,
      setPopupContent, popupHeader, setPopupHeader ,setSingleUnit,singleUnit,
      filterData, setFilterData 
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext