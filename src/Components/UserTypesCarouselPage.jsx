import buyer from "../Images/buyer.png"
import seller from "../Images/seller.png"
import median from "../Images/broker.png"
// App.jsx
import React, { useState, useContext } from 'react';
import Background from "./Carousel/carousel_page_bg";
import LeftSection from "./Carousel/carousel_page_data_section";
import ImageCarousel from "./Carousel/carousel_page_imgs_carousel";
import Pagination from "./Carousel/carousel_page_pagination";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
function UserTypesCarouselPage() {
  const { setUserType, setIsLogin} = useContext(AppContext);
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    setUserType(id);
    setIsLogin(false);
    navigate(`/register`);
  }
  const dataItems = [
    {
      id: 0,
      uniqueId:0,
      background: buyer,
      image: buyer,
      title: 'المشتري',
      subtitle: 'الدور',
      paragraph: 'الشخص أو الجهة التي تبحث عن شراء عقار',
      subtitle2: 'الأهداف',
      listItems: ['إتمام عملية الشراء بطرق قانونية و مناسبة','التفاوض للحصول على أفضل سعر','العثور على العقار المناسب لاحتياجاته'],
      detailsUrl: ()=>{handleNavigate('5')},
    },
    {
      id: 1,
      uniqueId:1,
      background: seller,
      image: seller,
      title: 'البائع',
      subtitle: 'الدور',
      paragraph: 'الشخص أو الجهة التي تمتلك العقار وتعرضه للبيع',
      subtitle2: 'الأهداف',
      listItems: ['الالتزام بالإجراءات القانونية لنقل الملكية', 'عرض العقار بشكل جذاب للمستثمرين المحتملين', 'بيع العقار بأفضل سعر ممكن'],
      detailsUrl: ()=>{handleNavigate('6')},
    },
    {
      id: 2,
      uniqueId:2,
      background: median,
      image: median,
      title: ' الوسيط',
      subtitle: ' الدور',
      paragraph: 'الشخص أو الجهة التي تعمل كوسيط بين المشتري والبائع لتسهيل عملية البيع أو الشراء', 
      subtitle2: 'الأهداف',
      listItems: ['الحصول على عمولة عند اتمام الصفقة.','تقديم استشارات حول الأسعار , العقود و الشروط القانونية', 'مساعدة البائعين في تسويق عقاراتهم بفعالية', 'مساعدة المشتريين في العثور على العقارات المناسبة'],
      detailsUrl: ()=>{handleNavigate('7')},
    },
    // {
    //   id: 3,
    //   uniqueId:0,
    //   background: buyer,
    //   image: buyer,
    //   title: 'عنوان ١',
    //   subtitle: 'عنوان فرعي ١',
    //   paragraph: 'هذا نص الفقرة الأولى.',
    //   subtitle2: 'عنوان فرعي ٢',
    //   listItems: ['عنصر ١', 'عنصر ٢', 'عنصر ٣'],
    //   detailsUrl: '/details/0',
    // },
    // {
    //   id: 4,
    //   uniqueId:1,
    //   background: seller,
    //   image: seller,
    //   title: 'عنوان ٢',
    //   subtitle: 'عنوان فرعي ٢',
    //   paragraph: 'هذا نص الفقرة الثانية.',
    //   subtitle2: 'عنوان فرعي ٢',
    //   listItems: ['عنصر أ', 'عنصر ب', 'عنصر ج'],
    //   detailsUrl: '/details/1',
    // },
    // {
    //   id: 5,
    //   uniqueId:2,
    //   background: median,
    //   image: median,
    //   title: 'عنوان ٣',
    //   subtitle: 'عنوان فرعي ٣',
    //   paragraph: 'هذا نص الفقرة الثالثة.',
    //   subtitle2: 'عنوان فرعي ٣',
    //   listItems: ['بند أ', 'بند ب', 'بند ج'],
    //   detailsUrl: '/details/2',
    // }
  ];
  // Manage the carousel order (first item is the chosen one)
  const [carouselOrder, setCarouselOrder] = useState(dataItems);
  // translateX state to animate the carousel-track (in pixels)
  const [translateX, setTranslateX] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const [textAnimating, setTextAnimating] = useState(false);
  const [scalingId, setScalingId] = useState(null);
  const [noTransition, setNoTransition] = useState(false);

  const ITEM_WIDTH = 320;// random value but works!

  const handleSelect = (index) => {
    // If the clicked item is already chosen or an animation is in progress, do nothing.
    if (index === 0 || animating) return;
    setAnimating(true);
    setTextAnimating(true);
    // Store clicked item ID for scaling
    setScalingId(carouselOrder[index].id);

    if(window.matchMedia("(max-width: 1010px)").matches){// if screen width less than 1010 px
      setTranslateX(-index * ITEM_WIDTH*0.815);
    }else if(window.matchMedia("(max-width: 1170px)").matches){// if screen width less than 1170 px
      setTranslateX(-index * ITEM_WIDTH*0.92);
    }else if(window.matchMedia("(max-width: 1280px)").matches){// if screen width less than 1280 px
      setTranslateX(-index * ITEM_WIDTH*1);
    }else{//if screen width more than 1280 px
      // Animate the carousel-track by sliding left by index * ITEM_WIDTH
      setTranslateX(-index * ITEM_WIDTH*1.100);
    }

    // After animation completes, reorder the carousel so that the clicked item becomes first.
    setTimeout(() => {
      setNoTransition(true); // Temporarily disable transitions
      const newOrder = carouselOrder.slice(index).concat(carouselOrder.slice(0, index));
      setCarouselOrder(newOrder);
      // Reset transform
      setTranslateX(0);
      setTextAnimating(false);
      setAnimating(false);
      setScalingId(null); // Reset scaling state
      setTimeout(() => {
        setNoTransition(false); // Re-enable transitions
      }, 50); // Slight delay to ensure transition is properly disabled
    }, 500); // Duration matches the CSS transition (0.5s)
  };

  return (
    <div className="carousel-page">
      <Background backgroundImage={carouselOrder[0].background} />

      <div className="content">
        <div className="sections">
          <LeftSection item={carouselOrder[0]} animateText={textAnimating} />
          <ImageCarousel items={carouselOrder} translateX={translateX} onSelect={handleSelect} scalingId={scalingId} noTransition={noTransition}/>
        </div>
        <Pagination originalItems={dataItems.slice(0, 3)} currentId={carouselOrder[0].id % 3} carouselOrder={carouselOrder} onSelect={handleSelect} />
      </div>
    </div>
  );
}

export default UserTypesCarouselPage;


