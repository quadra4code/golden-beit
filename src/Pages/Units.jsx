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

// import React, { useEffect, useState, useContext } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import PaginationComponent from '../Components/Pagination';
// import { Pagination } from 'swiper/modules';
// import Slider from 'rc-slider';
// import unitImage from '../Images/form.png';
// import { IoIosArrowDown } from "react-icons/io";
// import { FaLocationDot } from "react-icons/fa6";
// import { TbRulerMeasure2 } from "react-icons/tb";
// import { MdOutlineAttachMoney } from "react-icons/md";
// import AppContext from '../Context/AppContext';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../Components/Loader';
// import UnitCard from '../Components/UnitCard';
// import Popup from '../Components/Popup';
// import axios from 'axios';
// import notFoundImage from '../Images/not found.webp'
// import IsDesktop from '../Context/IsDesktop';
// const Units = () => {
//   const { setLoading, handleFilterClick, contextHolder, setSingleUnit, filterData, allUnits, newArrivalUnits, setAllUnits, setNewArrivalUnits, loading } = useContext(AppContext);
//   const [max_price, setMax_price] = useState();
//   const [min_price, setMin_price] = useState();
//   const [max_area, setMax_area] = useState();
//   const [min_area, setMin_area] = useState();
//   const [unitFilter, setUnitFilter] = useState();
//   const [selectedCity, setSelectedCity] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [unitsPerPage] = useState(12);
//   const [paymentMethod, setPaymentMethod] = useState();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const {isDesktop} = useContext(IsDesktop)
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [isFlat, setIsFlat] = useState(unitFilter);
//   // const handlePriceChange = (value) => {
//   //   setPriceRange(value);
//   // };
//   const navigate = useNavigate();
//   const handleUnitClick = (id) => {
//     const foundUnit = allUnits.find((unit) => unit.id === id);
//     setSingleUnit(foundUnit);
//     navigate(`/all-units/${id}`);
//   };
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const handleSelectUnitType = (e)=> {
//     console.log(e.target.value);
//     setUnitFilter(e.target.value);
//   }
//   const filteredProjects = unitFilter
//   ? filterData&& filterData.unit_types.find((type) => type.id.toString() === unitFilter)?.projects || []
//   : [];
//   // Get current units
//   const indexOfLastUnit = currentPage * unitsPerPage;
//   const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
//   const currentUnits = allUnits ? allUnits.slice(indexOfFirstUnit, indexOfLastUnit) : [];
//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const handleSingleUnitDetails= (id) => {
//     axios
//     .get(`https://golden-gate-three.vercel.app/core/unit-details/${id}`)
//     .then((res)=>{
//       console.log(res.data);
//       setSingleUnit(res.data.data)
//       navigate(`/all-units/${id}`)
//     })
//     .catch((err)=>{
//       console.log(err);
//     })
//   }
//   useEffect(()=>{
//     setLoading(true)
//     axios.get('https://golden-gate-three.vercel.app/core/all-units')
//     .then(res => {
//       setAllUnits(res.data.data.all)
//       console.log(res.data);
//       setDataLoaded(true);
//       setNewArrivalUnits(res.data.data.recent)
//     })
//     .catch(err => {
//       console.log(err)
//       setDataLoaded(true)
//     })
//     .finally(() => setLoading(false))
//   },[])
//   return (
//     <>
//       {/* {loading ? (
//         <Loader />
//       ) : (
//         <> */}
//           { dataLoaded && allUnits && allUnits.length>0 ?
//             <div className="data-notFound">
//               <img src={notFoundImage} alt="" />
//               <h1>عفوا لا يوجد وحدات متاحة</h1>
//             </div>        
//           :
//             <>
//               {dataLoaded && loading ? 
//                 <Loader/>
//                 :
//                 <main className="units_page">
//                   <Popup/>
//                   {contextHolder}
//                   <section className="units_content">
//                     {newArrivalUnits&& newArrivalUnits.length>0 &&  
//                       <div className="new_arrive">
//                         <h2>المعروض حديثا</h2>
//                         <Swiper
//                           slidesPerView={isDesktop?3:1}
//                           spaceBetween={10}
//                           pagination={{
//                             clickable: true,
//                           }}
//                           modules={[Pagination]}
//                           className="mySwiper"
//                         >
//                           {newArrivalUnits && newArrivalUnits.map((newArrivalUnit) => (
//                             <SwiperSlide className="swiper-slide" key={newArrivalUnit.id}>
//                               <div className="slide-content">
//                                 <img src={unitImage} alt="project" />
//                                 <div className="content">
//                                   <h1>
//                                     <FaLocationDot />
//                                     {newArrivalUnit.title}
//                                   </h1>
//                                   <h1>
//                                     <TbRulerMeasure2 />
//                                     المساحة : {newArrivalUnit.area}
//                                   </h1>
//                                   <h1>
//                                     <MdOutlineAttachMoney />
//                                     السعر : {newArrivalUnit.area}
//                                   </h1>
//                                   <button className="see_more" onClick={() => { handleUnitClick(newArrivalUnit.id) }}>التفاصيل</button>
//                                 </div>
//                               </div>
//                             </SwiperSlide>
//                           ))}
//                         </Swiper>
//                       </div>
//                     }
//                     <div className="all_units">
//                       <h2 className="units_title">جميع الوحدات</h2>
//                       <div className="units_list">
//                         {currentUnits && currentUnits.map((unit) => (
//                           <UnitCard
//                             key={unit.id}
//                             title={unit.title}
//                             project={unit.project}
//                             city={unit.city}
//                             area={unit.area}
//                             price={unit.price}
//                             id={unit.id}
//                             onClick={() => { handleSingleUnitDetails(unit.id) }}
//                           />
//                         ))}
//                       </div>
//                       <PaginationComponent
//                         itemsPerPage={unitsPerPage}
//                         totalItems={allUnits ? allUnits.length : 0}
//                         paginate={paginate}
//                         currentPage={currentPage}
//                       />
//                     </div>
//                   </section>
//                   <button className="filter_toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
//                     <span>تصنيف</span>
//                     <IoIosArrowDown/>
//                   </button>
//                   <section className={`filter ${isFilterOpen ? 'open' : ''}`}>
//                     <button className="close_filter" onClick={() => setIsFilterOpen(false)}>اغلاق</button>
//                     <div className="filter_unit">
//                       <p className="filter_title">اختر نوع الوحدة</p>
//                       <div className="radio-container">
//                         <div className='radio'>
//                           <input
//                             type="radio" 
//                             id="land" 
//                             name="project_type_id" 
//                             value="1" 
//                             checked={unitFilter==='1'}
//                             onChange={handleSelectUnitType}
//                           />
//                           <label for="land">أرض</label>
//                         </div>
//                         <div className='radio'>
//                           <input
//                             type="radio" 
//                             id="flat" 
//                             name="project_type_id" 
//                             value="2" 
//                             checked={unitFilter==='2'}
//                             onChange={handleSelectUnitType}
//                           />
//                           <label for="flat">شقة</label>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="filter_unit">
//                       <select name="unit" id="unit" onChange={(e) => handleSelectUnitType(e.target)}>
//                         <option hidden value="اختر اسم المشروع" selected disabled>اختر اسم المشروع</option>
//                         {filteredProjects.map((project) => (
//                           <option key={project.id}  value={project.id}>
//                             {project.name}
//                           </option>
//                           ))}
//                         {/* {filterData &&
//                           filterData.unit_types.map((projectType) => (
//                             <optgroup key={projectType.id} label={projectType.name}>
//                               {projectType.projects.map((project) => (
//                                 <option key={project.id} value={project.id}>
//                                   {project.name}
//                                 </option>
//                               ))}
//                             </optgroup>
//                           ))} */}
//                       </select>
//                     </div>
//                     <div className="filter_unit">
//                       <p className="filter_title">التصنيف حسب السعر</p>
//                       <div className="price-range-slider">
//                         <input type="number" onClick={(e)=>setMin_price(e.target.value)}  min={filterData&& filterData.min_price} placeholder='من'/>
//                         <input type="number" onClick={(e)=>setMax_price(e.target.value)} max={filterData&& filterData.max_price}  placeholder='إلى'/>
//                         {/* <div className="slider-container">
//                           <Slider
//                             range
//                             min={20000}
//                             max={800000}
//                             step={20000}
//                             defaultValue={[25000, 2000000]}
//                             value={priceRange}
//                             onChange={handlePriceChange}
//                           />
//                           <div className="slider-labels">
//                             <span>
//                               السعر : {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
//                             </span>
//                           </div>
//                         </div> */}
//                       </div>
//                     </div>
//                     <div className="filter_unit">
//                       <p className="filter_title">المساحة بالمتر</p>
//                       <div className="price-range-slider">
//                         <input type="number"
//                           max={filterData&& filterData.max_area}
//                           onClick={(e)=>setMin_area(e.target.value)}
//                           placeholder='من'/>
//                         <input type="number"
//                           min={filterData&& filterData.min_area} 
//                           onClick={(e)=>setMax_area(e.target.value)}
//                           placeholder='إلى'/>
//                       </div>
//                     </div>
//                     <div className="filter_unit">
//                       <select name="" id="" onChange={(e) => setSelectedCity(e.target.value)}>
//                         <option value="اختر المدينة"hidden disabled selected>اختر المدينة</option>
//                         {filterData && filterData.cities.map((index, key) =>
//                           <option key={key} value={index.id}>{index.name}</option>
//                         )}
//                       </select>
//                     </div>
//                     {unitFilter=== '2'&&
//                       <div className="filter_unit">
//                         <select name="" id="" onChange={(e) => setSelectedCity(e.target.value)}>
//                           <option value="اختر الطابق"hidden disabled selected>اختر الطابق</option>
//                           {filterData && filterData.floors.map((index, key) =>
//                             <option key={key} value={index.id}>{index.name}</option>
//                           )}
//                         </select>
//                       </div>            
//                     }
//                     {unitFilter=== '2'&&
//                       <div className="filter_unit">
//                         <select name="" id="" onChange={(e) => setSelectedCity(e.target.value)}>
//                           <option value="اختر الواجهة"hidden disabled selected>اختر الواجهة</option>
//                           {filterData && filterData.facades.map((index, key) =>
//                             <option key={key} value={index.id}>{index.name}</option>
//                           )}
//                         </select>
//                       </div>
//                     }
//                     <div className="filter_unit">
//                       <select name="" id="" onChange={(e) => setPaymentMethod(e.target.value)}>
//                         <option hidden disabled selected value="اختر وسيلة الدفع">اختر وسيلة الدفع</option>
//                         <option value="IN">كاش</option>
//                         <option value="CS">تقسيط</option>
//                       </select>
//                     </div>
//                     <button className="filter_btn" onClick={() => { handleFilterClick(unitFilter, paymentMethod, selectedCity, min_price, max_price, min_area, max_area) }}>تصنيف</button>
//                   </section>
//                 </main>
//               }
//             </>
//           }
//         {/* </>
//       )} */}
//     </>
//   );
// };

// export default Units;

import React, { useEffect, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PaginationComponent from '../Components/Pagination';
import { Pagination } from 'swiper/modules';
// import Slider from 'rc-slider';
import unitImage from '../Images/form.png';
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { TbRulerMeasure2 } from "react-icons/tb";
import { MdOutlineAttachMoney } from "react-icons/md";
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import UnitCard from '../Components/UnitCard';
import Popup from '../Components/Popup';
import axios from 'axios';
import IsDesktop from '../Context/IsDesktop';
import UnitsNotFound from './UnitsNotFound';

const Units = () => {
  const { handleSingleUnitDetails, handleFilterClick, contextHolder, setSingleUnit, filterData, newArrivalUnits, setNewArrivalUnits } = useContext(AppContext);
  const [max_price, setMax_price] = useState();
  const [min_price, setMin_price] = useState();
  const [max_area, setMax_area] = useState();
  const [min_area, setMin_area] = useState();
  const [unitTypeId, setUnitTypeId] = useState();
  const [allUnits, setAllUnits] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedFloor, setSelectedFloor] = useState();
  const [selectedFacade, setSelectedFacade] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // const [unitsPerPage] = useState(12);
  // const [paymentMethod, setPaymentMethod] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { isDesktop } = useContext(IsDesktop);
  // const [isFlat, setIsFlat] = useState(unitFilter);
  const [loading, setLoading] = useState(true);
  const [paginationData, setPaginationData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();
  // const handleUnitClick = (id) => {
  //   const foundUnit = allUnits.find((unit) => unit.id === id);
  //   setSingleUnit(foundUnit);
  //   navigate(`/all-units/${id}`);
  // };
  useEffect(() => {
    console.log("Updated allUnits:", allUnits);
  }, [allUnits]);
  useEffect(() => {
    setLoading(true);
    axios.post('https://golden-gate-three.vercel.app/core/filter-paginated-units',{
    })
      .then(res => {
        setAllUnits(res.data.data.all);
        setPaginationData(res.data.data.pagination)
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
        setDataLoaded(true);
      })
      .finally(() => {
        setLoading(false)
        setDataLoaded(true);
      });
  }, []);
  // const handleSelectUnitType = (e) => {
  //   setUnitTypeId(e.target.value);
  // };
  const filteredProjects = unitTypeId
    ? filterData && filterData.unit_types.find((type) => type.id.toString() === unitTypeId)?.projects || []
    : [];
  const paginate = (pageNumber) => {
    setLoading(true);
    axios.post('https://golden-gate-three.vercel.app/core/filter-paginated-units',{
      page_number:pageNumber
    })
      .then(res => {
        console.log(res.data);
        
        setAllUnits(res.data.data.all);
        setPaginationData(res.data.data.pagination)
      })
      .catch(err => {
        console.log(err);
        setDataLoaded(true);
      })
      .finally(() => {
        setDataLoaded(true);
        setLoading(false)}
      );
    setCurrentPage(pageNumber)
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {dataLoaded &&  allUnits&& allUnits.length > 0 ? (
            <main className="units_page">
              <Popup />
              {contextHolder}
              <section className="units_content">
                {newArrivalUnits && newArrivalUnits.length > 0 && (
                  <div className="new_arrive">
                    <h2>المعروض حديثا</h2>
                    <Swiper
                      slidesPerView={isDesktop ? 3 : 1}
                      spaceBetween={10}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                      {newArrivalUnits.map((newArrivalUnit) => (
                        <SwiperSlide className="swiper-slide" key={newArrivalUnit.id}>
                          <div className="slide-content">
                            <img src={newArrivalUnit.main_image? newArrivalUnit.main_image:unitImage} alt="project" />
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
                              <button className="see_more" onClick={() => navigate(`/all-units/${newArrivalUnit.id}`)}>التفاصيل</button>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
                <div className="all_units">
                  <h2 className="units_title">جميع الوحدات</h2>
                  <div className="units_list">
                    {allUnits && allUnits.map((unit) => (
                      <UnitCard
                        key={unit.id}
                        title={unit.title}
                        project={unit.project}
                        mainImage={unit.main_image}
                        city={unit.city}
                        area={unit.area}
                        price={unit.price}
                        id={unit.id}
                        isSoldOut={unit.status.code==4 && true}
                        onClick={() => navigate(`/all-units/${unit.id}`)}
                      />
                    ))}
                  </div>
                  <PaginationComponent
                    totalItems={paginationData&& paginationData.total_pages}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </section>
              <button className="filter_toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <span>تصنيف</span>
                <IoIosArrowDown />
              </button>
              <section className={`filter ${isFilterOpen ? 'open' : ''}`}>
                <button className="close_filter" onClick={() => setIsFilterOpen(false)}>اغلاق</button>
                <div className="filter_unit">
                  <p className="filter_title">اختر نوع الوحدة</p>
                  <div className="radio-container">
                    <div className='radio'>
                      <input
                        type="radio" 
                        id="land" 
                        name="unit_type_id" 
                        value="1" 
                        checked={unitTypeId==='1'}
                        onChange={(e)=>setUnitTypeId(e.target.value)}
                      />
                      <label for="land">أرض</label>
                    </div>
                    <div className='radio'>
                      <input
                        type="radio" 
                        id="flat" 
                        name="unit_type_id" 
                        value="2" 
                        checked={unitTypeId==='2'}
                        onChange={(e)=>setUnitTypeId(e.target.value)}
                      />
                      <label for="flat">شقة</label>
                    </div>
                  </div>
                </div>
                <div className="filter_unit">
                  <select name="unit" id="unit" onChange={(e) => setSelectedProject(e.target.value)}>
                    <option hidden value="اختر اسم المشروع" selected disabled>اختر اسم المشروع</option>
                    {filteredProjects.map((project) => (
                      <option key={project.id}  value={project.id}>
                        {project.name}
                      </option>
                      ))}
                  </select>
                </div>
                <div className="filter_unit">
                  <p className="filter_title">التصنيف حسب السعر</p>
                  <div className="price-range-slider">
                    <input type="number" onClick={(e)=>setMin_price(e.target.value)}  min={filterData&& filterData.min_price} placeholder='من'/>
                    <input type="number" onClick={(e)=>setMax_price(e.target.value)} max={filterData&& filterData.max_price}  placeholder='إلى'/>
                  </div>
                </div>
                <div className="filter_unit">
                  <p className="filter_title">المساحة بالمتر</p>
                  <div className="price-range-slider">
                    <input type="number"
                      max={filterData&& filterData.max_area}
                      onClick={(e)=>setMin_area(e.target.value)}
                      placeholder='من'/>
                    <input type="number"
                      min={filterData&& filterData.min_area} 
                      onClick={(e)=>setMax_area(e.target.value)}
                      placeholder='إلى'/>
                  </div>
                </div>
                <div className="filter_unit">
                  <select name="" id="" onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="اختر المدينة"hidden disabled selected>اختر المدينة</option>
                    {filterData && filterData.cities.map((index, key) =>
                      <option key={key} value={index.id}>{index.name}</option>
                    )}
                  </select>
                </div>
                {unitTypeId=== '2'&&
                  <div className="filter_unit">
                    <select name="" id="" onChange={(e) => setSelectedFloor(e.target.value)}>
                      <option value="اختر الطابق"hidden disabled selected>اختر الطابق</option>
                      {filterData && filterData.floors.map((index, key) =>
                        <option key={key} value={index.id}>{index.name}</option>
                      )}
                    </select>
                  </div>            
                }
                <div className="filter_unit">
                  <select name="" id="" onChange={(e) => setSelectedFacade(e.target.value)}>
                    <option value="اختر الواجهة"hidden disabled selected>اختر الواجهة</option>
                    {filterData && filterData.facades.map((index, key) =>
                      <option key={key} value={index.id}>{index.name}</option>
                    )}
                  </select>
                </div>
                {/* <div className="filter_unit">
                  <select name="" id="" onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option hidden disabled selected value="اختر وسيلة الدفع">اختر وسيلة الدفع</option>
                    <option value="IN">كاش</option>
                    <option value="CS">تقسيط</option>
                  </select>
                </div> */}
                <button className="filter_btn" onClick={() => { handleFilterClick(unitTypeId,selectedProject, selectedCity, min_price, max_price, min_area, max_area,selectedFloor,selectedFacade) }}>تصنيف</button>
              </section>
            </main>
          ) : (
            <UnitsNotFound description='عفوا لا يوجد وحدات متاحة'/>
          )}
        </>
      )}
    </>
  );
};

export default Units;