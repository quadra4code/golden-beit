import React, {useState, useContext, useEffect} from 'react';
import Image from '../Images/form.png'
import { FaUser } from "react-icons/fa";
import axios from 'axios'
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../Context/AppContext';
const Login = () => {
  const navigate= useNavigate()
  const params = useParams()
  console.log(params);
  const { openNotificationWithIcon, contextHolder, loading, setLoading} = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [interestedCity, setInterestedCity] = useState('القاهرة الجديدة (سكن - جنة)');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(null);
  const [userType, setUserType] = useState("5");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [referral_code, setReferral_code] = useState(true);
  const interestedCities =[
    'القاهرة الجديدة (سكن - جنة)','بدر (إسكان متميز -متوسط)','⁠الشروق (سكن - أكثر تميز)',
    'العاشر (دار - مميز)','حدائق أكتوبر (سكن - دار - متوسط)','اكتوبر (سكن - جنة - أكثر تميز)',
    'لسادات (دار - متوسط - مميز)','دمياط (سكن - جنة - إسكان متميز)','المنصورة (إسكان متميز)',
    '⁠برج العرب (متوسط)', '⁠العلمين (سكن)','⁠العبور (روضة - أكثر تميز)','بني سويف (متوسط)',
    'الفيوم (مميز)',' ⁠المنيا (سكن - متوسط)','ملوي (مميز)','قنا (سكن - متوسط - مميز)',
    'طيبة (متوسط)','⁠أسوان (مميز)','أسيوط (سكن - متوسط - مميز)','سوهاج (مميز)','⁠أخميم (مميز)'
  ]
  useEffect(()=>{
    params.params?.length>0 ?
    setReferral_code(params.params)
    :setReferral_code(null)
  })
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      axios.post('https://golden-gate-three.vercel.app/accounts/login', {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem('referral_code', res.data.data.user.referral_code);
        localStorage.setItem('token', res.data.data.access_token);
        localStorage.setItem('name', res.data.data.user.full_name);
        localStorage.setItem('oneTimeInquiry','false');
        window.location.href = `/`
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon('error', 'عملية خاطئه', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    }else {
      axios.post('https://golden-gate-three.vercel.app/accounts/register', {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        interested_city: interestedCity,
        user_type: userType,
        password,
        confirm_password: confirmPassword,
        referral_code
      })
      .then((res) => {
        localStorage.setItem('referral_code', res.data.data.referral_code);
        localStorage.setItem('name', res.data.data.first_name);
        localStorage.setItem('token', res.data.data.access_token);
        localStorage.setItem('oneTimeInquiry','false');
        window.location.href = `/`
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon('error', 'عملية خاطئه', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  };
  return (
    <main className='login-page'>
      {contextHolder}
      <img src={Image} alt="login-background" />
      <div className='opacity'>
        <div className="login-form-box">
          <div className='tabs'>
            <div className={isLogin? 'tab active' : 'tab'} onClick={()=>setIsLogin(true)}>تسجيل الدخول</div>
            <div className={!isLogin? 'tab active' : 'tab'}onClick={()=>setIsLogin(false)}>انشاء حساب</div>
          </div>
          <form onSubmit={handleSubmitLogin}>
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
                  <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="hello@domain.com" />
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
                  <select required onChange={(e)=>setUserType(e.target.value)} name="" id="">
                    <option value="5">مشتري</option>
                    <option value="6">بائع</option>
                    <option value="7">وسيط</option>
                  </select>
                </div>
                <div className="input-box">
                  <div className='label'>
                    <RiLockPasswordFill />
                    <p> أكثر مدينة مهتم بها :</p>
                  </div>
                  <select onChange={(e)=>setInterestedCity(e.target.value)} name="" id="">
                  {interestedCities.map((index, key)=>
                  <option key={key} value={index}>{index}</option>
                  )}
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
            <button disabled={loading} className='submit_form' >{loading ? 'جاري التحميل...' : 'تسجيل الدخول'}</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login