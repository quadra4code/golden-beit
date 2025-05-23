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
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const Login = () => {
  const params = useParams()
  const { isLogin, setIsLogin, userType, setUserType, notificationRef, loading, setLoading, filterData} = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [interestedCity, setInterestedCity] = useState();
  const [defCountry, setDefCountry] = useState('eg');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(null);
  const [isValid, setIsValid] = useState(false);
  // const [userType, setUserType] = useState("5");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [isLogin, setIsLogin] = useState(true);
  const [referral_code, setReferral_code] = useState(true);
  // console.log(userType);
  useEffect(()=>{
    params.params?.length>0 ?
    setReferral_code(params.params)
    :setReferral_code(null)
  })
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isLogin && password !== confirmPassword) {
      notificationRef.current.show('error', 'خطأ', 'كلمتا المرور غير متطابقتين');
      return;
    }
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
        notificationRef.current.show('error', 'عملية خاطئه',err.response.data.msg);
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
        notificationRef.current.show('error', 'عملية خاطئه', err.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  };
  // const countryLengths = {
  //   eg: 12,
  //   sa: 12,
  //   ae: 12,
  //   qa: 10,
  //   bh: 11,
  //   kw: 11,
  // };
  const countryLengths = {
    eg: 10,
    sa: 9,
    ae: 9,
    qa: 7,
    bh: 8,
    kw: 8,
  };
  const handlePhoneChange = (value, countryData) => {
    const countryCode = countryData?.countryCode;
    const dialCode = countryData?.dialCode;
    // Better phone number processing
    // let phoneWithoutDialCode = value;
    //  Remove country code if present (more robust handling)
    // if (dialCode && value.startsWith(`+${dialCode}`)) {
    //   phoneWithoutDialCode = value.slice(dialCode.length ); // +1 for the '+' sign
    // }
    // console.log('Processed number:', phoneWithoutDialCode);
    setDefCountry(countryCode);
    const maxLength = countryLengths[countryCode] || 0;
    const isValidLength = value.slice(dialCode.length).length === maxLength;
    setIsValid(isValidLength);
    // Only update if number is valid length or empty
    if (value.slice(dialCode.length).length <= maxLength) {
      setUsername(value);
    }
  };
  return (
    <main className='login-page'>
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
              {firstName.length > 0 && firstName.length < 3 && (
                <p style={{ color: 'red', fontSize:'13px' }}>يجب أن يكون الإدخال 3 أحرف على الأقل</p>
              )}
              <div className="input-box">
                <FaUser />
                <input onChange={(e)=>setLastName(e.target.value)} type="text" placeholder=" الاسم الاخير (اختيارى)" />
              </div>
              {lastName.length > 0 && lastName.length < 3 && (
                <p style={{ color: 'red', fontSize:'13px' }}>يجب أن يكون الإدخال 3 أحرف على الأقل</p>
              )}
              <div className="input-box">
                <MdAlternateEmail />
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder=" البريد الالكترونى (اختيارى)" />
              </div>
              <div className="input-box">
                <RiPhoneFill />
                <PhoneInput
                  country={defCountry} // Default country (Egypt)
                  onlyCountries={['eg', 'sa', 'ae', 'qa', 'bh', 'kw']}
                  value={username}
                  onChange={handlePhoneChange }
                  inputProps={{
                    required: true,
                    name: 'phone',
                    placeholder: 'رقم الهاتف',
                  }}
                  containerStyle={{ direction: 'ltr',  }}
                  // inputStyle={{ width: '100%', paddingLeft: '48px', direction: 'ltr' }}
                  buttonStyle={{ direction: 'ltr' }}
                />
                {/* <input onChange={(e)=>setUsername(e.target.value)} type="text" required placeholder="رقم الهاتف" /> */}
              </div>
                <span
                style={{
                  fontSize: '13px',
                  color:  'red',
                }}
              >
                {!isValid
                  ? `رقم هاتف غير صحيح`
                  : ''}
              </span>
              {/* {username.length > 0 && username.length < 6 && (
                <p style={{ color: 'red', fontSize:'13px' }}>يجب أن يكون الإدخال 6 أحرف على الأقل</p>
              )} */}
              <div className="input-box">
                <RiLockPasswordFill />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" required placeholder="كلمة المرور" />
              </div>
              {password.length > 0 && password.length < 6 && (
                <p style={{ color: 'red', fontSize:'13px' }}>يجب أن يكون الإدخال 6 أحرف على الأقل</p>
              )}
              <div className="input-box">
                <RiLockPasswordFill />
                <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" required placeholder="تأكيد كلمة المرور " />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p style={{ color: 'red', fontSize:'13px' }}>كلمتا المرور غير متطابقتين</p>
              )}
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