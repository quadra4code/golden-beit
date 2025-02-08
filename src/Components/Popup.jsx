import React,{useState, useContext} from 'react'
import AppContext from '../Context/AppContext'
const Popup = () => {
  const {isOpen, setIsOpen, popupHeader, handleCheckPass, popupContent, setTestPass} = useContext(AppContext)
  return (
    <main className={`popup ${isOpen ? 'active' : ''}`}>
      <div className='popup_inner'>
        {popupHeader&&popupContent ?
        <>
          <h2>{popupHeader}</h2>
          <h4>{popupContent}</h4>
        </>
        :
        <>
          <input type="password" onChange={(e)=>setTestPass(e.target.value)} placeholder='ادخل الرقم السري'/>
        </>
        }
        {
          popupHeader&&popupContent ?
          <button onClick={()=>setIsOpen(false)}>اغلاق</button>
          :
          <button onClick={handleCheckPass}>تم</button>
        }
      </div>
    </main>
  )
}

export default Popup