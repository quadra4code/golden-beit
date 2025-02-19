import React, {useContext} from 'react'
import { FaHandshake } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdDesignServices } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import  AppContext  from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
const WhyUs = () => {
  const {setFaqId} = useContext(AppContext)
  const navigate = useNavigate()
  const services = [
    {
      icon: <FaHandshake/>,
      title: 'استشارات عقارية',
      description: 'Providing peace of mind with our responsive and attentive customer service',
      content :`
      كيف تختار العقار المثالي للاستثمار؟
      الموقع، ثم الموقع، ثم الموقع!
      لا شك أن الموقع هو العنصر الأهم، لذا اختر منطقة واعدة تشهد تطورًا اقتصاديًا وسكانيًا، فهذا يضمن لك زيادة مستمرة في قيمة العقار.
      احسب العائد المتوقع بحكمة
      قبل الشراء، احسب نسبة العائد السنوي المحتمل من الإيجار أو إعادة البيع، فالتخطيط الجيد يضمن لك استثمارًا ناجحًا.
      ادرس المخاطر قبل أن تستثمر
      تعرف على القوانين المحلية، حالة السوق، ونسبة الطلب والعرض في المنطقة، فهذا يساعدك على تجنب المفاجآت غير السارة
      `
    },
    {
      icon: <GiTakeMyMoney/>,
      title: 'استشارات استثمارية',
      description: 'Stay informed with our clear and honest approach to buying your home',
      content :`
      ما هي أفضل طرق تمويل العقارات؟
      إذا كنت تفكر في شراء عقار، فهناك عدة طرق لتمويله، ولكل طريقة مميزاتها:
      القرض العقاري: إذا كنت تفضل دفع ثمن العقار على أقساط، فالبنوك توفر لك هذه الفرصة بفوائد متفاوتة، لذا احرص على مقارنة العروض المختلفة للحصول على أفضل سعر فائدة.
      التقسيط المباشر من المطور: بعض المطورين يتيحون خطط سداد مرنة دون الحاجة إلى التعامل مع البنوك، مما قد يكون خيارًا مريحًا.
      الشراء النقدي: إن كنت تمتلك السيولة الكافية، فالدفع النقدي سيجنبك الفوائد الإضافية ويمنحك قوة تفاوضية أكبر عند الشراء.
      نصيحة ذهبية: قارن بين جميع الخيارات واختر ما يناسب ميزانيتك وأهدافك الاستثمارية.
      `
    },
    {
      icon: <MdDesignServices/>,
      title: 'استشارات  قانونية',
      description: 'Our services adapt to your unique needs, making your journey stress-free',
      content :`
      كيف تبيع عقارك بسرعة وبأفضل سعر؟
      إذا كنت ترغب في بيع عقارك بأفضل قيمة وفي أسرع وقت، اتبع هذه الخطوات:
      جهّز العقار للبيع: أعد طلاء الجدران، أصلح أي أعطال، واهتم بجماليات العقار لجذب المشترين المحتملين.
      استغل قوة التسويق: استخدم منصات العقارات الإلكترونية، الإعلانات المدفوعة، وشبكات التواصل الاجتماعي لزيادة فرص البيع.
      حدد السعر بذكاء: اجعل السعر تنافسيًا بناءً على الأسعار في السوق، وتأكد من تقديم العقار بشكل احترافي لجذب العروض الجادة.
      `
    },
    {
      icon: <MdOutlineInventory/>,
      title: ' استشارات مالية',
      description: `Benefit from our team's seasoned expertise for a smooth buying experience`,
      content :`
      أخطاء شائعة عند شراء عقار: تجنبها قبل فوات الأوان!
      عدم التحقق من الوضع القانوني: تأكد من أن العقار مسجل رسميًا وليس عليه أي مشاكل قانونية.
      التسرع في الشراء: لا تتخذ قرار الشراء قبل أن تبحث جيدًا وتقارن بين العروض المختلفة.
      إهمال الفحص الهندسي: بعض العيوب في العقارات لا تظهر للعين المجردة، لذا استعن بمهندس مختص لفحص العقار قبل الشراء
      `
    }
  ]
  // const handleOpenPopup = (header, content) => {
  //   setPopupHeader(header)
  //   setIsNormalPop(false)
  //   setPopupContent(content)
  //   setIsOpen(true)
  // }
  const handleConsultions = (id) =>{
    setFaqId(id)
    navigate('/faq')
  }
  return (
    <section className='why-us' id='why-us'>
      <h1>لماذا نحن ؟؟</h1>
      <h3>لاننا نسعى للارتقاء بتجربة شراء منزلك بالخبرة و النزاهة و الخدمة الشخصية التي لا مثيل لها</h3>
      <h1>خدماتنا المتميرة</h1>
      <div className='cols-container'>
        {services.map((service, index) => 
          <div className="col" key={index}
            onClick={()=>handleConsultions(index)}>
            {service.icon}
            <h1>{service.title}</h1>
            <span>{service.description}</span>
            <FaArrowLeft className='arrow'/>
          </div>        
        )}
      </div>
    </section>
  )
}

export default WhyUs