import { useState } from "react";
import { FaPhone, FaWhatsapp, FaTimes, FaCommentDots } from "react-icons/fa";
const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='contactContainer'>
      {isOpen && (
        <div className='contactOptions'>
          <a href="tel:+201040333703" className='contactBtn phone'>
            <FaPhone size={24} />
          </a>
          <a href="https://wa.me/+201040333703" className='contactBtn whatsapp'>
            <FaWhatsapp size={26} />
          </a>
          <button onClick={() => setIsOpen(false)} className='contactBtn close'>
            <FaTimes size={20} />
          </button>
        </div>
      )}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className='mainButton'>
          <FaCommentDots size={24} />
        </button>
      )}
    </div>
  );
};

export default ContactButton;
