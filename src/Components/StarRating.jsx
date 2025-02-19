import React, { useContext } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import AppContext from '../Context/AppContext';
const StarRating = ({ totalStars = 5 }) => {
  const {rating, setRating} = useContext(AppContext);
  return (
    <div className='stars'>
      {Array.from({ length: totalStars }, (_, index) => (
        <span
        onClick={() => setRating(index + 1)}
        style={{
          cursor: 'pointer',
          color: 'gold',
          fontSize: '24px',
        }}
        >
          {index < rating ? <FaStar /> : <FaRegStar />}
        </span>
        // <Star
        //   key={index}
        //   filled={index < rating}
        //   onClick={() => setRating(index + 1)}
        // />
      ))}
    </div>
  );
};

export default StarRating;