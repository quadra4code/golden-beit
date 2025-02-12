import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
const Landing = () => {
  return (
    <section className='landing' id='landing'>
      <div className="opacity">
        <div className='hero'>
          <h1>استكشف منزل أحلامك</h1>
          <h4>نقدم لعملائنا خيارات سكنية مبتكرة ومتنوعة، مدعومة بأحدث التقنيات وأدوات البحث لتلبية جميع الميزانيات والتفضيلات</h4>
          <Link to=''>ابدأ الآن</Link>
        </div>
      </div>
      <SearchBar/>
    </section>
  )
}

export default Landing