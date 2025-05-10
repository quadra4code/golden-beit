import axios from 'axios';
import { notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHandshake } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdDesignServices } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import React, {createContext, useState, useEffect} from 'react';
const AppContext = createContext();
export const AppProvider = ({children}) => {
  const navigate = useNavigate()
  const [popupContent, setPopupContent] = useState('');
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
  const [isReview, setIsReview] = useState(false)
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
  const icons = [<FaHandshake/>,<GiTakeMyMoney/>,<MdDesignServices/>,<MdOutlineInventory/>]
  //////////////// unAuth handle//////////
  const handleUnAuth = async() => {
    localStorage.removeItem('golden-beit-website-token')
    localStorage.removeItem('referral_code')
    localStorage.removeItem('name')
    await setTimeout(()=>{
      openNotificationWithIcon('error','قم يتسجيل الدخول من جديد ');
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
    if(token){
      setLoading(true)
      axios.get('https://api.goldenbeit.com/core/recent-units'
      )
      .then(response => {
        setNewArrivalUnits(response.data.data)
      })
      .catch(error => {console.error(error);setLoading(false)})
      .finally(()=>{setLoading(false)})
    }
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
        openNotificationWithIcon('error','لا يوجد مطابقة لبحثك')
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
      openNotificationWithIcon('success','تم إضافة الوحدة بنجاح')
    })
    .catch((err)=>{
      if(err.status===401){
        openNotificationWithIcon('info','برجاء تسجيل الدخول اولا')
        return
      }
      openNotificationWithIcon('error','حدث خطأ برجاء المحاولة لاحقا')
      console.log(err);
    })
  }
  ////// post Home screen search
  const handleApplySearch = (project_id, city_id, unit_type_id,  min_price, max_price)=> {
    const projectIdStr = String(project_id);
    const cityIdStr = String(city_id);
    const unitTypeStr = String(unit_type_id);
    console.log(project_id, city_id, unit_type_id);
    axios.post(
      'https://api.goldenbeit.com/core/filter-paginated-units',
      {
        project_id :projectIdStr,
        city_id: cityIdStr ,
        unit_type_id: unitTypeStr ,
        // min_price,
        // max_price,
      },
    )
    .then(res => {
      console.log(res.data.data);
      if(res.data.data.all.length<1){
        openNotificationWithIcon('error','لا يوجد مطابقة لبحثك')
        return
      }
      navigate("/all-units")
      setAllUnits(res.data.data);
    })
    .catch(err => {
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
        openNotificationWithIcon('success','سيتم التواصل معك من خلال أحد ممثلي خدمة العملاء')
      })
      .catch((err) => {
        if(err.status===401){
          openNotificationWithIcon('info','برجاء تسجيل الدخول اولا')
          return
        }
        console.log(err);
        openNotificationWithIcon('error',err.response.data.msg)
      })
    }else{
      openNotificationWithIcon('info','برجاء تسجيل الدخول لاضافة وحدتك')
    }
    
  }
  const handleLogout =()=> {
    localStorage.removeItem('name');
    localStorage.removeItem('golden-beit-website-token');
    localStorage.removeItem('referral_code');
    localStorage.setItem('oneTimeInquiry','true');
    window.location.reload();
  }
  const handleAddReview = () => {
    if(token){
      axios.post(
        'https://api.goldenbeit.com/core/add-review',
        {
          rate:rating,
          review:reviewMessage
        },
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      )
      .then(res => {
        setReviewMessage('')
        setRating(0)
        openNotificationWithIcon('success','شكرا لتقييمك')
      })
      .catch(err => {
        if(err.status===401){
          handleUnAuth()
        }
        console.log(err);
      })
    }else{
      openNotificationWithIcon('info','برجاء تسجيل الدخول لاضافة تقييمك')
    }
    
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
      isLogin, setIsLogin
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext