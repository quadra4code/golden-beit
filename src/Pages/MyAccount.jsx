import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { FaRegUser , FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { BsBuildings, BsInfoCircle  } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from 'axios';
import Loader from '../Components/Loader';
import ErrorPage from './ErrorPage';
import AppContext from '../Context/AppContext';
import { useQuery } from "@tanstack/react-query";
const MyAccount = () => {
  const pathname = window.location.pathname;
  const { handleLogout } = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <main className='my-account'>
      <div className="container">
        <section className='side-nav'>
          <h1>حسابي</h1>
          <div 
            onClick={()=>navigate('account-details')} 
            className={`${pathname==='/my-account/account-details'? 'active' : ''} choice`}
          >
            <FaRegUser />
            <span>المعلومات الشخصية</span>
          </div>
          <div 
            onClick={()=>navigate('account-safety')} 
            className={`${pathname==='/my-account/account-safety'? 'active' : ''} choice`}
          >
            <RiLockPasswordLine />
            <span>الأمان</span>
          </div>
          <div 
            onClick={()=>navigate('account-orders')} 
            className={`${pathname==='/my-account/account-orders'? 'active' : ''} choice`} 
          >
            <FiShoppingBag/>
            <span>طلباتي</span>
          </div>
          <div 
            onClick={()=>navigate('account-units')}
            className={`${pathname==='/my-account/account-units'? 'active' : ''} choice`}
          >
            <BsBuildings/>
            <span>وحداتي</span>
          </div>
          <div 
            onClick={()=>navigate('favorites')}
            className={`${pathname==='/my-account/account-favorite'? 'active' : ''} choice`}
          >
            <FaRegHeart />
            <span>المفضلة</span>
          </div>
          <div 
            onClick={()=>navigate('usage-policy')}
            className={`${pathname==='/my-account/usage-policy'? 'active' : ''} choice`}
          >
            <BsInfoCircle/>
            <span>سياسة الاستخدام</span>
          </div>
          <div className='choice' onClick={handleLogout}>
            <BiLogOut/>
            <span>تسجيل الخروج</span>
          </div>
        </section>
        <section className='content'><Outlet/></section>
      </div>
    </main>
  )
}

export default MyAccount