import React from "react";

function LeftSection({ item, animateText, }) {
  return (
    <div className="left-section">
      <div className={`text-content ${animateText ? 'slide-out' : 'slide-in'}`}>
        <h1 className="title">{item.title}</h1>
        <h2 className="subtitle">{item.subtitle}</h2>
        <p className="paragraph">{item.paragraph}</p>
        <h2 className="subtitle">{item.subtitle2}</h2>
        <ul className="list-items">
          {item.listItems.map((listItem, index) => (
            <li key={index}>{listItem}</li>
          ))}
        </ul>
      </div>
      {/* Button is outside the animated text-content */}
      <button
        className="details-button"
        onClick={item.detailsUrl}
      >
        التفاصيل
      </button>
    </div>
  );
}

export default LeftSection;