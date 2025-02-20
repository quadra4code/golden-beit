import React, { useState, useEffect, useContext } from 'react';
import bgImage from '../Images/unnamed.jpg'
import AppContext from '../Context/AppContext';
import Popup from '../Components/Popup';
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const {consultationsData, faqId, contextHolder} =useContext(AppContext)
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const faqs = [
    {
      question: " كيف تختار العقار المثالي للاستثمار؟",
      answer: ` الموقع، ثم الموقع، ثم الموقع!
        لا شك أن الموقع هو العنصر الأهم، لذا اختر منطقة واعدة تشهد تطورًا اقتصاديًا وسكانيًا، فهذا يضمن لك زيادة مستمرة في قيمة العقار.
        احسب العائد المتوقع بحكمة
        قبل الشراء، احسب نسبة العائد السنوي المحتمل من الإيجار أو إعادة البيع، فالتخطيط الجيد يضمن لك استثمارًا ناجحًا.
        ادرس المخاطر قبل أن تستثمر
        تعرف على القوانين المحلية، حالة السوق، ونسبة الطلب والعرض في المنطقة، فهذا يساعدك على `,
    },
    {
      question: "ما هي أفضل طرق تمويل العقارات؟",
      answer: `إذا كنت تفكر في شراء عقار، فهناك عدة طرق لتمويله، ولكل طريقة مميزاتها:
        القرض العقاري: إذا كنت تفضل دفع ثمن العقار على أقساط، فالبنوك توفر لك هذه الفرصة بفوائد متفاوتة، لذا احرص على مقارنة العروض المختلفة للحصول على أفضل سعر فائدة.
        التقسيط المباشر من المطور: بعض المطورين يتيحون خطط سداد مرنة دون الحاجة إلى التعامل مع البنوك، مما قد يكون خيارًا مريحًا.
        الشراء النقدي: إن كنت تمتلك السيولة الكافية، فالدفع النقدي سيجنبك الفوائد الإضافية ويمنحك قوة تفاوضية أكبر عند الشراء.`,
    },
    {
      question: "كيف تبيع عقارك بسرعة وبأفضل سعر؟",
      answer: `إذا كنت ترغب في بيع عقارك بأفضل قيمة وفي أسرع وقت، اتبع هذه الخطوات:
        جهّز العقار للبيع: أعد طلاء الجدران، أصلح أي أعطال، واهتم بجماليات العقار لجذب المشترين المحتملين.
        استغل قوة التسويق: استخدم منصات العقارات الإلكترونية، الإعلانات المدفوعة، وشبكات التواصل الاجتماعي لزيادة فرص البيع.
        حدد السعر بذكاء: اجعل السعر تنافسيًا بناءً على الأسعار في السوق، وتأكد من تقديم العقار بشكل احترافي لجذب العروض الجادة.`,
    },
    {
      question: "أخطاء شائعة عند شراء عقار: تجنبها قبل فوات الأوان!",
      answer: `
        عدم التحقق من الوضع القانوني: تأكد من أن العقار مسجل رسميًا وليس عليه أي مشاكل قانونية.
        التسرع في الشراء: لا تتخذ قرار الشراء قبل أن تبحث جيدًا وتقارن بين العروض المختلفة.
        إهمال الفحص الهندسي: بعض العيوب في العقارات لا تظهر للعين المجردة، لذا استعن بمهندس `
    },
    // Add more FAQs as needed
  ];
  console.log(
    consultationsData[0]
  );
  
  return (
    <main className='faq-main'>
      <Popup/>
      {contextHolder}
      <div className="faq-page">
        <div className='faq-header'>
          {/* <img src={bgImage} alt="" /> */}
          <span> 
            <h1>
              الأسئلة الشائعة 
            </h1>
            فيما يلي إجابات لبعض الأسئلة الأكثر شيوعًا حول العقارات بشكل عام  .
          </span>
        </div>
        <div className="faq-list">
          {consultationsData&& consultationsData[faqId].consults.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleAnswer(index)}>
                <h2>{faq.title}</h2>
                <span>{openIndex === index ? '-' : '+'}</span>
              </div>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQ;