// import React, {useEffect, useState, useContext} from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import  Pagination  from '../Components/Pagination';
// import Slider from 'rc-slider';
// import unitImage from '../Images/form.png'; 
// import { BsBuildings } from "react-icons/bs";
// import { FaLocationDot } from "react-icons/fa6";
// import { TbRulerMeasure2 } from "react-icons/tb";
// import { MdOutlineAttachMoney } from "react-icons/md";
// import AppContext from '../Context/AppContext';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../Components/Loader';
// import UnitCard from '../Components/UnitCard';

// const Units = () => {
//   const {handleFilterClick, contextHolder, setSingleUnit, filterData, allUnits, newArrivalUnits,loading} = useContext(AppContext);
//   const [priceRange, setPriceRange] = useState([25000, 2000000]);
//   const [unitFilter, setUnitFilter] = useState();
//   const [selectedCity, setSelectedCity] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [unitsPerPage] = useState(10);
//   const [paymentMethod, setPaymentMethod] = useState();
//   const handlePriceChange = (value) => {
//     setPriceRange(value);
//   };
//   const navigate = useNavigate()
//   const handleUnitClick = (id)=> {
//     const foundUnit = allUnits.find(({id})=>id===id)
//     setSingleUnit(foundUnit);
//     navigate(`/all-units/${id}`)
//   }
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   // Get current units
//   const indexOfLastUnit = currentPage * unitsPerPage;
//   const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
//   const currentUnits = allUnits&& allUnits.slice(indexOfFirstUnit, indexOfLastUnit);
//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   return (
//     <>
//       {loading
//         ? 
//         <Loader/>
//         :
//         <main className='units_page'>
//           {contextHolder}
//           <section className='units_content'>
//             <div className="new_arrive">
//               <h2>المعروض حديثا</h2>
//               <Swiper
//                 slidesPerView={2}
//                 spaceBetween={10}
//                 pagination={{
//                   clickable: true,
//                 }}
//                 modules={[Pagination]}
//                 className="mySwiper"
//               >
//               {newArrivalUnits&& newArrivalUnits.map((newArrivalUnit, index) => 
//                 <SwiperSlide className='swiper-slide' key={newArrivalUnit.id}>
//                   <div className="slide-content">
//                     <img src={unitImage} alt="project"/>
//                     <div className="content">
//                       <h1>
//                         <FaLocationDot/>
//                         {newArrivalUnit.title}
//                       </h1>
//                       <h1>
//                         <TbRulerMeasure2/>
//                         المساحة : {newArrivalUnit.area}
//                       </h1>
//                       <h1>
//                         <MdOutlineAttachMoney/>
//                         السعر : {newArrivalUnit.area}
//                       </h1>
//                       <button className='see_more' onClick={()=>{handleUnitClick(newArrivalUnit.id)}}>التفاصيل</button>
//                     </div>
//                   </div>
//                 </SwiperSlide>        
//               )}
//               </Swiper>
//             </div>
//             <div className="all_units">
//               <h2 className="units_title">جميع الوحدات</h2>
//               <div className="units_list">
//                 {currentUnits&& currentUnits.map((unit, index) => 
//                   <UnitCard 
//                   key={unit.id}
//                   title={unit.title} 
//                   area={unit.area}
//                   price = {unit.price}
//                   id = {unit.id}
//                   onClick = {()=>{handleUnitClick(unit.id)}}
//                   />
//                   // <div className="unit" key={unit.id}>
//                   //   <img src={unitImage} alt="unitImage" className='unit_image' />
//                   //   <div className="unit_info">
//                   //     <h3 className="unit_name">
//                   //       <FaLocationDot/>
//                   //       {unit.title}
//                   //     </h3>
//                   //     <h3 className="unit_name">
//                   //       <BsBuildings/>
//                   //       {unit.title}
//                   //     </h3>
//                   //     <p className="unit_price">السعر : {unit.price}</p>
//                   //     <button className='unit_details' onClick={()=>{handleUnitClick(unit.id)}}>التفاصيل</button>
//                   //   </div>
//                   // </div>
//                 )}
//               </div>
//               <Pagination
//                 unitsPerPage={unitsPerPage}
//                 totalUnits={allUnits&& allUnits.length}
//                 paginate={paginate}
//                 currentPage={currentPage}
//               />
//             </div>
//           </section>
//           <section className='filter'>
//             <div className="filter_unit">
//               <select name="unit" id="unit" onChange={(e)=>setUnitFilter(e.target.value)}>
//                 <option value="اختر الوحدة" selected disabled>اختر الوحدة</option>
//                 {filterData &&
//                   filterData.project_types.map((projectType, index) => (
//                     <optgroup key={projectType.id} label={projectType.name}>
//                       {projectType.projects.map((project) => (
//                         <option key={project.id} value={project.id}>
//                           {project.name}
//                         </option>
//                       ))}
//                     </optgroup>
//                   ))}
//               </select>
//             </div>
//             <div className='filter_unit'>
//               <h2 className="filter_title">التصنيف حسب السعر</h2>
//               <div className="price-range-slider">
//                 <div className="slider-container">
//                   <Slider
//                     range
//                     min={20000}
//                     max={800000}
//                     step={20000}
//                     defaultValue={[25000, 2000000]}
//                     value={priceRange}
//                     onChange={handlePriceChange}
//                   />
//                   <div className="slider-labels">
//                     <span>
//                       السعر : {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="filter_unit">
//               <select name="" id="" onChange={(e)=>setSelectedCity(e.target.value)}>
//                 <option value="اختر الوحدة" disabled selected>اختر المدينة</option>
//                 {filterData&& filterData.cities.map((index, key)=>
//                   <option key={key} value={index.id}>{index.name}</option>
//                 )}
//               </select>
//             </div>
//             <div className="filter_unit">
//               <select name="" id="" onChange={(e)=>setPaymentMethod(e.target.value)}>
//                 <option disabled selected value="اختر وسيلة الدفع">اختر وسيلة الدفع</option>
//                 <option value="IN">كاش</option>
//                 <option value="CS">تقسيط</option>
//               </select>
//             </div>
//             <button className='filter_btn' onClick={()=>{handleFilterClick(unitFilter,paymentMethod,selectedCity,priceRange[0],priceRange[1])}}>تصنيف</button>
//           </section>
//         </main>
//       }
//     </>
//   )
// }

// export default Units

import React, { useEffect, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Pagination from '../Components/Pagination';
import Slider from 'rc-slider';
import unitImage from '../Images/form.png';
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { TbRulerMeasure2 } from "react-icons/tb";
import { MdOutlineAttachMoney } from "react-icons/md";
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import UnitCard from '../Components/UnitCard';

const Units = () => {
  const { handleFilterClick, contextHolder, setSingleUnit, filterData, allUnits, newArrivalUnits, loading } = useContext(AppContext);
  const [max_price, setMax_price] = useState();
  const [min_price, setMin_price] = useState();
  const [unitFilter, setUnitFilter] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [unitsPerPage] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // const handlePriceChange = (value) => {
  //   setPriceRange(value);
  // };

  const navigate = useNavigate();
  const handleUnitClick = (id) => {
    const foundUnit = allUnits.find((unit) => unit.id === id);
    setSingleUnit(foundUnit);
    navigate(`/all-units/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get current units
  const indexOfLastUnit = currentPage * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = allUnits && allUnits.slice(indexOfFirstUnit, indexOfLastUnit);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="units_page">
          {contextHolder}
          <section className="units_content">
            {newArrivalUnits&& newArrivalUnits.length>0 &&  
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
                  {newArrivalUnits && newArrivalUnits.map((newArrivalUnit) => (
                    <SwiperSlide className="swiper-slide" key={newArrivalUnit.id}>
                      <div className="slide-content">
                        <img src={unitImage} alt="project" />
                        <div className="content">
                          <h1>
                            <FaLocationDot />
                            {newArrivalUnit.title}
                          </h1>
                          <h1>
                            <TbRulerMeasure2 />
                            المساحة : {newArrivalUnit.area}
                          </h1>
                          <h1>
                            <MdOutlineAttachMoney />
                            السعر : {newArrivalUnit.area}
                          </h1>
                          <button className="see_more" onClick={() => { handleUnitClick(newArrivalUnit.id) }}>التفاصيل</button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            }
            <div className="all_units">
              <h2 className="units_title">جميع الوحدات</h2>
              <div className="units_list">
                {currentUnits && currentUnits.map((unit) => (
                  <UnitCard
                    key={unit.id}
                    title={unit.title}
                    area={unit.area}
                    price={unit.price}
                    id={unit.id}
                    onClick={() => { handleUnitClick(unit.id) }}
                  />
                ))}
              </div>
              <Pagination
                unitsPerPage={unitsPerPage}
                totalUnits={allUnits && allUnits.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </section>
          <button className="filter_toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <span>تصنيف</span>
            <IoIosArrowDown/>
          </button>
          <section className={`filter ${isFilterOpen ? 'open' : ''}`}>
            <button className="close_filter" onClick={() => setIsFilterOpen(false)}>اغلاق</button>
            <div className="filter_unit">
              <select name="unit" id="unit" onChange={(e) => setUnitFilter(e.target.value)}>
                <option value="اختر الوحدة" selected disabled>اختر الوحدة</option>
                {filterData &&
                  filterData.project_types.map((projectType) => (
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
            <div className="filter_unit">
              <p className="filter_title">التصنيف حسب السعر</p>
              <div className="price-range-slider">
                <input type="number" placeholder='من'/>
                <input type="number" placeholder='إلى'/>
                {/* <div className="slider-container">
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
                  </div>
                </div> */}
              </div>
            </div>
            <div className="filter_unit">
              <select name="" id="" onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="اختر الوحدة" disabled selected>اختر المدينة</option>
                {filterData && filterData.cities.map((index, key) =>
                  <option key={key} value={index.id}>{index.name}</option>
                )}
              </select>
            </div>
            <div className="filter_unit">
              <select name="" id="" onChange={(e) => setPaymentMethod(e.target.value)}>
                <option disabled selected value="اختر وسيلة الدفع">اختر وسيلة الدفع</option>
                <option value="IN">كاش</option>
                <option value="CS">تقسيط</option>
              </select>
            </div>
            <button className="filter_btn" onClick={() => { handleFilterClick(unitFilter, paymentMethod, selectedCity, min_price, max_price) }}>تصنيف</button>
          </section>
        </main>
      )}
    </>
  );
};

export default Units;