// import React, {useState} from 'react';
// import buyer from '../Images/buyer.png';
// import seller from '../Images/seller.png';
// import broker from '../Images/broker.png';
// const Services = () => {
//   return (
//     <section className='services'>
//       <img src={buyer} alt="background-image" />
//       <div className="content">
//         <div className='slider-container'>
//           <div className='img-holder'>
//             <img src={buyer} alt="buyer" />
//             <img src={seller} alt="seller" />
//             <img src={broker} alt="broker" />
//           </div>
//           <div className='paginator'>
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>
//         <div className='img-info'>
//           <h1>المشترى</h1>
//           <div className='subtitles'>
//             <p>
//               الدور : <br />
//               <span> الشخص او الجهة التي تبحث عن شراء عقار </span>
//             </p>
//             <p>
//               الاهداف : <br />
//               <span>العثور علي العقار المناسب لاحتياجاته.</span>
//               <span>التفاوض للحصول على أفضل سعر.</span>
//               <span>إتمام عملية الشراء بطرق قانونية ومناسبة.</span>
//             </p>
//           </div>
//           <button className='details-btn'>التفاصيل</button>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Services
import React, { useState } from 'react';
import buyer from '../Images/buyer.png';
import seller from '../Images/seller.png';
import broker from '../Images/broker.png';

const Services = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      title: 'المشترى',
      role: 'الشخص أو الجهة التي تبحث عن شراء عقار',
      goals: [
        'العثور على العقار المناسب لاحتياجاته.',
        'التفاوض للحصول على أفضل سعر.',
        'إتمام عملية الشراء بطرق قانونية ومناسبة.',
      ],
      image: buyer,
    },
    {
      title: 'البائع',
      role: 'الشخص أو الجهة التي ترغب في بيع عقار',
      goals: [
        'تحديد السعر المناسب للعقار.',
        'الترويج للعقار بشكل فعال.',
        'التفاوض مع المشترين وإتمام عملية البيع.',
      ],
      image: seller,
    },
    {
      title: 'الوسيط',
      role: 'الشخص أو الجهة التي تعمل كوسيط بين البائع والمشتري',
      goals: [
        'تسهيل التواصل بين الأطراف.',
        'ضمان صفقة قانونية ومرضية للطرفين.',
        'توفير استشارات متخصصة أثناء الصفقة.',
      ],
      image: broker,
    },
  ];
  return (
    <section
      className="services"
      style={{
        backgroundImage: `url(${slides[activeSlide].image})`,
      }}
    >
      <div className="content">
        <div className="slider-container">
          <div className="img-holder">
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide.image}
                alt={slide.title}
                className={index === activeSlide ? 'active' : ''}
                onClick={() => setActiveSlide(index)}
                style={{
                  border: index === activeSlide ? '3px solid #fff' : '2px solid #fff',
                }}
              />
            ))}
          </div>
          <div className="paginator">
            {slides.map((_, index) => (
              <span
                key={index}
                onClick={() => setActiveSlide(index)}
                style={{
                  backgroundColor: index === activeSlide ? 'var(--primary-color)' : 'rgb(169 169 169)',
                }}
              ></span>
            ))}
          </div>
        </div>
        <div className="img-info">
          <h1>{slides[activeSlide].title}</h1>
          <div className="subtitles">
            <p>
              الدور: <br />
              <span>{slides[activeSlide].role}</span>
            </p>
            <p>
              الأهداف: <br />
              {slides[activeSlide].goals.map((goal, index) => (
                <span key={index}>{goal}</span>
              ))}
            </p>
          </div>
          <button className="details-btn">التفاصيل</button>
        </div>
      </div>
    </section>
  );
};

export default Services;
