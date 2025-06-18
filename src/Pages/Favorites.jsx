import React, { useContext, useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import UnitCard from '../Components/UnitCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader';
import UnitsNotFound from './UnitsNotFound';
import Popup from '../Components/Popup';
import { IoClose } from "react-icons/io5";
import AppContext from '../Context/AppContext';
const Favorites = () => {
  const [favorites, setFavorites] = useState();
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const {notificationRef, token} = useContext(AppContext)
  const navigate = useNavigate();
  const handleSeeMore = (id) => {
    console.log('See more details for unit:', id);
  };
  useEffect(() => {
    if(token){
      setLoading(true)
      axios
      .post('https://api.goldenbeit.com/core/list-paginated-favorites',
        {},
        {
          headers: {Authorization: `Bearer ${token}`,}
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setFavorites(res.data.data.all);
      })
      .catch((err) => {
        if(err.status===401){
          notificationRef.current.show('info','برجاء تسجيل الدخول اولا')
          return
        }  
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setDataLoaded(true);
      });
    }
  },[])
  const handleDelete = (id) => {
    axios
    .delete(`https://api.goldenbeit.com/core/delete-favorite/${id}`,
      {
        headers: {Authorization: `Bearer ${token}`,}
      }
    )
    .then((res) => {
      console.log(res.data);
      setFavorites(favorites.filter((unit) => unit.id !== id));
    })
    .catch((err) => {
      console.log(err);
    });
  };console.log(favorites);
  
  return (
    <>
    {loading 
      ?
      <Loader/>
      :
      <>
        {dataLoaded &&  favorites&& favorites.length > 0 ?
          <>
            <Popup/>
            <div className="favorites-container">
              <h1 className="favorites-title">المفضلة</h1>
              <div className="favorites-grid">
                {favorites&& favorites.map((unit) => (
                  <div className="unit-card-wrapper" key={unit.id}>
                    <UnitCard
                      title={unit.title}
                      proposal_str={unit.proposal_str}
                      floor={unit.floor}
                      area={unit.area}
                      price={unit.price_obj}
                      over_price_obj={unit.over_price_obj}
                      total_price_obj={unit.total_price_obj}
                      city={unit.city}
                      project={unit.project}
                      mainImage={unit.mainImage}
                      isSoldOut={unit.status.code==4 && true}
                      onClick={() => navigate(`/all-units/${unit.id}`)}
                    />
                    <button className="delete-button" onClick={() => handleDelete(unit.id)}>
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
          :
          <UnitsNotFound description = ' لا يوجد وحدات في المفضلة'/>
        }
      </>
    }
    </>
  );
};

export default Favorites;