import React from 'react'
import image1 from '../Images/form.png';
import { TbRulerMeasure2 } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { BiRename } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
const UnitCard = ({title, area, price, city, project, onClick, key}) => {
  return (
    <div className="unit-card" key={key}>
      <img src={image1} alt="project"/>
      <div className="content">
        <h1>
          <BiRename/>
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