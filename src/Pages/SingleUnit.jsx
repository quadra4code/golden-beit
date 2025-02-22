import React, {useState, useContext, useEffect} from 'react';
import { FaStar } from "react-icons/fa";
import image1 from '../Images/form.png';
import image2 from '../Images/form.png';
import image3 from '../Images/landing.png';
import image4 from '../Images/buyer.png';
import image5 from '../Images/broker.png';
import { BsBuildings } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { TbRulerMeasure2 } from "react-icons/tb";
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import  Pagination  from '../Components/Pagination';
import AppContext from '../Context/AppContext';
import Loader from '../Components/Loader';
import axios from 'axios';
import { Tabs } from 'antd';
import UnitCard from '../Components/UnitCard';
import Popup from '../Components/Popup';
const SingleUnit = () => {
  const token = localStorage.getItem('token');
  const {singleUnit, setSingleUnit, handleReqUnit, contextHolder} = useContext(AppContext)
  const [value, setValue] = useState('1');
  const [allUnits, setAllUnits] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [unitsPerPage] = useState(10);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    setLoading(true)
    axios.get(`https://golden-gate-three.vercel.app/core/unit-details/${params.id}`)
    .then(res => {
      setSingleUnit(res.data.data);
      console.log(res);
    })
    .catch(err => {console.log(err);
    })
    .finally(() => {setLoading(false)})
  },[])
  useEffect(()=>{
    setLoading(true)
    axios.get('https://golden-gate-three.vercel.app/core/all-units')
    .then(res => {
      setAllUnits(res.data.data.all);
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
  const indexOfLastUnit = currentPage * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = allUnits&& allUnits.slice(indexOfFirstUnit, indexOfLastUnit);
  // Change page
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
  const images = [
    {
      id: 1,
      src: image1,
      alt: "Main Image",
    },
    {
      id: 2,
      src: image2,
      alt: "Thumbnail 1",
    },
    {
      id: 3,
      src: image3,
      alt: "Thumbnail 2",
    },
    {
      id: 4,
      src: image4,
      alt: "Thumbnail 3",
    },
    {
      id: 5,
      src: image5,
      alt: "Thumbnail 4",
    },
  ];
  const items = [
    {
      key: '1',
      label: 'الوصف',
      children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non accusantium quasi sit dolorum odio eos atque deserunt. Vitae velit officia, ea itaque ratione est consequatur temporibus fugit! Consequatur, obcaecati ullam!',
    },
    // {
    //   key: '2',
    //   label: 'معلومات',
    //   children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non accusantium quasi sit dolorum odio eos atque deserunt. Vitae velit officia, ea itaque ratione est consequatur temporibus fugit! Consequatur, obcaecati ullam!',
    // },
    // {
    //   key: '3',
    //   label: 'التقييم',
    //   children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non accusantium quasi sit dolorum odio eos atque deserunt. Vitae velit officia, ea itaque ratione est consequatur temporibus fugit! Consequatur, obcaecati ullam!',
    // },
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
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <>
      {loading?
      <Loader/>
      :
      <main className='single_unit_page'>
        <Popup/>
        {contextHolder}
        <section className='unit_info'>
          <div className="galleria-container">
            <div className="main-image">
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>
            <div className="thumbnail-carousel">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`thumbnail ${image.id === selectedImage.id ? "active" : ""}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.src} alt={image.alt} />
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
            <button className='add_fav' onClick={handleReqUnit}>طلب الوحدة</button>
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