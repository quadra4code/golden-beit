import React, {useState, useContext, useEffect} from 'react';
import Image from '../Images/form.png'
import { FaUser } from "react-icons/fa";
import axios from 'axios'
import { RiLockPasswordFill, RiPhoneFill  } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import { MdAlternateEmail } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { MdLocationCity } from "react-icons/md";
const Login = () => {
  const params = useParams()
  const { isLogin, setIsLogin, userType, setUserType, openNotificationWithIcon, contextHolder, loading, setLoading, filterData} = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [interestedCity, setInterestedCity] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(null);
  // const [userType, setUserType] = useState("5");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(null);
  // const [isLogin, setIsLogin] = useState(true);
  const [referral_code, setReferral_code] = useState(true);
  console.log(userType);
  useEffect(()=>{
    params.params?.length>0 ?
    setReferral_code(params.params)
    :setReferral_code(null)
  })
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      axios.post('https://api.goldenbeit.com/accounts/login', {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem('user_image_url', res.data.data.user.image_url);
        localStorage.setItem('referral_code', res.data.data.user.referral_code);
        localStorage.setItem('golden-beit-website-token', res.data.data.access_token);
        localStorage.setItem('name', res.data.data.user.full_name);
        localStorage.setItem('oneTimeInquiry','false');
        console.log(res);
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
      axios.post('https://api.goldenbeit.com/accounts/register', {
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
        localStorage.setItem('user_image_url', res.data.data.image_url);
        localStorage.setItem('referral_code', res.data.data.referral_code);
        localStorage.setItem('name', res.data.data.first_name);
        localStorage.setItem('golden-beit-website-token', res.data.data.access_token);
        localStorage.setItem('oneTimeInquiry','false');
        window.location.href = `/`
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon('error', 'عملية خاطئه', err.response.data.msg);
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
                <RiPhoneFill />
                <input onChange={(e)=>setUsername(e.target.value)} type="text" required placeholder="رقم الهاتف" />
              </div>
              <div className="input-box">
                <RiLockPasswordFill />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" required placeholder="كلمة المرور" />
              </div>
            </>
            :
            <>
              <div className="input-box">
                <FaUser />
                <input onChange={(e)=>setFirstName(e.target.value)} type="text" required placeholder="الاسم الأول" />
              </div>
              <div className="input-box">
                <FaUser />
                <input onChange={(e)=>setLastName(e.target.value)} type="text" placeholder=" الاسم الاخير (اختيارى)" />
              </div>
              <div className="input-box">
                <MdAlternateEmail />
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder=" البريد الالكترونى (اختيارى)" />
              </div>
              <div className="input-box">
                <RiPhoneFill />
                <input onChange={(e)=>setUsername(e.target.value)} type="text" required placeholder="رقم الهاتف" />
              </div>
              <div className="input-box">
                <RiLockPasswordFill />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" required placeholder="كلمة المرور" />
              </div>
              <div className="input-box">
                <RiLockPasswordFill />
                <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" required placeholder="تأكيد كلمة المرور " />
              </div>
              <div className="input-box">
                <MdManageAccounts />
                <select value={userType} required onChange={(e)=>setUserType(e.target.value)} name="" id="">
                  <option style={{color:'#ddd'}} value="نوع الحساب" disabled hidden selected>نوع الحساب</option>
                  <option value="5">مشتري</option>
                  <option value="6">بائع</option>
                  <option value="7">وسيط</option>
                </select>
              </div>
              <div className="input-box">
                <MdLocationCity />
                <select onChange={(e)=>setInterestedCity(e.target.value)} name="" id="">
                  <option selected disabled hidden value="أكثر مدينة مهتم بها ">أكثر مدينة مهتم بها (اختيارى)</option>
                {filterData&& filterData.cities.length>0&& filterData.cities.map((city)=>
                <option key={city.id} value={city.id}>{city.name}</option>
                )}
                </select>
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