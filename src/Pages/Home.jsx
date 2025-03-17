import React, {useContext, useEffect} from 'react';
import Landing from '../Components/Landing';
import AboutUs from '../Components/AboutUs';
import WhyUs from '../Components/WhyUs';
import OurProjects from '../Components/OurProjects';
import Articles from '../Components/Articles';
import OurReviews from '../Components/OurReviews';
import Popup from '../Components/Popup';
import AppContext from '../Context/AppContext';
import Loader from '../Components/Loader';
import TopShow from '../Components/TopShow';
const Home = () => {
  const {loading, contextHolder} = useContext(AppContext);
  return (
    <>
    {loading
      ?
      <Loader/>
      :    
      <>
        <main className='home'>
          <Popup/>
          {contextHolder}
          <Landing/>
          <WhyUs/>
          <OurProjects/>
          <TopShow/>
          {/* <AboutUs/> */}
          <OurReviews/>
          <Articles/>
        </main>
      </>
    }
    </>
  )
}

export default Home