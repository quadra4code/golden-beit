// import React,{useContext, useState} from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import IsDesktop from '../Context/IsDesktop';
// import AppContext from '../Context/AppContext';
// import { useNavigate } from 'react-router-dom';
// import UnitCard from './UnitCard';
// import { Carousel } from 'antd'
// const TopShow = () => {
//   const {isDesktop, isLaptop, isTablet} = useContext(IsDesktop)
//   const navigate = useNavigate()
//   const {mostViewedUnits, handelAddToFav} = useContext(AppContext)
//   // console.log(mostViewedUnits);
//   const slidesToShow = isDesktop ? 4 : isLaptop ? 3 : isTablet ? 2 : 1;  
//   return (
//     <section className='our-projects'>
//       <h1 className='title'>الأكثر مشاهدةً</h1>
//       <Swiper
//         slidesPerView={slidesToShow}
//         spaceBetween={20}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[Pagination]}
//         className="mySwiper"
//       >
//         {mostViewedUnits&& mostViewedUnits.map((project, index) => 
//           <SwiperSlide className='swiper-slide' key={index}>
//             <div className="slide-content">
//               <UnitCard
//                 key={project.id}
//                 title={project.title}
//                 project={project.project}
//                 mainImage={project.main_image}
//                 over_price_obj={project.over_price_obj}
//                 total_price_obj={project.total_price_obj}
//                 city={project.city}
//                 area={project.area}
//                 price={project.price_obj}
//                 id={project.id}
//                 isSoldOut={project.status.code==4 && true}
//                 onClick={() => navigate(`/all-units/${project.id}`)}
//                 addFav = {()=>{handelAddToFav(project.id)}}
//               />
//             </div>
//           </SwiperSlide>        
//         )}
//       </Swiper>
//     </section>
//   )
// }

// export default TopShow



import React, { useContext, useRef, useState } from 'react';
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import UnitCard from './UnitCard';
import useSlidesToShow from './UseSlidesToShowHook'; // ← here

const TopShow = () => {
  const { mostViewedUnits, handelAddToFav } = useContext(AppContext);
  const navigate = useNavigate();
  const slidesToShow = useSlidesToShow(); // ← dynamic

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const totalSlides = mostViewedUnits ? Math.ceil(mostViewedUnits.length / slidesToShow) : 0;

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) handleNext();
      else if (distance < -50) handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getVisibleUnits = () => {
    if (!mostViewedUnits) return [];
    const start = currentIndex * slidesToShow;
    return mostViewedUnits.slice(start, start + slidesToShow);
  };

  return (
    <section className="our-projects">
      <h1 className="title">الأكثر مشاهدةً</h1>

      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={handlePrev} disabled={currentIndex === 0}>‹</button>

        <div
          className="carousel-track"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {getVisibleUnits().map((project) => (
            <div
              className="carousel-item"
              key={project.id}
              style={{ flex: `0 0 calc(100% / ${slidesToShow})` }}
            >
              <UnitCard
                title={project.title}
                project={project.project}
                mainImage={project.main_image}
                over_price_obj={project.over_price_obj}
                total_price_obj={project.total_price_obj}
                city={project.city}
                area={project.area}
                price={project.price_obj}
                id={project.id}
                isSoldOut={project.status.code === 4}
                onClick={() => navigate(`/all-units/${project.id}`)}
                addFav={() => handelAddToFav(project.id)}
              />
            </div>
          ))}
        </div>
        <button className="carousel-btn next" onClick={handleNext} disabled={currentIndex >= totalSlides - 1}>›</button>
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
  );
};

export default TopShow;

