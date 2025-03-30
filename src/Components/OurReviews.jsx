import React, {useContext} from 'react';
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import userImage from '../Images/user-image.webp';
import IsDesktop from '../Context/IsDesktop'
import AppContext from '../Context/AppContext';
const OurReviews = () => {
  const {isDesktop} = useContext(IsDesktop)
  const {ourReviewsData} = useContext(AppContext)
  return (
    <section className='reviews'>
      <header className='title'>
        <h2>بعض اراء عملائنا المميزين</h2>
        <div className='charts'>
          <p>
            <span>2k+</span>
            <span>وكلاء موثوق بهم</span>
          </p>
          <p>
            <span>6k+</span>
            <span>عقار تم بيعه</span>
          </p>
          <p>
            <span>8k+</span>
            <span>عقارات متاحة</span>
          </p>
        </div>
      </header>
      <Swiper
        slidesPerView={isDesktop?3:1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {ourReviewsData&& ourReviewsData.map((review, index) => 
          <SwiperSlide className='swiper-slide' key={index}>
            <div className="slide-content">
              <div className="content">
                <section className='user-info'>
                  <div className='user'>
                    <img src={userImage} alt="user" />
                    <h3>{review.client_name}</h3>
                    {/* <h4>{review.city}</h4> */}
                  </div>
                  <p className='rate'>
                    <span>{review.rate}</span>
                    <FaStar/>
                  </p>
                </section>
                <p className='review'>
                  {review.review}
                </p>
              </div>
            </div>
          </SwiperSlide>        
        )}
      </Swiper>
    </section>
  )
}

export default OurReviews