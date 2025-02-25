import React,{useState, useContext} from 'react'
import AppContext from '../Context/AppContext'
import StarRating from './StarRating';
import axios from 'axios';
const Popup = () => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const {isNormalPop, isOpen, setIsOpen, popupHeader, isReview, token, handleUnAuth,
        popupContent, openNotificationWithIcon, setIsNormalPop,reviewMessage,setPopupHeader,
        handleAddReview,setIsReview, setReviewMessage,setRating,changePassUi, setChangePassUi} = useContext(AppContext);
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
  const handleChangePassReq = () => {
    axios
    .post('https://golden-gate-three.vercel.app/accounts/change-password',
      {
        old_password: oldPass,
        new_password: newPass,
        confirm_new_password: confirmPass
      },
      {headers: { 'Authorization': `Bearer ${token}` },}
    )
    .then((res) => {
      console.log(res.data);
      setChangePassUi(false);
      setIsOpen(false)
      setPopupHeader('')  
      openNotificationWithIcon('success','تم تغيير كلمة المرور بنجاح')
    })
    .catch((err) => {
      if(err.status===401){
        handleUnAuth()
      }
      console.log(err.status);
    });
  }
  if(isReview){
    return (
    <main className={`popup ${isOpen ? 'active' : ''}`}>
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
          <button onClick={handleClose} className='close-btn'>اغلاق</button>
        </div>
      </div>
    </main>
    )
  }
  if(changePassUi){
    return (
      <main className={`popup ${isOpen ? 'active' : ''}`}>
        <div className='popup_inner'>
          <h2>{popupHeader}</h2>
          <form className='change-pass' onSubmit={handleChangePassReq}>
            <input type='password' onChange={(e)=>setOldPass(e.target.value)} placeholder='كلمة المرور الحالية'/>
            <input type='password' onChange={(e)=>setNewPass(e.target.value)} placeholder='كلمة المرور الجديدة'/>
            <input type='password' onChange={(e)=>setConfirmPass(e.target.value)} placeholder='تأكيد كلمة المرور الجديدة'/>
          </form>
          <div className="btns">
            <button onClick={handleChangePassReq} className='rate-btn'>تغيير كلمة المرور</button>
            <button onClick={handleClose} className='close-btn'>اغلاق</button>
          </div>
        </div>
      </main>
    )
  }
  else{
    return (
      <main className={`popup ${isOpen ? 'active' : ''}`}>
        {/* {isReview? 
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
        } */}
        <div className='popup_inner'>
          <h2>{popupHeader}</h2>
          <div className='wrapper'>
            <span onClick={isNormalPop? handleCopy:null}>{popupContent}</span>
          </div>
          <div className='btns'>
            <button onClick={handleClose} className='close-btn'>اغلاق</button>
          </div>
        </div>
      </main>
    )
  }
}

export default Popup