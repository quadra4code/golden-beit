import React,{useContext} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import IsDesktop from '../Context/IsDesktop';
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import UnitCard from './UnitCard';
const TopShow = () => {
  const {isDesktop} = useContext(IsDesktop)
  const navigate = useNavigate()
  const {mostViewedUnits, handelAddToFav} = useContext(AppContext)
  console.log(mostViewedUnits);
  return (
    <section className='our-projects'>
      <h1 className='title'>الأكثر مشاهدةً</h1>
      <Swiper
        slidesPerView={isDesktop?4:1}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {mostViewedUnits&& mostViewedUnits.map((project, index) => 
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

export default TopShow