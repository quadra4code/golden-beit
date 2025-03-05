import React, {useState, useContext, useEffect} from 'react';
import { FaStar } from "react-icons/fa";
import image2 from '../Images/form.png';
import { useNavigate, useParams } from 'react-router-dom';
import  Pagination  from '../Components/Pagination';
import AppContext from '../Context/AppContext';
import { FaRegHeart } from "react-icons/fa";
import Loader from '../Components/Loader';
import axios from 'axios';
import { Tabs } from 'antd';
import UnitCard from '../Components/UnitCard';
import Popup from '../Components/Popup';
import { Swiper, SwiperSlide } from 'swiper/react';

const SingleUnit = () => {
  const {token, openNotificationWithIcon, singleUnit, setSingleUnit, handleReqUnit, contextHolder} = useContext(AppContext)
  const [value, setValue] = useState('1');
  const [discoverMore, setDiscoverMore] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [unitsPerPage] = useState(10);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const defaultImage = {
    id:1,
    src:image2
  }
  const [selectedImage, setSelectedImage] = useState(singleUnit && singleUnit.images && singleUnit.images.length > 0 ? singleUnit.images[0] : defaultImage);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    setLoading(true)
    setDataLoaded(false)
    axios.get(`https://amazing-juliann-golden-beit-167d3b34.koyeb.app/core/unit-details/${params.id}`)
    .then(res => {
      setSingleUnit(res.data.data.unit_details);
      setDiscoverMore(res.data.data.discover_more);
      console.log(res.data.data);
    })
    .catch(err => {console.log(err);
    })
    .finally(() => {
      setDataLoaded(true);
      setLoading(false)
    })
  },[])
  console.log(singleUnit);
  useEffect(() => {
    if (singleUnit && singleUnit.images && singleUnit.images.length > 0) {
      setSelectedImage(singleUnit.images[0]);
    }
  }, [singleUnit]);
  // useEffect(()=>{
  //   setLoading(true)
  //   axios.post('https://amazing-juliann-golden-beit-167d3b34.koyeb.app/core/filter-paginated-units',{})
  //   .then(res => {
  //     setAllUnits(res.data.data.all);
  //     setPaginationData(res.data.data.pagination)
  //     console.log(res.data);
      
  //   })
  //   .catch(err => {console.log(err);
  //   })
  //   .finally(() => {setLoading(false)})
  // },[])
  // allUnits&& console.log(allUnits);
  const onChange = (key) => {
    console.log(key);
  }
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const paginate = (pageNumber) => {
    setLoading(true);
    axios.post('https://amazing-juliann-golden-beit-167d3b34.koyeb.app/core/filter-paginated-units',{
      page_number:pageNumber
    })
      .then(res => {
        console.log(res.data);
        setDiscoverMore(res.data.data.all);
        setPaginationData(res.data.data.pagination)
      })
      .catch(err => {
        console.log(err);
        setDataLoaded(true);
      })
      .finally(() => {
        setDataLoaded(true);
        setLoading(false)}
      );
    setCurrentPage(pageNumber)
  };
  const items = [
    {
      key: '1',
      label: 'الوصف',
      children: singleUnit&& singleUnit.description,
    },
  ];
  // const handleUnitClick = (id)=> {
  //   const foundUnit = allUnits.find(({id})=>id===id)
  //   setSingleUnit(foundUnit);
  //   navigate(`/all-units/${id}`)
  // }
  // const handleSingleUnitDetails= (id) => {
  //   axios
  //   .get(`https://amazing-juliann-golden-beit-167d3b34.koyeb.app/core/unit-details/${id}`)
  //   .then((res)=>{
  //     console.log(res.data);
  //     setSingleUnit(res.data.data)
  //     navigate(`/all-units/${id}`)
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
  // }
  const handelAddToFav = (id) => {
    axios
    .post(`https://amazing-juliann-golden-beit-167d3b34.koyeb.app/core/add-favorite`,
    {
      unit:id
    },
    {
      headers: { 'Authorization': `Bearer ${token}` },
    }
    )
    .then((res)=>{
      openNotificationWithIcon('success','تم إضافة الوحدة بنجاح')
      console.log(res.data);
    })
    .catch((err)=>{
      openNotificationWithIcon('error','حدث خطأ برجاء المحاولة لاحقا')
      console.log(err);
    })
  }
  return (
    <>
      {loading&& !dataLoaded?
      <Loader/>
      :
      <main className='single_unit_page'>
        <Popup/>
        {contextHolder}
        <section className='unit_info'>
          <div className="galleria-container">
            <div className="main-image">
              <img src={selectedImage.src} alt='unit image' />
            </div>
            <div className="thumbnail-carousel">
              {singleUnit && singleUnit.images && singleUnit.images.map((image) => (
                <div
                  key={image.id}
                  className={`thumbnail ${image.id === selectedImage.id ? "active" : ""}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.src} alt="unit image" />
                </div>
              ))}
            </div>
          </div>
          <div className='unit_data'>
            <h2>{singleUnit&& singleUnit.title}</h2>
            <span className='holder'><h3>المشروع:</h3> <span>{singleUnit&& singleUnit.project}</span></span>
            <span className='holder'><h3>الموقع:</h3> <span>{singleUnit&& singleUnit.city}</span></span>
            <span className='holder'><h3>المساحة:</h3> <span>{singleUnit&& singleUnit.area} متر مربع</span></span>
            <span className='holder'><h3> نظام السداد:</h3> <span>{singleUnit&& singleUnit.payment_method}</span></span>
            <span className='holder'><h3> اّخر تحديث :</h3> <span>{singleUnit&& singleUnit.latest_date}</span></span>
            {singleUnit&& singleUnit.paid_amount&&
              <span className='holder'><h3>المدفوع :</h3> <span className='price'>{singleUnit&& singleUnit.paid_amount}</span> {singleUnit&& singleUnit.currency}</span>
            }
            {singleUnit&& singleUnit.remaining_amount&&
              <span className='holder'><h3> الباقي:</h3> <span className='price'>{singleUnit&& singleUnit.remaining_amount}</span> {singleUnit&& singleUnit.currency}</span>
            }
            {singleUnit&& singleUnit.meter_price&&
              <span className='holder'><h3>سعر المتر:</h3> <span className='price'>{singleUnit&& singleUnit.meter_price}</span> {singleUnit&& singleUnit.currency}</span>
            }
            {singleUnit&& singleUnit.total_price&&
              <span className='holder'><h3>السعر الاجمالى:</h3> <span className='price'>{singleUnit&& singleUnit.total_price}</span> {singleUnit&& singleUnit.currency}</span>
            }
            {singleUnit&& singleUnit.over_price&&
              <span className='holder'><h3>سعر الاوفر:</h3> <span className='price'>{singleUnit&& singleUnit.over_price}</span> {singleUnit&& singleUnit.currency}</span>
            }
            <div className='btns'>
              <button className='add_fav' onClick={handleReqUnit}>طلب الوحدة</button>
              <button className='add_fav' onClick={(e)=>{handelAddToFav(singleUnit.id)}}>
                ({singleUnit&& singleUnit.favorite_count})
                <FaRegHeart/>
              </button>
            </div>
          </div>
        </section>
        <section className='tab_view'>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </section>
        <section className='more_units'>
          <h2>استكشف المزيد</h2>
          <div className="all_units">
            {/* <div className="units_list">
              {discoverMore&& discoverMore.length>0 &&  discoverMore.map((unit, index) =>
                <UnitCard 
                key={unit.id}
                title={unit.title} 
                city={unit.city} 
                project={unit.project} 
                area={unit.area}
                mainImage={unit.main_image}
                price = {unit.price_obj}
                id = {unit.id}
                isSoldOut={unit.status.code==4 && true}
                onClick = {()=>{navigate(`/all-units/${unit.id}`)}}
                />
              )}
            </div>
            <Pagination
              totalItems={paginationData&& paginationData.total_pages}
              paginate={paginate}
              currentPage={currentPage}
            /> */}
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
              {discoverMore&& discoverMore.length>0 && discoverMore.map((unit, index) => 
                <SwiperSlide className='swiper-slide' key={index}>
                  <UnitCard 
                  key={unit.id}
                  title={unit.title} 
                  city={unit.city} 
                  project={unit.project} 
                  area={unit.area}
                  mainImage={unit.main_image}
                  price = {unit.price_obj}
                  id = {unit.id}
                  isSoldOut={unit.status.code==4 && true}
                  onClick = {()=>{navigate(`/all-units/${unit.id}`)}}
                  />
                  {/* <div className="slide-content">
                    <img src={image1} alt="project"/>
                    <div className="content">
                      <h1>
                        <FaLocationDot/>
                        {discoverMore.title}
                      </h1>
                      <h1>
                        <span className='label'><TbRulerMeasure2/></span>
                        {discoverMore.area} متر مربع
                      </h1>
                      <h1 className='price'>
                        <span className='label'>EGP  </span>
                        {discoverMore.area}
                      </h1>
                      <button className='see_more' onClick={()=>{handleUnitClick(discoverMore.id)}}>التفاصيل</button>
                    </div>
                  </div> */}
                </SwiperSlide>        
              )}
            </Swiper>
          </div>
        </section>
      </main>
      }
    </>
  )
}

export default SingleUnit