import axios from 'axios';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
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
  const [newArrivalUnits, setNewArrivalUnits] = useState();
  const [loading, setLoading] = useState(false);
  const [numberInpValue, setNumberInpValue] = useState()
  const [isNormalPop, setIsNormalPop] = useState(false)
  const [isReview, setIsReview] = useState(false)
  const [ourReviewsData, setOurReviewsData] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const [rating, setRating] = useState(0);
  const [faqId, setFaqId] = useState(0);
  const [changePassUi, setChangePassUi] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');
  const token = localStorage.getItem('token');
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description
    });
  };
  const icons = [<FaHandshake/>,<GiTakeMyMoney/>,<MdDesignServices/>,<MdOutlineInventory/>]
  //////////////// unAuth handle//////////
  const handleUnAuth = async() => {
    localStorage.removeItem('token')
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
    axios.get('https://golden-gate-three.vercel.app/core/get-form-data')
    .then(response => {
      setFilterData(response.data.data)
    })
    .catch(error => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  /////////////// get articles in home screen
  useEffect(()=>{
    setLoading(true)
    axios.get('https://golden-gate-three.vercel.app/core/home-articles')
    .then(response => {
      setArticlesData(response.data.data)
    })
    .catch(error => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  /////////////// get consultations in home screen
  useEffect(()=>{
    setLoading(true)
    axios.get('https://golden-gate-three.vercel.app/core/home-consultation-types')
    .then(response => {
      console.log(response.data);
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
    axios.get('https://golden-gate-three.vercel.app/core/home-reviews')
    .then(response => {
      setOurReviewsData(response.data.data)
    })
    .catch(error => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  /////////////// get home-featured-units screen
  useEffect(()=>{
    setLoading(true)
    axios.get('https://golden-gate-three.vercel.app/core/home-featured-units')
    .then(response => {
      console.log(response.data.data);
      setFeaturedUnits(response.data.data)
    })
    .catch(error => console.error(error))
    .finally(()=>{setLoading(false)})
  },[])
  ///////////// get all winners
  useEffect(()=>{
    if(token){
      setLoading(true)
      axios.get('https://golden-gate-three.vercel.app/core/recent-units'
      )
      .then(response => {
        console.log(response.data.data);
        setNewArrivalUnits(response.data.data)
      })
      .catch(error => {console.error(error);setLoading(false)})
      .finally(()=>{setLoading(false)})
    }
  },[])
  // ///////handleSingleUnitDetails//////
  const handleSingleUnitDetails = (id) => {
    axios.get(`https://golden-gate-three.vercel.app/core/unit-details/${id}`)
      .then((res) => {
        setSingleUnit(res.data.data);
        navigate(`/all-units/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //////////////post all units screen filter
  const handleFilterClick = (unit_type_id,project_id, payment_method, city_id, min_price, max_price, min_area, max_area,selectedFloor, selectedFacade)=> {
    setLoading(true)
    axios.post(
      'https://golden-gate-three.vercel.app/core/filter-properties',
      {
        unit_type_id,
        project_id,
        payment_method,
        city_id,
        floor:selectedFloor,
        facade:selectedFacade,
        min_price,
        max_price,
        min_area,
        max_area,
      },
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    )
    .then(res => {
      if(res.data.data.length<1){
        openNotificationWithIcon('error','لا يوجد مطابقة لبحثك')
        return
      }
      setAllUnits(res.data.data);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(()=>{setLoading(false)})
  }
  ////// post Home screen search
  const handleApplySearch = (project_id, city_id, min_price, max_price)=> {
    axios.post(
      'https://golden-gate-three.vercel.app/core/filter-properties',
      {
        project_id,
        city_id ,
        min_price,
        max_price,
      },
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    )
    .then(res => {
      if(res.data.data.length<1){
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
        'https://golden-gate-three.vercel.app/core/request-property',
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
      .catch(err => {
        if(err.status===401){
          handleUnAuth()
        }
        console.log(err.status);
      })
    }else{
      openNotificationWithIcon('info','برجاء تسجيل الدخول لاضافة وحدتك')
    }
    
  }
  const handleAddReview = () => {
    if(token){
      axios.post(
        'https://golden-gate-three.vercel.app/core/add-review',
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
      changePassUi, setChangePassUi,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext