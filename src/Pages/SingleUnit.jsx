import React, {useState} from 'react';
import { FaStar } from "react-icons/fa";
import image1 from '../Images/form.png';
import image2 from '../Images/form.png';
import image3 from '../Images/landing.png';
import image4 from '../Images/buyer.png';
import image5 from '../Images/broker.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { Tabs } from 'antd';
const SingleUnit = () => {
  const [value, setValue] = useState('1');
  const onChange = (key) => {
    console.log(key);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const starNumbers = ['','','','']
  const images = [
    {
      id: 1,
      src: image1,
      alt: "Main Image",
    },
    {
      id: 2,
      src: image2,
      alt: "Thumbnail 1",
    },
    {
      id: 3,
      src: image3,
      alt: "Thumbnail 2",
    },
    {
      id: 4,
      src: image4,
      alt: "Thumbnail 3",
    },
    {
      id: 5,
      src: image5,
      alt: "Thumbnail 4",
    },
  ];
  const items = [
    {
      key: '1',
      label: 'الوصف',
      children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non accusantium quasi sit dolorum odio eos atque deserunt. Vitae velit officia, ea itaque ratione est consequatur temporibus fugit! Consequatur, obcaecati ullam!',
    },
    {
      key: '2',
      label: 'معلومات',
      children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non accusantium quasi sit dolorum odio eos atque deserunt. Vitae velit officia, ea itaque ratione est consequatur temporibus fugit! Consequatur, obcaecati ullam!',
    },
    {
      key: '3',
      label: 'التقييم',
      children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non accusantium quasi sit dolorum odio eos atque deserunt. Vitae velit officia, ea itaque ratione est consequatur temporibus fugit! Consequatur, obcaecati ullam!',
    },
  ];
  const discoverMore = [
    {
      name:'عقار جنة اكتوبر',
      type:'ارض',
      image: image1,
      price: '300,000,000'
    },
    {
      name:'عقار جنة اكتوبر',
      type:'ارض',
      image: image2,
      price: '300,000,000'
    },
    {
      name:'عقار جنة اكتوبر',
      type:'ارض',
      image: image3,
      price: '300,000,000'
    },
    {
      name:'عقار جنة اكتوبر',
      type:'ارض',
      image: image4,
      price: '300,000,000'
    },
    {
      name:'عقار جنة اكتوبر',
      type:'ارض',
      image: image4,
      price: '300,000,000'
    },
    {
      name:'عقار جنة اكتوبر',
      type:'ارض',
      image: image4,
      price: '300,000,000'
    },
  ]
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <main className='single_unit_page'>
      <section className='unit_info'>
        <div className="galleria-container">
          <div className="main-image">
            <img src={selectedImage.src} alt={selectedImage.alt} />
          </div>
          <div className="thumbnail-carousel">
            {images.map((image) => (
              <div
                key={image.id}
                className={`thumbnail ${image.id === selectedImage.id ? "active" : ""}`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className='unit_data'>
          <h2>Unit Name</h2>
          <p>Unit Description</p>
          <div className='stars'>
            {starNumbers.map(star => <FaStar/>)}
            ( 75 تقييم )
          </div>
          <span className='holder'><h3>المشروع:</h3> <span>$100,000</span></span>
          <span className='holder'><h3>الموقع:</h3> <span>$100,000</span></span>
          <span className='holder'><h3>المساحة:</h3> <span>$100,000</span></span>
          <span className='holder'><h3>عدد الغرف:</h3> <span>$100,000</span></span>
          <span className='holder'><h3>السعر:</h3> <span className='price'>$100,000</span></span>
          <button className='add_fav'>اضافة الى المفضلة</button>
        </div>
      </section>
      <section className='tab_view'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </section>
      <section className='more_units'>
        <h2>استكشف المزيد</h2>
        <Swiper
            slidesPerView={4}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
          {discoverMore.map((discoverMore, index) => 
            <SwiperSlide className='swiper-slide' key={index}>
              <div className="slide-content">
                <img src={discoverMore.image} alt="project"/>
                <span className='type'>{discoverMore.type}</span>
                <h3>{discoverMore.name}</h3>
                <p className='price'>{discoverMore.price}</p>
                <button className='more_details'>التفاصيل</button>
              </div>
            </SwiperSlide>        
          )}
        </Swiper>
      </section>
    </main>
  )
}

export default SingleUnit