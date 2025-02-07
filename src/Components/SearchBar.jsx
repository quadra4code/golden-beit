import React, {useState} from 'react';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { TbHomeFilled } from "react-icons/tb";
const SearchBar = () => {
  const [typeSelected, setTypeSelected] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [priceSelected, setPriceSelected] = useState(false);
  const [typeLabel, setTypeLabel] = useState('النوع');
  const [locationLabel, setLocationLabel] = useState('الموقع');
  const [priceLabel, setPriceLabel] = useState('السعر');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [types,setTypes]=useState(
    ['شقة', 'فيلا', 'مكتب', 'محل', 'أرض']
  ); 
  const [locations,setLocations]=useState(
    ['شقة', 'فيلا', 'مكتب', 'محل', 'أرض']
  ); 
  const handleInputClick = (e) => {
    e.stopPropagation();
  };
  const handleApplyPrice = () => {
    if (minPrice && maxPrice) {
      setPriceLabel(`${minPrice} - ${maxPrice}`);
    }else{
      setPriceLabel('السعر');
    }
    setPriceSelected(false);
  };
  return (
    <>
      <section className='search-bar'>
        <IoIosSearch />
        <div className='custom-select'onClick={()=>setTypeSelected(!typeSelected)}>
          <h2>{typeLabel}</h2>
          <TbHomeFilled/>
          <div className={`choices ${typeSelected? 'active' : null}`} >
            {types.map((type, index) => 
              <span className="option" key={index} value={type} onClick={()=>setTypeLabel(type)}>{type}</span>          
            )}
          </div>
        </div>
        <div className='custom-select'onClick={()=>setLocationSelected(!locationSelected)}>
          <h2>{locationLabel}</h2>
          <FaLocationDot/>
          <div className={`choices ${locationSelected? 'active' : null}`} >
            {locations.map((location, index) => 
              <span className="option"key={index} value={location} onClick={()=>setLocationLabel(location)}>{location}</span>          
            )}
          </div>
        </div>
        <div className='custom-select'onClick={()=>setPriceSelected(!priceSelected)}>
          <h2>{priceLabel}</h2>
          <RiMoneyDollarCircleFill/>
          <div className={`choices ${priceSelected? 'active' : null}`} >
            <input
              type="number"
              placeholder='من'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onClick={handleInputClick} 
            />
            <input
              type="number"
              placeholder='إلى'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onClick={handleInputClick} 
            />
            <button className='apply-price' onClick={handleApplyPrice}>Apply</button>
          </div>
        </div>
        <button>بحث</button>
      </section>
    </>
  )
}

export default SearchBar