import React,{useContext} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import image1 from '../Images/form.png';
import image2 from '../Images/landing.png';
import { FaLocationDot } from "react-icons/fa6";
import { LuBedDouble } from "react-icons/lu";
import { TbRulerMeasure2 } from "react-icons/tb";
import IsDesktop from '../Context/IsDesktop';
import { BsBuildings } from "react-icons/bs";
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
const OurProjects = () => {
  const {isDesktop} = useContext(IsDesktop)
  const {navigate} = useNavigate()
  const {featuredUnits, handleSingleUnitDetails} = useContext(AppContext)
  return (
    <section className='our-projects'>
      <h1 className='title'>وحداتنا المتميزة</h1>
      <Swiper
        slidesPerView={isDesktop?3:1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {featuredUnits&& featuredUnits.map((project, index) => 
          <SwiperSlide className='swiper-slide' key={index}>
            <div className="slide-content">
              <img src={project.main_image&& project.main_image?project.main_image:image1} alt="project"/>
              <div className="content">
                <div className="top">
                  <h1 className='title'>
                    {/* <FaLocationDot/> */}
                    {project.title}
                  </h1>
                  <h1>
                    <FaLocationDot/>
                    {project.city}
                  </h1>
                  <h1>
                    <BsBuildings/>
                    {project.project}
                  </h1>
                  <h1>
                    <TbRulerMeasure2/>
                    {project.area} متر
                  </h1>
                </div>
                <p>
                  <span className='price'>LE {project.price}</span>
                  <button onClick={()=>{navigate(`/all-units/${project.id}`)}}>التفاصيل</button>
                </p>
              </div>
            </div>
          </SwiperSlide>        
        )}
      </Swiper>
    </section>
  )
}

export default OurProjects