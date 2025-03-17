import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import landing_video from '../Images/landing_video.mp4'
const Landing = () => {
  return (
    <section className='landing' id='landing'>
      <div className="holder" >
        <div className="opacity">
          <div className='hero'>
            <h1>استكشف منزل أحلامك</h1>
            <h4>نقدم لعملائنا خيارات سكنية مبتكرة ومتنوعة، مدعومة بأحدث التقنيات وأدوات البحث لتلبية جميع الميزانيات والتفضيلات</h4>
            <Link to='all-units'>ابدأ الآن</Link>
          </div>
        </div>
        {/* <div className='video-cont'>
          <video autoPlay loop muted>
            <source type="video/mp4" src={landing_video}/>
          </video>
        </div> */}
      </div>
      <SearchBar/>
    </section>
  )
}

export default Landing