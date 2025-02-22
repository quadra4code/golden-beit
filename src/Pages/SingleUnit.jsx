import React, {useState, useContext, useEffect} from 'react';
import { FaStar } from "react-icons/fa";
import image1 from '../Images/form.png';
import image2 from '../Images/form.png';
import image3 from '../Images/landing.png';
import image4 from '../Images/buyer.png';
import image5 from '../Images/broker.png';
import { useNavigate, useParams } from 'react-router-dom';
import  Pagination  from '../Components/Pagination';
import AppContext from '../Context/AppContext';
import Loader from '../Components/Loader';
import axios from 'axios';
import { Tabs } from 'antd';
import UnitCard from '../Components/UnitCard';
import Popup from '../Components/Popup';
const SingleUnit = () => {
  const {token, openNotificationWithIcon, singleUnit, setSingleUnit, handleReqUnit, contextHolder} = useContext(AppContext)
  const [value, setValue] = useState('1');
  const [allUnits, setAllUnits] = useState([])
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
    axios.get(`https://golden-gate-three.vercel.app/core/unit-details/${params.id}`)
    .then(res => {
      setSingleUnit(res.data.data);
      console.log(singleUnit);
    })
    .catch(err => {console.log(err);
    })
    .finally(() => {
      setDataLoaded(true);
      setLoading(false)
    })
  },[])
  useEffect(() => {
    if (singleUnit && singleUnit.images && singleUnit.images.length > 0) {
      setSelectedImage(singleUnit.images[0]);
    }
  }, [singleUnit]);
  useEffect(()=>{
    setLoading(true)
    axios.post('https://golden-gate-three.vercel.app/core/filter-paginated-units',{})
    .then(res => {
      setAllUnits(res.data.data.all);
      console.log();
      setPaginationData(res.data.data.pagination)
    })
    .catch(err => {console.log(err);
    })
    .finally(() => {setLoading(false)})
  },[])
  const onChange = (key) => {
    console.log(key);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const paginate = (pageNumber) => {
    setLoading(true);
    axios.post('https://golden-gate-three.vercel.app/core/filter-paginated-units',{
      page_number:pageNumber
    })
      .then(res => {
        console.log(res.data);
        setAllUnits(res.data.data.all);
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
      children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non accusantium quasi sit dolorum odio eos atque deserunt. Vitae velit officia, ea itaque ratione est consequatur temporibus fugit! Consequatur, obcaecati ullam!',
    },
  ];
  const handleUnitClick = (id)=> {
    const foundUnit = allUnits.find(({id})=>id===id)
    setSingleUnit(foundUnit);
    navigate(`/all-units/${id}`)
  }
  const handleSingleUnitDetails= (id) => {
    axios
    .get(`https://golden-gate-three.vercel.app/core/unit-details/${id}`)
    .then((res)=>{
      console.log(res.data);
      setSingleUnit(res.data.data)
      navigate(`/all-units/${id}`)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  const handelAddToFav = (id) => {
    axios
    .post(`https://golden-gate-three.vercel.app/core/add-favorite`,
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
            <p>{singleUnit&& singleUnit.description}</p>
            <div className='stars'>
              {singleUnit&& singleUnit.rate&& singleUnit&& singleUnit.rate.map(star => <FaStar/>)}
              {singleUnit&& singleUnit.rate&& '( 75 تقييم )'}
              
            </div>
            <span className='holder'><h3>المشروع:</h3> <span>{singleUnit&& singleUnit.project}</span></span>
            <span className='holder'><h3>الموقع:</h3> <span>{singleUnit&& singleUnit.city}</span></span>
            <span className='holder'><h3>المساحة:</h3> <span>{singleUnit&& singleUnit.area}</span></span>
            <span className='holder'><h3> وسيلة الدفع:</h3> <span>{singleUnit&& singleUnit.payment_method}</span></span>
            {singleUnit&& singleUnit.meter_price&&
              <span className='holder'><h3>سعر المتر:</h3> <span className='price'>{singleUnit&& singleUnit.meter_price}</span></span>
            }
            {singleUnit&& singleUnit.total_price&&
              <span className='holder'><h3>السعر الاجمالى:</h3> <span className='price'>{singleUnit&& singleUnit.meter_price}</span></span>
            }
            {singleUnit&& singleUnit.over_price&&
              <span className='holder'><h3>سعر الاوفر:</h3> <span className='price'>{singleUnit&& singleUnit.meter_price}</span></span>
            }
            <div className='btns'>
              <button className='add_fav' onClick={handleReqUnit}>طلب الوحدة</button>
              <button className='add_fav' onClick={(e)=>{handelAddToFav(singleUnit.id)}}>إضافة إلى المفضلة</button>
            </div>
          </div>
        </section>
        <section className='tab_view'>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </section>
        <section className='more_units'>
          <h2>استكشف المزيد</h2>
          <div className="all_units">
            <div className="units_list">
              {allUnits&& allUnits.map((discoverMore, index) =>
                <UnitCard 
                key={discoverMore.id}
                title={discoverMore.title} 
                area={discoverMore.area}
                mainImage={discoverMore.main_image}
                price = {discoverMore.price}
                id = {discoverMore.id}
                onClick = {()=>{handleSingleUnitDetails(discoverMore.id)}}
                />
              )}
            </div>
            <Pagination
              totalItems={paginationData&& paginationData.total_pages}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
          {/* <Swiper
              slidesPerView={4}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
            {allUnits.map((discoverMore, index) => 
              <SwiperSlide className='swiper-slide' key={index}>
                <UnitCard 
                  title={discoverMore.title} 
                  area={discoverMore.area}
                  price = {discoverMore.price}
                  id = {discoverMore.id}
                  onClick = {()=>{handleUnitClick(discoverMore.id)}}
                  />
                <div className="slide-content">
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
                </div>
              </SwiperSlide>        
            )}
          </Swiper> */}
        </section>
      </main>
      }
    </>
  )
}

export default SingleUnit