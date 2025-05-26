import axios from 'axios';
import { notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHandshake } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdDesignServices } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import Notification from '../Components/Notification';
import {createContext, useState, useEffect, useRef} from 'react';
const AppContext = createContext();
export const AppProvider = ({children}) => {
  const navigate = useNavigate()
  const [popupContent, setPopupContent] = useState('');
  const [notifications, setNotifications] = useState();
  const [popupHeader, setPopupHeader] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [singleUnit, setSingleUnit] = useState();
  const [filterData, setFilterData] = useState();
  const [articlesData, setArticlesData] = useState();
  const [consultationsData, setConsultationsData] = useState();
  const [winnersData, setWinnersData] = useState();
  const [allUnits, setAllUnits] = useState();
  const [featuredUnits, setFeaturedUnits] = useState();
  const [mostViewedUnits, setMostViewedUnits] = useState();
  const [newArrivalUnits, setNewArrivalUnits] = useState();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("5");
  const [isLogin, setIsLogin] = useState(true);
  const [numberInpValue, setNumberInpValue] = useState()
  const [isNormalPop, setIsNormalPop] = useState(false)
  const [isReview, setIsReview] = useState()
  const [ourReviewsData, setOurReviewsData] = useState(false)
  const [currencies, setCurrencies] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const [rating, setRating] = useState(0);
  const [faqId, setFaqId] = useState(0);
  const [changePassUi, setChangePassUi] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');
  const token = localStorage.getItem('golden-beit-website-token');
  const unitId = window.location.pathname
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description
    });
  };
  const notificationRef = useRef();
  const icons = [<FaHandshake/>,<GiTakeMyMoney/>,<MdDesignServices/>,<MdOutlineInventory/>]
  //////////////// unAuth handle//////////
  const handleUnAuth = async() => {
    localStorage.removeItem('golden-beit-website-token')
    localStorage.removeItem('referral_code')
    localStorage.removeItem('name')
    await setTimeout(()=>{
      notificationRef.current.show('error','قم بتسجيل الدخول من جديد')
    },3000)
    window.location.href='/'
  }
  ///////////////// get filter data in all units screen
  useEffect(()=>{
    setLoading(true)
    axios.get('https://api.goldenbeit.com/core/get-form-data')
    .then(response => {
      setFilterData(response.data.data)
      setCurrencies(response.data.data.currencies)
    })
    .catch(error => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  /////////////// get articles in home screen
  useEffect(()=>{
    if(token){
      handleGetNotifications();
      setInterval(() => {
        handleGetNotifications();
      }, 300000);
    }
  },[])
  useEffect(()=>{
    setLoading(true)
    axios.get('https://api.goldenbeit.com/core/home-articles')
    .then(response => {
      setArticlesData(response.data.data)
    })
    .catch(error => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  /////////////// get consultations in home screen
  useEffect(()=>{
    setLoading(true)
    axios.get('https://api.goldenbeit.com/core/home-consultation-types')
    .then(response => {
      const responseData = response.data.data
      responseData.map((ele,key)=>{ele['iconKey']=icons[key]})
      setConsultationsData(responseData)
    })
    .catch(error => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  /////////////// get Our Reviews in home screen
  useEffect(()=>{
    setLoading(true)
    axios.get('https://api.goldenbeit.com/core/home-reviews')
    .then(response => {
      setOurReviewsData(response.data.data)
    })
    .catch(error => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  /////////////// get home-featured-units screen
  useEffect(()=>{
    setLoading(true)
    axios.get('https://api.goldenbeit.com/core/home-featured-units')
    .then((response) => {
      console.log(response.data.data);
      setFeaturedUnits(response.data.data)
    })
    .catch((error) => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  /////////////// get most-viewed-units section
  useEffect(()=>{
    setLoading(true)
    axios.get('https://api.goldenbeit.com/core/home-most-viewed-units')
    .then(response => {
      setMostViewedUnits(response.data.data)
    })
    .catch(error => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  ///////////// get all winners
  useEffect(()=>{
    setLoading(true)
    axios.get('https://api.goldenbeit.com/core/recent-units'
    )
    .then(response => {
      setNewArrivalUnits(response.data.data)
    })
    .catch(error => {console.error(error)})
    .finally(()=>{setLoading(false)})
  },[])
  // ///////handleSingleUnitDetails//////
  const handleSingleUnitDetails = (id) => {
    axios.get(`https://api.goldenbeit.com/core/unit-details/${id}`)
      .then((res) => {
        setSingleUnit(res.data.data);
        navigate(`/all-units/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //////////////post all units screen filter 
  const handleFilterClick = (unit_type_id,project_id, city_id, min_price, max_price, min_area, max_area,selectedFloor, selectedFacade)=> {
    setLoading(true);
    console.log(project_id, city_id, );
    axios.post(
      'https://api.goldenbeit.com/core/filter-paginated-units',
      {
        unit_type_id,
        project_id,
        city_id,
        floor:selectedFloor,
        facade:selectedFacade,
        min_price,
        max_price,
        min_area,
        max_area,
      },
    )
    .then(res => {
      if(res.data.data.length<1){
        notificationRef.current.show('error','لا يوجد مطابقة لبحثك')
        return
      }
      setAllUnits(res.data.data.all);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(()=>{setLoading(false)})
  }
  ////// handle add to favourite 
  const handelAddToFav = (id) => {
    axios
    .post(`https://api.goldenbeit.com/core/add-favorite`,
    {
      unit:id
    },
    {
      headers: { 'Authorization': `Bearer ${token}` },
    }
    )
    .then((res)=>{
      notificationRef.current.show('success','تم إضافة الوحدة للمفضلة بنجاح')
    })
    .catch((err)=>{
      if(err.status===401){
        notificationRef.current.show('info','برجاء تسجيل الدخول اولا')
        return
      }
      notificationRef.current.show('error','حدث خطأ برجاء المحاولة لاحقا')
      console.log(err);
    })
  }
  ////// post Home screen search
  const handleApplySearch = (project_id, city_id, unit_type_id,  min_price, max_price)=> {
    console.log(typeof project_id, typeof city_id, typeof unit_type_id);
    axios.post(
      'https://api.goldenbeit.com/core/filter-paginated-units',
      {
        project_id :project_id,
        city_id: city_id ,
        unit_type_id: unit_type_id ,
        // min_price,
        // max_price,
      },
    )
    .then((res) => {
      if(res.data.data.all.length<1){
        console.log(res.data.data.all);
        notificationRef.current.show('error','لا يوجد مطابقة لبحثك')
        return
      }
      console.log(res.data.data.all);
      setAllUnits(res.data.data.all);
      navigate("/all-units")
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const handleReqUnit = () => {
    if(token){
      axios.post(
        'https://api.goldenbeit.com/core/request-unit',
        {
          unit_id:singleUnit.id
        },
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      )
      .then(res => {
        notificationRef.current.show('success','سيتم التواصل معك من خلال أحد ممثلي خدمة العملاء')
      })
      .catch((err) => {
        if(err.status===401){
          notificationRef.current.show('info','برجاء تسجيل الدخول اولا')
          return
        }
        console.log(err);
        notificationRef.current.show('error','حدث خطأ برجاء المحاولة لاحقا')
      })
    }else{
      notificationRef.current.show('info','برجاء تسجيل الدخول اولا')
    }
    
  }
  const handleLogout =()=> {
    localStorage.removeItem('name');
    localStorage.removeItem('golden-beit-website-token');
    localStorage.removeItem('referral_code');
    localStorage.setItem('oneTimeInquiry','true');
    window.location.href='/'
  }
  const handleAddReview = () => {
    if (!reviewMessage) {
      notificationRef.current.show('info', 'يرجى تعبئة التقييم أولًا');
      return;
    }
    if(token){
      axios
      .post(
        'https://api.goldenbeit.com/core/add-review',
        {
          rate:rating,
          review:reviewMessage
        },
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      )
      .then((response) => {
        setReviewMessage('')
        setRating(0)
        setIsOpen(false)
        setIsNormalPop(false)
        setIsReview(false)
        notificationRef.current.show('success','شكرا لتقييمك')
      })
      .catch(err => {
        if(err.status===401){
          handleUnAuth()
        }
        console.log(err);
        notificationRef.current.show('success',err.response.data.data.msg);
      })
    }else{
      notificationRef.current.show('info','برجاء تسجيل الدخول اولا')
    }
  }
  const handleGetNotifications = () => {
    axios 
    .get('https://api.goldenbeit.com/engagement/all-notifications',
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    )
    .then((response) => {
      console.log(response);
      setNotifications(response.data.data);
    })
    .catch((error) => {
      console.error(error);
      if(error.status===401){
        handleUnAuth()
      }
    })
  }
  const handleDeleteNotification = (id) => {
    console.log('sfsf');
    console.log(id);
    if(!id) return
    axios 
    .delete(`https://api.goldenbeit.com/engagement/delete/${id}`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    )
    .then((response) => {
      console.log(response);
      setNotifications(notifications.filter((item) => item.id !== id));
    })
    .catch((error) => {
      console.error(error);
      if(error.status===401){
        handleUnAuth()
      }
    })
  }
  const handleDeleteAllNotifications = (id) => {
    axios 
    .delete(`https://api.goldenbeit.com/engagement/delete/all`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    )
    .then((response) => {
      console.log(response);
      setNotifications(response.data.data);
    })
    .catch((error) => {
      console.error(error);
      if(error.status===401){
        handleUnAuth()
      }
    })
  }
  return (
    <AppContext.Provider 
      value={{isOpen, setIsOpen, popupContent,newArrivalUnits,setNewArrivalUnits,
      setPopupContent, popupHeader, setPopupHeader ,setSingleUnit,singleUnit,
      filterData, setFilterData, loading, setLoading,articlesData, allUnits,
      contextHolder, openNotificationWithIcon, setAllUnits,isReview, setIsReview,
      handleFilterClick, handleApplySearch, token, winnersData, setWinnersData,
      numberInpValue, setNumberInpValue, handleReqUnit, isNormalPop, setIsNormalPop,
      rating, setRating,handleAddReview, setReviewMessage, consultationsData,
      faqId, setFaqId, ourReviewsData, handleUnAuth, featuredUnits, handleSingleUnitDetails,
      changePassUi, setChangePassUi,currencies, setCurrencies,handelAddToFav,
      mostViewedUnits, setMostViewedUnits,handleLogout,userType, setUserType,
      isLogin, setIsLogin ,notificationRef ,handleGetNotifications, notifications,
      setNotifications,handleDeleteAllNotifications, handleDeleteNotification
      }}>
      <Notification ref={notificationRef} />
      {children}
    </AppContext.Provider>
  )
}

export default AppContext