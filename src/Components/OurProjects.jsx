import {useContext, useState, useRef} from 'react';
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
import useSlidesToShow from './UseSlidesToShowHook'; // ← here

const OurProjects = () => {
  const slidesToShow = useSlidesToShow(); // ← dynamic
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()
  const { handelAddToFav, featuredUnits} = useContext(AppContext)
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const totalSlides = featuredUnits ? Math.ceil(featuredUnits.length / slidesToShow) : 0;
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex < totalSlides - 1) setCurrentIndex(currentIndex + 1);
  };
  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (e.touches) {
      touchStartX.current = e.touches[0].clientX;
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches) {
      touchEndX.current = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchEndX.current - touchStartX.current;
      if (distance > 50) handleNext();
      else if (distance < -50) handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };
  // Mouse events for desktop
  const mouseDown = useRef(false);
  const handleMouseDown = (e) => {
    mouseDown.current = true;
    touchStartX.current = e.clientX;
  };
  const handleMouseMove = (e) => {
    if (!mouseDown.current) return;
    touchEndX.current = e.clientX;
  };
  const handleMouseUp = () => {
    if (!mouseDown.current) return;
    mouseDown.current = false;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchEndX.current - touchStartX.current;
      if (distance > 50) handleNext();
      else if (distance < -50) handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };
  const getVisibleUnits = () => {
    if (!featuredUnits) return [];
    const start = currentIndex * slidesToShow;
    return featuredUnits.slice(start, start + slidesToShow);
  };
  // const {isDesktop, isLaptop, isTablet} = useContext(IsDesktop)
  // const navigate = useNavigate()
  // const { handelAddToFav, featuredUnits} = useContext(AppContext)
  // console.log(featuredUnits);
  // const slidesToShow = isDesktop ? 4 : isLaptop ? 3 : isTablet ? 2 : 1; 
  return (
    <section className="our-projects">
      <h1 className='title'>وحداتنا المتميزة</h1>
      <div className="carousel-container">
        <div
          className="carousel-track"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ userSelect: 'none', cursor: 'grab' }}
        >
          {getVisibleUnits().map((project) => (
            <div
              className="carousel-item"
              key={project.id}
              style={{ flex: `0 0 calc(100% / ${slidesToShow})` }}
            >
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
          ))}
        </div>
      </div>
      <div className="carousel-dots">
        {Array.from({ length: totalSlides }, (_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
    // <section className='our-projects'>
    //   <h1 className='title'>وحداتنا المتميزة</h1>
    //   <Swiper
    //     slidesPerView={slidesToShow}
    //     spaceBetween={15}
    //     pagination={{
    //       clickable: true,
    //     }}
    //     modules={[Pagination]}
    //     className="mySwiper"
    //   >
    //     {featuredUnits&& featuredUnits.map((project, index) => 
    //       <SwiperSlide className='swiper-slide' key={index}>
    //         <div className="slide-content">
    //         <UnitCard
    //           key={project.id}
    //           title={project.title}
    //           project={project.project}
    //           mainImage={project.main_image}
    //           over_price_obj={project.over_price_obj}
    //           total_price_obj={project.total_price_obj}
    //           city={project.city}
    //           area={project.area}
    //           price={project.price_obj}
    //           id={project.id}
    //           isSoldOut={project.status.code==4 && true}
    //           onClick={() => navigate(`/all-units/${project.id}`)}
    //           addFav = {()=>{handelAddToFav(project.id)}}
    //         />
    //         </div>
    //       </SwiperSlide>        
    //     )}
    //   </Swiper>
    // </section>
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
