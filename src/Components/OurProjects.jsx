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
const OurProjects = () => {
  const {isDesktop} = useContext(IsDesktop)
  const projects = [
    {
      image: image1,
      location: 'جنة أكتوبر',
      desc: 'شقق مشروع فالي تاور',
      space: '4000 قدم مربع',
      outlook: '4 غرف ',
      price: '3,700,000',
      status: 'التفاصيل'
    },
    {
      image: image2,
      location: 'جنة أكتوبر',
      desc: 'شقق مشروع فالي تاور',
      space: '4000 قدم مربع',
      outlook: '4 غرف ',
      price: '7,700,000',
      status: 'التفاصيل'
    },
    {
      image: image1,
      location: 'جنة أكتوبر',
      desc: 'شقق مشروع فالي تاور',
      space: '4000 قدم مربع',
      outlook: '4 غرف ',
      price: '3,700,000',
      status: 'التفاصيل'
    },
    {
      image: image2,
      location: 'جنة أكتوبر',
      desc: 'شقق مشروع فالي تاور',
      space: '4000 قدم مربع',
      outlook: '4 غرف ',
      price: '7,700,000',
      status: 'التفاصيل'
    },
    {
      image: image1,
      location: 'جنة أكتوبر',
      desc: 'شقق مشروع فالي تاور',
      space: '4000 قدم مربع',
      outlook: '4 غرف ',
      price: '3,700,000',
      status: 'التفاصيل'
    },
  ];
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
        {projects.map((project, index) => 
          <SwiperSlide className='swiper-slide' key={index}>
            <div className="slide-content">
              <img src={project.image} alt="project"/>
              <div className="content">
                <div className="top">
                  <h1>
                    <FaLocationDot/>
                    {project.location}
                  </h1>
                  <h1>
                    <BsBuildings/>
                    {project.desc}
                  </h1>
                </div>
                <p>
                  <span><TbRulerMeasure2/> {project.space}</span>
                  <span><LuBedDouble/> {project.outlook}</span>
                </p>
                <p>
                  <span className='price'>LE {project.price}</span>
                  <button>{project.status}</button>
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