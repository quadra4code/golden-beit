import React, {useContext} from 'react'
import { FaArrowLeft } from "react-icons/fa";
import  AppContext  from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
const WhyUs = () => {
  const {setFaqId, consultationsData } = useContext(AppContext)
  const navigate = useNavigate()
  const handleConsultionFaq = (id) =>{
    setFaqId(id)
    navigate(`/faq/${id}`)
  }
  return (
    <section className='why-us' id='why-us'>
      {/* <h1>لماذا نحن ؟؟</h1>
      <h3>لاننا نسعى للارتقاء بتجربة شراء منزلك بالخبرة و النزاهة و الخدمة الشخصية التي لا مثيل لها</h3> */}
      <h1>خدماتنا المتميرة</h1>
      <div className='cols-container'>
        {consultationsData&& consultationsData.map((service, index) => 
          <div className="col" key={index}
            onClick={()=>handleConsultionFaq(service.id)}>
            <i className='icon'>{service.iconKey}</i>
            <h1>{service.name}</h1>
            <span>{service.brief}</span>
            <FaArrowLeft className='arrow'/>
          </div>        
        )}
      </div>
    </section>
  )
}

export default WhyUs