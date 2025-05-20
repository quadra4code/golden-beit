import React,{ useContext, useState } from 'react';
import axios from 'axios';
import AppContext from '../../Context/AppContext';
const AccountSafety = () => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const { token, notificationRef, handleUnAuth } = useContext(AppContext)
  const handleChangePassReq = () => {
    axios
    .post('https://api.goldenbeit.com/accounts/change-password',
      {
        old_password: oldPass,
        new_password: newPass,
        confirm_new_password: confirmPass
      },
      {headers: { 'Authorization': `Bearer ${token}` },}
    )
    .then((res) => {
      console.log(res.data);
      notificationRef.current.show('success','تم تغيير كلمة المرور بنجاح')
    })
    .catch((err) => {
      if(err.status===401){
        handleUnAuth()
      }
      console.log(err.status);
    });
  }
  return (
    <section className='account-safety'>
      <form className='change-pass'>
        <input type='password' onChange={(e)=>setOldPass(e.target.value)} placeholder='كلمة المرور الحالية'/>
        <input type='password' onChange={(e)=>setNewPass(e.target.value)} placeholder='كلمة المرور الجديدة'/>
        <input type='password' onChange={(e)=>setConfirmPass(e.target.value)} placeholder='تأكيد كلمة المرور الجديدة'/>
        <button onClick={handleChangePassReq} className='pass-btn'>تغيير كلمة المرور</button>
      </form>
    </section>
  )
}

export default AccountSafety