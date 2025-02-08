import axios from 'axios';
import React, {createContext, useState, useEffect, useRef} from 'react';
const AppContext = createContext();
export const AppProvider = ({children}) => {
  const [popupContent, setPopupContent] = useState('')
  const [popupHeader, setPopupHeader] = useState('')
  const [testPass, setTestPass] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [authDone, setAuthDone] = useState(false);
  const [singleUnit, setSingleUnit] = useState();
  const [filterData, setFilterData] = useState();
  const shareScreenPass = '3126531265#';
  const videoRef = useRef(null); // Reference to the video element
  const [isSharing, setIsSharing] = useState(false); // State to track screen sharing
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
  const startSharing = async()=>{
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
  }
  const handleCheckPass = ()=> {
    if(testPass===shareScreenPass){
      setIsOpen(false)
      setAuthDone(true)
      console.log(authDone);
      startSharing()
    }else{
      setIsOpen(false)
      setAuthDone(false)
    }
  }
  return (
    <AppContext.Provider 
      value={{isOpen, setIsOpen, popupContent,
      setPopupContent, popupHeader, setPopupHeader ,setSingleUnit,singleUnit,
      filterData, setFilterData ,shareScreenPass,startSharing,
      setTestPass, testPass, handleCheckPass,setAuthDone
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext