import axios from 'axios';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, {createContext, useState, useEffect, useRef} from 'react';
const AppContext = createContext();
export const AppProvider = ({children}) => {
  const navigate = useNavigate()
  const [popupContent, setPopupContent] = useState('');
  const [popupHeader, setPopupHeader] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [singleUnit, setSingleUnit] = useState();
  const [filterData, setFilterData] = useState();
  const [articlesData, setArticlesData] = useState();
  const [winnersData, setWinnersData] = useState();
  const [allUnits, setAllUnits] = useState();
  const [newArrivalUnits, setNewArrivalUnits] = useState();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const token = localStorage.getItem('token')
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description
    });
  };
  ///////////////// get filter data in all units screen
  useEffect(()=>{
    if(token){
      setLoading(true)
      axios.get('https://golden-gate-three.vercel.app/core/get-form-data',
        {headers: {'Authorization': `Bearer ${token}`}}
      )
      .then(response => {
        setFilterData(response.data.data)
      })
      .catch(error => console.error(error))
      .finally(()=>{setLoading(false)})
    }
  },[])
  /////////////// get articles in home screen
  useEffect(()=>{
    if(token){
      setLoading(true)
      axios.get('https://golden-gate-three.vercel.app/core/home-articles',
        {headers: {'Authorization': `Bearer ${token}`}}
      )
      .then(response => {
        console.log(response.data.data);
        setArticlesData(response.data.data)
      })
      .catch(error => console.error(error))
      .finally(()=>{setLoading(false)})
    }
  },[])
  /////////////// get all winners
  useEffect(()=>{
    if(token){
      setLoading(true)
      axios.get('https://golden-gate-three.vercel.app/core/draw-results'
      )
      .then(response => {
        console.log(response.data.data);
        setWinnersData(response.data.data)
      })
      .catch(error => {console.error(error);setLoading(false)})
      .finally(()=>{setLoading(false)})
    }
  },[])
  ///////////// get all units and new arrival units
  useEffect(()=>{
    if(token){
      setLoading(true)
      axios.get('https://golden-gate-three.vercel.app/core/all-properties',
        {headers: {'Authorization': `Bearer ${token}`}}
      )
      .then(res => {
        setAllUnits(res.data.data.all)
        setNewArrivalUnits(res.data.data.recent)
      })
      .catch(err => {console.log(err);})
      .finally(() => setLoading(false))
    }
  },[])
  //////////////post all units screen filter
  const handleFilterClick = (project_id, payment_method, city_id, min_price, max_price)=> {
    setLoading(true)
    axios.post(
      'https://golden-gate-three.vercel.app/core/filter-properties',
      {
        project_id,
        payment_method,
        city_id,
        min_price,
        max_price,
      },
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    )
    .then(res => {
      if(res.data.data.length<1){
        openNotificationWithIcon('error', 'عملية خاطئه ', 'لا يوجد مطابقة لبحثك')
        return
      }
      setAllUnits(res.data.data);
      console.log(res.data);
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
        openNotificationWithIcon('error', 'عملية خاطئه ', 'لا يوجد مطابقة لبحثك')
        return
      }
      navigate("/all-units")
      console.log(res.data);
      setAllUnits(res.data.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <AppContext.Provider 
      value={{isOpen, setIsOpen, popupContent,newArrivalUnits,setNewArrivalUnits,
      setPopupContent, popupHeader, setPopupHeader ,setSingleUnit,singleUnit,
      filterData, setFilterData, loading, setLoading,articlesData, allUnits,
      contextHolder, openNotificationWithIcon, setAllUnits,
      handleFilterClick, handleApplySearch, token, winnersData, setWinnersData
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext