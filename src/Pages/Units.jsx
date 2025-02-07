import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Slider from 'rc-slider';
import unitImage from '../Images/form.png'; 
const Units = () => {
  const [priceRange, setPriceRange] = useState([20000, 800000]);
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };
  const allUnits = [
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
  ]
  const newArrivalUnits = [
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
    {
      id: 1,
      image:unitImage,
      name: 'Unit 1',
      description: 'This is unit 1.',
      price: 1000,
      space:'120 Meter'
    },
  ]
  return (
    <main className='units_page'>
      <section className='units_content'>
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
          {newArrivalUnits.map((newArrivalUnit, index) => 
            <SwiperSlide className='swiper-slide' key={index}>
              <div className="slide-content">
                <img src={newArrivalUnit.image} alt="project"/>
                <div className="content">
                  <h3>{newArrivalUnit.name}</h3>
                  <h3>{newArrivalUnit.description}</h3>
                  <h3>{newArrivalUnit.space}</h3>
                  <h3>{newArrivalUnit.price}</h3>
                </div>
              </div>
            </SwiperSlide>        
          )}
          </Swiper>
        </div>
        <div className="all_units">
          <h2 className="units_title">جميع الوحدات</h2>
          <div className="units_list">
            {allUnits.map((unit, index) => 
              <div className="unit" key={index}>
                <img src={unit.image} alt="unitImage" className='unit_image' />
                <div className="unit_info">
                  <h3 className="unit_name">{unit.name}</h3>
                  <p className="unit_description">{unit.description}</p>
                  <button className='unit_details'>التفاصيل</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className='filter'>
        <div className='filter_unit'>
          <h2 className="filter_title">المشروع</h2>
          <select name="" id="">
            <option value="جنة">جنة</option>
            <option value="بدر">بدر</option>
            <option value="مسكن">مسكن</option>
          </select>
        </div>
        <div className='filter_unit'>
          <h2 className="filter_title">التصنيف حسب السعر</h2>
          <div className="price-range-slider">
            <div className="slider-container">
              <Slider
                range
                min={20000}
                max={800000}
                step={2000}
                defaultValue={[20000, 800000]}
                value={priceRange}
                onChange={handlePriceChange}
              />
              <div className="slider-labels">
                <span>
                  السعر : {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                </span>
                {/* <span>Min: {priceRange[0].toLocaleString()}</span>
                <span>Max: {priceRange[1].toLocaleString()}</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="filter_unit">
          <h2 className="filter_title">الوحدة</h2>
          <select name="" id="">
            <option value="أرض">أرض</option>
            <option value="شقة">شقة</option>
            <option value="عقار">عقار</option>
          </select>
        </div>
        <div className="filter_unit">
          <h2 className="filter_title">المساحة</h2>
          <select name="" id="">
            <option value="80">80</option>
            <option value="100">100</option>
            <option value="120">120</option>
          </select>
        </div>
        <div className="filter_unit">
          <h2 className="filter_title">تسهيلات السداد</h2>
          <select name="" id="">
            <option value="كاش">كاش</option>
            <option value="سنة">سنة</option>
            <option value="سنتين">سنتين</option>
            <option value="ثلاث سنوات">ثلاث سنوات</option>
          </select>
        </div>
        <button className='filter_btn'>تصنيف</button>
      </section>
    </main>
  )
}

export default Units