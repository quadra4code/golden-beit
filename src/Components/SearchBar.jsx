import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { TbHomeFilled } from "react-icons/tb";
import axios from 'axios';
import AppContext from '../Context/AppContext';
const SearchBar = () => {
  const {handleApplySearch, openNotificationWithIcon, setLoading, setFilterData, filterData, setAllUnits}= useContext(AppContext)
  const [typeSelected, setTypeSelected] = useState(false);
  const [projectSelected, setProjectSelected] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [priceSelected, setPriceSelected] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(false);
  const [selectedProject, setSelectedProject] = useState(false);
  const [selectedCity, setSelectedCity] = useState(false);
  const [priceLabel, setPriceLabel] = useState('السعر');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const handleInputClick = (e) => {
    e.stopPropagation();
  };
  console.log(filterData);
  const handleApplyPrice = () => {
    if (minPrice && maxPrice) {
      setPriceLabel(`${minPrice} - ${maxPrice}`);
    }else{
      setPriceLabel('السعر');
    }
    setPriceSelected(false);
  };
  // const handleApplySearch = ()=> {
  //   axios.post(
  //     'https://api.goldenbeit.com/core/filter-properties',
  //     {
  //       project_id: selectedProject.id,
  //       city_id: selectedCity.id,
  //       min_price: minPrice,
  //       max_price: maxPrice,
  //     },
  //     {
  //       headers: { 'Authorization': `Bearer ${token}` },
  //     }
  //   )
  //   .then(res => {
  //     if(res.data.data.length<1){
  //       openNotificationWithIcon('error', 'عملية خاطئه ', 'لا يوجد مطابقة لبحثك')
  //       return
  //     }
  //     navigate("/all-units")
  //     console.log(res.data);
  //     setAllUnits(res.data.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }
  return (
    <>
      <section className='search-bar'>
        <IoIosSearch />
        <div className='custom-select'onClick={()=>setTypeSelected(!typeSelected)}>
          <h2>{selectedUnit.name || `نوع الوحدة`}</h2>
          <TbHomeFilled/>
          <div className={`choices ${typeSelected? 'active' : null}`} >
            {filterData &&
              filterData.unit_types.map((unitType, index) => (
                <div key={unitType.id} label={unitType.name}>
                  <span onClick={()=>setSelectedUnit(unitType)} className="option" key={unitType.id} value={unitType.name}>
                    {unitType.name} 
                  </span>
                </div>
              ))
            }
          </div>
        </div>
        <div className='custom-select'onClick={()=>setProjectSelected(!projectSelected)}>
          <h2>{selectedProject.name || `المشروع`}</h2>
          <TbHomeFilled/>
          <div className={`choices ${projectSelected? 'active' : null}`} >
            {filterData &&
              filterData.unit_types.map((projectType, index) => (
                <div key={projectType.id} label={projectType.name}>
                  {projectType.projects.map((project) => (
                    <span onClick={()=>setSelectedProject(project)} className="option" key={project.id} value={project.id}>
                      {projectType.name} {project.name}
                    </span>
                  ))}
                </div>
              ))
            }
          </div>
        </div>
        <div className='custom-select'onClick={()=>setLocationSelected(!locationSelected)}>
          <h2>{selectedCity.name || `المدينة`}</h2>
          <FaLocationDot/>
          <div className={`choices ${locationSelected? 'active' : null}`} >
            {filterData&& filterData.cities.map((city, index) => 
              <span onClick={()=>{setSelectedCity(city)}} className="option"key={index} value={city.name}>{city.name}</span>          
            )}
          </div>
        </div>
        {/* <div className='custom-select'onClick={()=>setPriceSelected(!priceSelected)}>
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
        </div> */}
        <button onClick={()=>handleApplySearch(selectedProject.id, selectedCity.id, selectedUnit.id)}>بحث</button>
      </section>
    </>
  )
}

export default SearchBar