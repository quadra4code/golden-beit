import React from 'react'
import image1 from '../Images/form.png';
import { FaLocationDot } from "react-icons/fa6";
import { TbRulerMeasure2 } from "react-icons/tb";

const UnitCard = ({title, area, price, onClick, key}) => {
  return (
    <div className="unit-card" key={key}>
      <img src={image1} alt="project"/>
      <div className="content">
        <h1>
          <FaLocationDot/>
          {title}
        </h1>
        <h1>
          <span className='label'><TbRulerMeasure2/></span>
          {area} متر مربع
        </h1>
        <h1 className='price'>
          <span className='label'>EGP  </span>
          {price}
        </h1>
        <button className='see_more' onClick={onClick}>التفاصيل</button>
      </div>
    </div>
  )
}

export default UnitCard