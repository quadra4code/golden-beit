import React,{useState, useContext} from 'react'
import AppContext from '../Context/AppContext'
import StarRating from './StarRating';
const Popup = () => {
  const {isNormalPop, isOpen, setIsOpen, popupHeader, isReview, 
        popupContent, openNotificationWithIcon, setIsNormalPop,reviewMessage,
        handleAddReview,setIsReview, setReviewMessage,setRating} = useContext(AppContext);
  const handleCopy = () => {
    navigator.clipboard.writeText(popupContent).then(() => {
      openNotificationWithIcon('success','تم نسخ اللينك بنجاح',)
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  const handleClose = ()=> {
    setIsOpen(false)
    setIsNormalPop(false)
    setIsReview(false)
    setRating(0)
    setReviewMessage('')
  }
  return (
    <main className={`popup ${isOpen ? 'active' : ''}`}>
      {isReview? 
      <div className='popup_inner'>
        <h2>{popupHeader}</h2>
        <div className='review-us'>
          <StarRating/>
          <textarea 
          cols='35' rows='6'
          value={reviewMessage}
          placeholder='اكتب تقييمك'
          onChange={(e)=>setReviewMessage(e.target.value)}
          />
        </div>
        <div className="btns">
          <button onClick={handleAddReview} className='rate-btn'>تقييم</button>
          <button onClick={handleClose}>اغلاق</button>
        </div>
      </div>
      :
      <div className='popup_inner'>
        <h2>{popupHeader}</h2>
        <p>
          <span onClick={isNormalPop? handleCopy:null}>{popupContent}</span>
        </p>
        <button onClick={handleClose}>اغلاق</button>
      </div>
      }
    </main>
  )
}

export default Popup