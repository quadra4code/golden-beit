import React, { useEffect, useState } from 'react';

function Pagination({ originalItems, currentId, carouselOrder, onSelect }) {
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let timer = null;

    // Check if screen width is less than 900px
    const updateTimerStatus = () => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        // Start the timer if it's not already active
        setIsTimerActive(true);
      } else {
        // Stop the timer if screen width is greater than 900px
        setIsTimerActive(false);
        clearInterval(timer);
      }
    };

    updateTimerStatus(); // Initial check on mount

    // Add an event listener to handle screen resizing
    window.addEventListener("resize", updateTimerStatus);

    if (isTimerActive) {
      timer = setInterval(() => {
        onSelect(1); // Execute your desired logic every 5 seconds
      }, 5000);
    }

    // Cleanup the timer and event listener on component unmount
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", updateTimerStatus);
    };
  }, [isTimerActive, onSelect]);

  // Disable timer when the user clicks a ball
  const handleBallClick = (itemId, index) => {
    setIsTimerActive(false);
    clearInterval(); // Disable the timer
    if (currentId === itemId) return;

    for (let i = 0; i < carouselOrder.length; i++) {
      if (carouselOrder[i].uniqueId === itemId) {
        if (i - 3 >= 0) {
          onSelect(i - 3);
        } else {
          onSelect(i);
        }
      }
    }
  };

  return (
    <div className="pagination">
      {originalItems.map((item, index) => (
        <div
          key={item.id}
          className={`ball ${currentId === item.id ? "active" : ""}`}
          onClick={() => handleBallClick(item.id, index)}
        ></div>
      ))}
    </div>
  );
}

export default Pagination;