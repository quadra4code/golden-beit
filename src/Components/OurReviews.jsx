import React, {useContext} from 'react';
import { FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import image from '../Images/form.png';
import IsDesktop from '../Context/IsDesktop'
import AppContext from '../Context/AppContext';
const OurReviews = () => {
  const {isDesktop} = useContext(IsDesktop)
  const {ourReviewsData} = useContext(AppContext)
  const reviews = [
    {
      image: image,
      name: "ايمن عبدالله",
      rating: '5.0',
      review: "لقد جعلت شركة GOLDEN GATE حلمى بامتلاك منزل حقيقة ! لقد قدم فريقهم دعماً استثنائياً و أرشدني في كل خطوة من خطوات العملية. لا يمكنني أن أكون أكثر سعادة بمنزلي الجديد !",
      city:'القاهرة'
    },
    {
      image: image,
      name: "ايمن عبدالله",
      rating: '5.0',
      review: "لقد جعلت شركة GOLDEN GATE حلمى بامتلاك منزل حقيقة ! لقد قدم فريقهم دعماً استثنائياً و أرشدني في كل خطوة من خطوات العملية. لا يمكنني أن أكون أكثر سعادة بمنزلي الجديد !",
      city:'القاهرة'
    },
    {
      image: image,
      name: "ايمن عبدالله",
      rating: '5.0',
      review: "لقد جعلت شركة GOLDEN GATE حلمى بامتلاك منزل حقيقة ! لقد قدم فريقهم دعماً استثنائياً و أرشدني في كل خطوة من خطوات العملية. لا يمكنني أن أكون أكثر سعادة بمنزلي الجديد !",
      city:'القاهرة'
    },
    {
      image: image,
      name: "ايمن عبدالله",
      rating: '5.0',
      review: "لقد جعلت شركة GOLDEN GATE حلمى بامتلاك منزل حقيقة ! لقد قدم فريقهم دعماً استثنائياً و أرشدني في كل خطوة من خطوات العملية. لا يمكنني أن أكون أكثر سعادة بمنزلي الجديد !",
      city:'القاهرة'
    },
  ]
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
              <img src={image} alt="project"/>
              <div className="content">
                <section className='user-info'>
                  <div className='user'>
                    <h3>{review.client_name}</h3>
                    <h4>{review.city}</h4>
                  </div>
                  <p className='rate'>
                    <span>{review.rate}</span>
                    <FaRegStar/>
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