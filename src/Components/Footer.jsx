import React from 'react';
import { IoCloudDoneOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { RiTwitterXFill, RiTiktokFill } from "react-icons/ri";
import logo from '../Images/LOGO (2).png';
const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <section className='header'>
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
      </section>
      <section className='footer-links'>
        <ul>
          <li className='header'>About</li>
          <li>OurStory</li>
          <li>Careers</li>
          <li>Our Team</li>
          <li>Resources</li>
        </ul>
        <ul>
          <li className='header'>Support</li>
          <li>FAQ</li>
          <li>Contact Us</li>
          <li>Help Center</li>
          <li>Terms Of Services</li>
        </ul>
        <ul>
          <li className='header'>Find Us</li>
          <li>Events</li>
          <li>Locations</li>
          <li>Newsletter</li>
        </ul>
        <ul>
          <li className='header'>Our Social</li>
          <li> <FaInstagram/><a href="https://www.instagram.com/golden_beit/">Instagram</a></li>
          <li><AiOutlineFacebook/> <a href="https://www.facebook.com/golden.beit/">Facebook</a></li>
          <li><RiTiktokFill /> <a href="https://www.tiktok.com/@golden_beit">TikTok</a></li>
          <li><RiTwitterXFill/> <a href="https://www.youtube.com/@Golden_Beit">Youtube</a></li>
        </ul>
        <div className='logo-slogan'>
          <img src={logo} alt="logo" />
          <span>نحن نقربك من منزل أحلامك<br/> بنقرة واحدة في كل مرة</span>
        </div>
      </section>
    </footer>
  )
}

export default Footer