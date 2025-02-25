import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import UnitCard from '../Components/UnitCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader';
import UnitsNotFound from './UnitsNotFound';

const Favorites = () => {
  const [favorites, setFavorites] = useState();
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleSeeMore = (id) => {
    console.log('See more details for unit:', id);
  };
  useEffect(() => {
    if(token){
      setLoading(true)
      axios
      .post('https://golden-gate-three.vercel.app/core/list-paginated-favorites',
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
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setDataLoaded(false);
      });
    }
  },[])
  const handleDelete = (id) => {
    axios
    .delete(`https://golden-gate-three.vercel.app/core/delete-favorite/${id}`,
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
  };
  return (
    <>
    {loading
      ?
      <Loader/>
      :
      <>
        {dataLoaded &&  favorites&& favorites.length > 0 ?
          <div className="favorites-container">
            <h1 className="favorites-title">المفضلة</h1>
            <div className="favorites-grid">
              {favorites&& favorites.map((unit) => (
                <div className="unit-card-wrapper" key={unit.id}>
                  <UnitCard
                    title={unit.title}
                    area={unit.area}
                    price={unit.price}
                    city={unit.city}
                    project={unit.project}
                    mainImage={unit.mainImage}
                    isSoldOut={unit.isSoldOut}
                    onClick={() => navigate(`/all-units/${unit.id}`)}
                  />
                  <button className="delete-button" onClick={() => handleDelete(unit.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          </div>
          :
          <UnitsNotFound description = ' لا يوجد وحدات في المفضلة'/>
        }
      </>
    }
    </>
  );
};

export default Favorites;