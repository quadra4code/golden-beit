import React from 'react';
import { IoIosArrowDown, IoIosCall } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../Images/LOGO (2).png'
const Navbar = () => {
  return (
    <nav className='top-nav'>
      <div className="top-sec">
        <Link to='/login'>
          <IoIosArrowDown/>
          <span>تسجيل الدخول</span>
          <FaUserAlt/>
        </Link>
        <Link to='#'>
          <span>اتصل بنا</span>
          <IoIosCall/>
        </Link>
      </div>
      <div className="bottom-sec">
        <div className="links-holder">
          <Link to='/'>الرئيسية</Link>
          <Link to='#'>الاستشارات</Link>
          <Link to='#'>من نحن</Link>
          <Link to='units'>
            <span>الوحدات</span>
            {/* <IoIosArrowDown/> */}
          </Link>
          <Link to='/share-screen'>
            <span>نتائج القرعة</span>
            {/* <span>الخدمات</span>
            <IoIosArrowDown/> */}
          </Link>
        </div>
        <img src={logo} alt="logo" />
      </div>
    </nav>
  )
}

export default Navbar