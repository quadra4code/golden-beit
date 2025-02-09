import React from 'react'
import image from '../Images/aboutus.png'
const AboutUs = () => {
  return (
    <section className='about-us' id='about-us'>
      <img src={image} alt="about-us" />
      <div className='container'>
        <h1>من نحن ؟!</h1>
        <h6>مجموعة من الوسطاء والشركات العقارية الرائدة والمتخصصة في تقديم وحدات سكنية مميزة تجمع بين التصميم العصري والراحة المثالية. منذ تأسيسنا ونحن نسعى لتحقيق رؤية طموحة تتمثل في توفير حلول سكنية مبتكرة تلبي احتياجات وتطلعات عملائنا. سواء كانوا يبحثون عن منزل الأحلام أو استثمار عقاري مضمون.</h6>
      </div>
    </section>
  )
}

export default AboutUs