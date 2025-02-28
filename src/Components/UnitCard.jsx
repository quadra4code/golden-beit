import React from 'react'
import image1 from '../Images/form.png';
import { TbRulerMeasure2 } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { BiRename } from "react-icons/bi";
import image2 from '../Images/form.png';
import { IoLocationOutline } from "react-icons/io5";
const UnitCard = ({title, area, price, city, project, onClick, key, mainImage,isSoldOut}) => {
  return (
    <div className="unit-card" key={key}>
      {isSoldOut && <span className='sold_out'>تم البيع</span>}
      <img src={mainImage==null?image2:mainImage} alt="project"/>
      <div className="content">
        <h1>
          {title}
        </h1>
        <h1>
          <IoLocationOutline/>
          {city}
        </h1>
        <h1>
          <BsBuildings/>
          {project}
        </h1>
        <h1>
          <TbRulerMeasure2/>
          {area} متر مربع
        </h1>
        <h1 className='price'>
          <span className='label'>{price.currency} </span>
          {price.price_value}
        </h1>
        <button className='see_more' onClick={onClick}>التفاصيل</button>
      </div>
    </div>
  )
}

export default UnitCard