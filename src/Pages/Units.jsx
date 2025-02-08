import React, {useEffect, useState, useContext} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Slider from 'rc-slider';
import unitImage from '../Images/form.png'; 
import axios from 'axios';
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
const Units = () => {
  const token = localStorage.getItem('token');
  const {setSingleUnit, filterData} = useContext(AppContext);
  const [allUnits, setAllUnits] = useState([]);
  const [newArrivalUnits, setNewArrivalUnits] = useState([]);
  const [priceRange, setPriceRange] = useState([25000, 2000000]);
  const [unitFilter, setUnitFilter] = useState()
  const [cities, setCities] = useState()
  const [paymentMethod, setPaymentMethod] = useState()
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('https://golden-gate-three.vercel.app/core/all-properties',
      {headers: {'Authorization': `Bearer ${token}`}}
    )
    .then(res => {
      setAllUnits(res.data.data.all)
      setNewArrivalUnits(res.data.data.recent)
      console.log(res.data);
    })
    .catch(err => {console.log(err);
    })
  },[])
  const handleUnitClick = (id)=> {
    const foundUnit = allUnits.find(({id})=>id===id)
    setSingleUnit(foundUnit);
    navigate(`/units/${id}`)
  }
  const handleFilterClick = ()=> {
    axios.post(
      'https://golden-gate-three.vercel.app/core/filter-properties',
      {
        project_id: unitFilter,
        payment_method: paymentMethod,
        city_id: cities,
        min_price: priceRange[0],
        max_price: priceRange[1],
      },
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    )
    .then(res => {
      setAllUnits(res.data.data);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }
  // const allUnits = [
  //   {
  //     id: 1,
  //     image:unitImage,
  //     title: 'Unit 1',
  //     description: 'This is unit 1.',
  //     price: 1000,
  //     area:'120 Meter',
  //     rate:['','',''],
  //     city:'',
  //     project:'',
  //     payment_method:''
  //   },
  // ]
  // const newArrivalUnits = [
  //   {
  //     id: 1,
  //     image:unitImage,
  //     title: 'Unit 1',
  //     description: 'This is unit 1.',
  //     price: 1000,
  //     area:'120 Meter',
  //     rate:['','',''],
  //     city:'',
  //     project:'',
  //     payment_method:''
  //   },
  // ]
  return (
    <main className='units_page'>
      <section className='units_content'>
        <div className="new_arrive">
          <h2>المعروض حديثا</h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
          {newArrivalUnits&& newArrivalUnits.map((newArrivalUnit, index) => 
            <SwiperSlide className='swiper-slide' key={newArrivalUnit.id}>
              <div className="slide-content">
                <img src={unitImage} alt="project"/>
                <div className="content">
                  <h3>{newArrivalUnit.title}</h3>
                  <h3>المساحة : {newArrivalUnit.area}</h3>
                  <h3>السعر : {newArrivalUnit.price}</h3>
                  <button className='see_more' onClick={()=>{handleUnitClick(newArrivalUnit.id)}}>التفاصيل</button>
                </div>
              </div>
            </SwiperSlide>        
          )}
          </Swiper>
        </div>
        <div className="all_units">
          <h2 className="units_title">جميع الوحدات</h2>
          <div className="units_list">
            {allUnits&& allUnits.map((unit, index) => 
              <div className="unit" key={unit.id}>
                <img src={unitImage} alt="unitImage" className='unit_image' />
                <div className="unit_info">
                  <h3 className="unit_name">{unit.title}</h3>
                  <p className="unit_price">السعر : {unit.price}</p>
                  <button className='unit_details' onClick={()=>{handleUnitClick(unit.id)}}>التفاصيل</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className='filter'>
        <div className="filter_unit">
          <h2 className="filter_title">الوحدة</h2>
          <select name="unit" id="unit" onChange={(e)=>setUnitFilter(e.target.value)}>
            {filterData &&
              filterData.project_types.map((projectType, index) => (
                <optgroup key={projectType.id} label={projectType.name}>
                  {projectType.projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </optgroup>
              ))}
          </select>
        </div>
        <div className='filter_unit'>
          <h2 className="filter_title">التصنيف حسب السعر</h2>
          <div className="price-range-slider">
            <div className="slider-container">
              <Slider
                range
                min={20000}
                max={800000}
                step={20000}
                defaultValue={[25000, 2000000]}
                value={priceRange}
                onChange={handlePriceChange}
              />
              <div className="slider-labels">
                <span>
                  السعر : {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                </span>
                {/* <span>Min: {priceRange[0].toLocaleString()}</span>
                <span>Max: {priceRange[1].toLocaleString()}</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="filter_unit">
          <h2 className="filter_title">المدينة</h2>
          <select name="" id="" onChange={(e)=>setCities(e.target.value)}>
            {filterData&& filterData.cities.map((index, key)=>
              <option value={index.id}>{index.name}</option>
            )}
          </select>
        </div>
        <div className="filter_unit">
          <h2 className="filter_title">وسيلة الدفع</h2>
          <select name="" id="" onChange={(e)=>setPaymentMethod(e.target.value)}>
            <option value="IN">كاش</option>
            <option value="CS">تقسيط</option>
          </select>
        </div>
        <button className='filter_btn' onClick={handleFilterClick}>تصنيف</button>
      </section>
    </main>
  )
}

export default Units