import React, {useContext} from 'react';
import { FaArrowLeft } from "react-icons/fa";
import article from '../Images/article.png';
import  AppContext  from '../Context/AppContext';
const Articles = () => {
  const {isOpen, setIsOpen, setPopupHeader, setPopupContent} = useContext(AppContext)
  const articles = [
    {
    title: 'عنوان المقالة',
    description: 'مقالة تتحدث عن العمل الحر وكيف يمكن للشخص أن يبدأ في العمل الحر ويحقق دخل مالي جيد',
    date: 'June 20 / 7 Min Read',
    image: article,
    content:`
    تجاهات السوق العقاري لعام 2025: ماذا نتوقع؟
      زيادة الطلب على العقارات الذكية مع التطور التكنولوجي، ستصبح المنازل الذكية خيارًا أساسيًا للمشترين.
      اهتمام أكبر بالعقارات المستدامة نتيجة ارتفاع الوعي البيئي، ستزداد شعبية المشاريع الصديقة للبيئة.
      ارتفاع الأسعار في المناطق الحيوية بسبب زيادة الطلب على العقارات في المدن الكبرى والمناطق المزدهرة.
    `
    },
    {
    title: 'عنوان المقالة',
    description: 'مقالة تتحدث عن العمل الحر وكيف يمكن للشخص أن يبدأ في العمل الحر ويحقق دخل مالي جيد',
    date: 'June 20 / 7 Min Read',
    image: article,
    content:`
      هل تخطط لشراء منزلك الأول؟ إليك أهم النصائح!
      حدد احتياجاتك جيدًا: ما هو عدد الغرف الذي تحتاجه؟ هل تريد شرفة أو حديقة؟ ضع أولوياتك بوضوح.
      اختر الحي بعناية: تأكد من توفر الخدمات الأساسية، المدارس، المواصلات، والأمان في المنطقة.
      تفاوض على السعر بحكمة: لا تتردد في طلب خصم أو البحث عن عروض أفضل، فالتفاوض جزء أساسي من عملية الشراء.
    `
    },
    {
    title: 'عنوان المقالة',
    description: 'مقالة تتحدث عن العمل الحر وكيف يمكن للشخص أن يبدأ في العمل الحر ويحقق دخل مالي جيد',
    date: 'June 20 / 7 Min Read',
    image: article,
    content:` 
      الاستثمار في العقارات التجارية أم السكنية؟ أيهما أفضل لك؟
      العقارات التجارية: تحقق عوائد مرتفعة لكنها تحتاج إلى رأس مال كبير.
      العقارات السكنية: أكثر استقرارًا، لكنها توفر عوائد أقل نسبيًا.
      القرار النهائي؟ يعتمد على ميزانيتك ومدى استعدادك للمخاطرة والاستثمار طويل الأجل.
    `
    },
  ]
  const handleArticleClick = (header, content) => {
    setPopupHeader(header)
    setPopupContent(content)
    setIsOpen(true)
  }
  return (
    <section className='articles'>
      <article className='article block'>
        <div className="col">
          <span className='rounded'>Business</span>
          <h2>{articles[0].title}</h2>
          <p>{articles[0].description}</p>
          <div className='footer' 
            onClick={()=>handleArticleClick(articles[0].title, articles[0].content)}>
            <p>{articles[0].date}</p>
            <FaArrowLeft/>
          </div>
        </div>
        <img src={article} alt="article-image" />
      </article>     
      <div className="row-article">
        <article  className='article'>
          <img src={articles[0].image} alt="article-image" />
          <div className="col">
            <h2>{articles[0].title}</h2>
            <p>{articles[0].description}</p>
            <div className='footer'
              onClick={()=>handleArticleClick(articles[1].title, articles[1].content)}>
              <span>{articles[0].date}</span>
              <FaArrowLeft/>
            </div>
          </div>
        </article>     
        <article  className='article'>
          <img src={articles[0].image} alt="article-image" />
          <div className="col">
            <h2>{articles[0].title}</h2>
            <p>{articles[0].description}</p>
            <div className='footer'
              onClick={()=>handleArticleClick(articles[2].title, articles[2].content)}>
              <span>{articles[0].date}</span>
              <FaArrowLeft/>
            </div>
          </div>
        </article>     
      </div>
    </section>
    // <section className='articles'>
    //   {articles.map((article, index) => 
    //     <article key={index} className='article'>
    //       <img src={article.image} alt="article-image" />
    //       <div className="col">
    //         <span className='rounded'>Business</span>
    //         <h2>{article.title}</h2>
    //         <p>{article.description}</p>
    //         <div className='footer'>
    //           <span>{article.date}</span>
    //           <FaArrowLeft/>
    //         </div>
    //       </div>
    //     </article>      
    //   )}
    // </section>
  )
}

export default Articles