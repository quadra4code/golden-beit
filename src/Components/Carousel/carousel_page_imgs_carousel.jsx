import React, { useEffect } from 'react';
function ImageCarousel({ items, translateX, onSelect, scalingId, noTransition }) {
  useEffect(()=>{

  },[scalingId])
  return (
    <div className="image-carousel">
      <div className={`carousel-track ${noTransition ? "no-transition" : ""}`} style={{ transform: `translateX(${translateX}px)` }}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${index === 0 ? 'chosen' : ''} ${
              item.id === scalingId ? 'scaling' : ''
            }`}
            onClick={() => {
              console.log(index,"index")
              // Only trigger if the clicked image is not already chosen (index 0)
              if (index !== 0) {
                onSelect(index);
              }
            }}
          >
            <img src={item.image} alt={`Image ${item.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;