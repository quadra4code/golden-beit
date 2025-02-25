import React from 'react';
import notFoundImage from '../Images/not found.webp'
const UnitsNotFound = ({description}) => {
  return (
    <div className="data-notFound">
      <img src={notFoundImage} alt="" />
      <h1>{description}</h1>
    </div>
  )
}

export default UnitsNotFound