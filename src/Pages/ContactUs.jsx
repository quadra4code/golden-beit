import React, { useState } from 'react';
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { RiTiktokFill, RiYoutubeFill } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };
  return (
    <div className="contact-us-container">
      <h1 className="contact-us-title">تواصل معنا</h1>
      <div className="cols-container">
        <form className="contact-us-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">رقم الهاتف</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">البريد الالكتروني (اختيارى)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">رسالتك</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">إرسال</button>
        </form>
        <div className="social">
          <a className='our-contact-ways' href='tel:+201040333703'>
            <FiPhone/>
            01040333703
          </a>
          <a className='our-contact-ways' href='mailto:info@goldenbeit.com'>
            <MdOutlineMail/>
            info@goldenbeit.com
          </a>
          <span className='our-contact-ways'>
            <IoLocationOutline/>
            العنوان هنا يتم كتابته
          </span>
          <div className='social-links'>
            <a href="https://www.instagram.com/golden_beit/"><FaInstagram/></a>
            <a href="https://www.facebook.com/golden.beit/"><AiOutlineFacebook/></a>
            <a href="https://www.tiktok.com/@golden_beit"><RiTiktokFill /></a>
            <a href="https://www.youtube.com/@Golden_Beit"><RiYoutubeFill /></a>
          </div>
          <h2>GoldenBeit</h2>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;