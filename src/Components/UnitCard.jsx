import React from 'react'
import image1 from '../Images/form.png';
import { TbRulerMeasure2 } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { Gi3dStairs } from "react-icons/gi";
import image2 from '../Images/form.png';
import { IoLocationOutline } from "react-icons/io5";
const UnitCard = ({title, proposal, area, floor, over_price_obj, total_price_obj, city, project, onClick, addFav, key, mainImage,isSoldOut}) => {
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
        {floor&&
          <h1>
            <Gi3dStairs />
            {floor}
          </h1>
        }
        <h1>
          <TbRulerMeasure2/>
          {area} متر مربع
        </h1>
        <h1 className='price'>
          <span className='price-type'>{over_price_obj.price_type} :</span>
          {over_price_obj.price_value}
          <span className='label'>{over_price_obj.currency}</span>
        </h1>
        <h1 className='price'>
          <span className='price-type'>{total_price_obj.price_type} :</span>
          {total_price_obj.price_value}
          <span className='label'>{total_price_obj.currency}</span>
        </h1>
        <div className="btns">
          <button className='see_more' onClick={onClick}>التفاصيل</button>
          <button className='see_more' onClick={addFav}><FaRegHeart/></button>
        </div>
      </div>
    </div>
  )
}

export default UnitCard