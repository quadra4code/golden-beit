import React, {useState} from 'react';
import Image from '../Images/form.png'
import { FaUser } from "react-icons/fa";
import axios from 'axios'
import { RiLockPasswordFill } from "react-icons/ri";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log(isLogin)
    isLogin? 
    axios.post('https://golden-gate-three.vercel.app/accounts/login',{
      username,
      password
    })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
    :
    axios.post('https://golden-gate-three.vercel.app/accounts/register',{
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      user_type: userType,
      password,
      confirm_password:confirmPassword
    })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }
  return (
    <main className='login-page'>
      <img src={Image} alt="login-background" />
      <div className='opacity'>
        <div className="login-form-box">
          <div className='tabs'>
            <div className={isLogin? 'tab active' : 'tab'} onClick={()=>setIsLogin(true)}>تسجيل الدخول</div>
            <div className={!isLogin? 'tab active' : 'tab'}onClick={()=>setIsLogin(false)}>انشاء حساب</div>
          </div>
          <form onSubmit={handleSubmit}>
            {isLogin 
            ?
            <>
              <div className="input-box">
                <div className='label'>
                  <FaUser />
                  <p>رقم الهاتف :</p>
                </div>
                <input onChange={(e)=>setUsername(e.target.value)} type="text" required placeholder="رقم الهاتف" />
              </div>
              <div className="input-box">
                <div className='label'>
                  <RiLockPasswordFill />
                  <p>الرقم السرى :</p>
                </div>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" required placeholder="*********" />
              </div>
            </>
            :
            <>
              <div className='col'>
                <div className="input-box">
                  <div className='label'>
                    <FaUser />
                    <p>الأسم الأول :</p>
                  </div>
                  <input onChange={(e)=>setFirstName(e.target.value)} type="text" required placeholder="الاسم الأول" />
                </div>
                <div className="input-box">
                  <div className='label'>
                    <FaUser />
                    <p>الأسم الأخير :</p>
                  </div>
                  <input onChange={(e)=>setLastName(e.target.value)} type="text" placeholder="الاسم الأخير" />
                </div>
                <div className="input-box">
                  <div className='label'>
                    <RiLockPasswordFill />
                    <p> البريد الالكترونى :</p>
                  </div>
                  <input onChange={(e)=>setEmail(e.target.value)} type="password" placeholder="hello@domain.com" />
                </div>
                <div className="input-box">
                  <div className='label'>
                    <RiLockPasswordFill />
                    <p> رقم الهاتف :</p>
                  </div>
                  <input onChange={(e)=>setUsername(e.target.value)} type="text" required placeholder="01234567891" />
                </div>
              </div>
              <div className='col'>
                <div className="input-box">
                  <div className='label'>
                    <RiLockPasswordFill />
                    <p> نوع الحساب :</p>
                  </div>
                  <select onChange={(e)=>setUserType(e.target.value)} name="" id="">
                    <option value="5">مشتري</option>
                    <option value="6">بائع</option>
                    <option value="7">وسيط</option>
                  </select>
                </div>
                <div className="input-box">
                  <div className='label'>
                    <RiLockPasswordFill />
                    <p>الرقم السرى :</p>
                  </div>
                  <input onChange={(e)=>setPassword(e.target.value)} type="password" required placeholder="*********" />
                </div>
                <div className="input-box">
                  <div className='label'>
                    <RiLockPasswordFill />
                    <p> تأكيد الرقم السرى :</p>
                  </div>
                  <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" required placeholder="*********" />
                </div>
              </div>
            </>
            }
            <button onClick={handleSubmit} className='submit_form' >دخول</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login