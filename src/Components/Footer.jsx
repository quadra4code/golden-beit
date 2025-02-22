import React from 'react';
import { IoCloudDoneOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { RiTiktokFill, RiYoutubeFill } from "react-icons/ri";
import { HashLink } from 'react-router-hash-link';
import logo from '../Images/LOGO (2).png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      {/* <section className='header'>
        <h1>اذا كان لديك اى استفسار <br/> فضلا قم بالتواصل معنا</h1>
        <p>
          <span>الدردشة المباشرة مع فريق الدعم لدينا</span>
          <span><IoCloudDoneOutline/>تصفح موقعنا FAQ </span>
        </p>
        <div className="mail-us">
          <input type="email" required placeholder='ادخل موقعك الالكتروني'/>
          <input type="text" required placeholder='ادخل رسالتك'/>
          <button>ارسال</button>
        </div>
      </section> */}
      <section className='footer-links'>
        <div className='logo-slogan'>
          <img src={logo} alt="logo" />
          <span>نحن نقربك من منزل أحلامك<br/> بنقرة واحدة في كل مرة</span>
        </div>
        <ul>
          <li className='header'>ماذا عنا</li>
          <li>
            <HashLink 
              scroll={(el) => {
                const yOffset = -60; // Adjust this value to match the height of your navbar
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }}
              smooth to='/#why-us'>
                من نحن
            </HashLink>
          </li>
          <li>
            <HashLink 
              scroll={(el) => {
                const yOffset = -60; // Adjust this value to match the height of your navbar
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }}
              smooth to='/#why-us'>
                الإستشارات
            </HashLink>
          </li>
          <li><Link to='/contact-us'>تواصل معنا</Link></li>
        </ul>
        <ul>
          <li className='header'>الروابط</li>
          <li><Link to='add-new-unit'>أضف وحدتك</Link></li>
          <li><Link to='/all-units'>جميع الوحدات</Link></li>
          <li><Link to='inquiry-page'>استعلام عن الفائزين</Link></li>
          <li><Link to='/loader-board'>لوحة المتصدرين</Link></li>
        </ul>
        <ul>
          <li className='header'>Find Us</li>
          <li>Events</li>
          <li>Locations</li>
          <li>Newsletter</li>
        </ul>
        {/* <ul>
          <li className='header'>Our Social</li>
          <li>
            <a href="https://www.instagram.com/golden_beit/">Instagram</a>
            <FaInstagram/>
          </li>
          <li>
            <a href="https://www.facebook.com/golden.beit/">Facebook</a>
            <AiOutlineFacebook/> 
          </li>
          <li>
            <a href="https://www.tiktok.com/@golden_beit">TikTok</a>
            <RiTiktokFill /> 
          </li>
          <li>
            <a href="https://www.youtube.com/@Golden_Beit">Youtube</a>
            <RiYoutubeFill />
          </li>
        </ul> */}
      </section>
    </footer>
  )
}

export default Footer