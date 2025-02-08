import React,{useState, useContext} from 'react'
import AppContext from '../Context/AppContext'
const Popup = () => {
  const {isOpen, setIsOpen, popupHeader, handleCheckPass, popupContent, setTestPass} = useContext(AppContext)
  return (
    <main className={`popup ${isOpen ? 'active' : ''}`}>
      <div className='popup_inner'>
        <h2>{popupHeader}</h2>
        <h4>{popupContent}</h4>
        <button onClick={()=>setIsOpen(false)}>اغلاق</button>
      </div>
    </main>
  )
}

export default Popup