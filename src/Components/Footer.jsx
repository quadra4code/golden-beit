import React from 'react';
import { IoCloudDoneOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import backgroundImage from '../Images/article.png';
import logo from '../Images/logo3.png';
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
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
            <li> <FaInstagram/>Our Social</li>
            <li><AiOutlineFacebook/> Facebook</li>
            <li><RiTwitterXFill/> Twitter</li>
          </ul>
          <div className='logo-slogan'>
            <img src={logo} alt="logo" />
            <span>نحن نقربك من منزل أحلامك<br/> بنقرة واحدة في كل مرة</span>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer