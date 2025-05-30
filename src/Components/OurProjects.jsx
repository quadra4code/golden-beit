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
import UnitCard from './UnitCard';
const OurProjects = () => {
  const {isDesktop, isLaptop, isTablet} = useContext(IsDesktop)
  const navigate = useNavigate()
  const { handelAddToFav, featuredUnits} = useContext(AppContext)
  console.log(featuredUnits);
  const slidesToShow = isDesktop ? 4 : isLaptop ? 3 : isTablet ? 2 : 1; 
  return (
    <section className='our-projects'>
      <h1 className='title'>وحداتنا المتميزة</h1>
      <Swiper
        slidesPerView={slidesToShow}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {featuredUnits&& featuredUnits.map((project, index) => 
          <SwiperSlide className='swiper-slide' key={index}>
            <div className="slide-content">
            <UnitCard
              key={project.id}
              title={project.title}
              project={project.project}
              mainImage={project.main_image}
              over_price_obj={project.over_price_obj}
              total_price_obj={project.total_price_obj}
              city={project.city}
              area={project.area}
              price={project.price_obj}
              id={project.id}
              isSoldOut={project.status.code==4 && true}
              onClick={() => navigate(`/all-units/${project.id}`)}
              addFav = {()=>{handelAddToFav(project.id)}}
            />
            </div>
          </SwiperSlide>        
        )}
      </Swiper>
    </section>
  )
}

export default OurProjects



              {/* <img src={project.main_image&& project.main_image?project.main_image:image1} alt="project"/>
              <div className="content">
                <div className="top">
                  <h1 className='title'>
                    <FaLocationDot/>
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
                    {project.area} متر مربع
                  </h1>
                  <span className='price'>{project.over_price_obj.price_value} {project.over_price_obj.currency} </span>
                  <span className='price'>{project.over_price_obj.price_value} {project.over_price_obj.currency} </span>
                </div>
                <button onClick={()=>{navigate(`/all-units/${project.id}`)}}>التفاصيل</button>
              </div> */}
