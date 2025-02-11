import React, {useContext} from 'react';
import Landing from '../Components/Landing';
import AboutUs from '../Components/AboutUs';
import WhyUs from '../Components/WhyUs';
import OurProjects from '../Components/OurProjects';
import Articles from '../Components/Articles';
import OurReviews from '../Components/OurReviews';
import Popup from '../Components/Popup';
import AppContext from '../Context/AppContext';
import Loader from '../Components/Loader';
const Home = () => {
  const {loading, contextHolder} = useContext(AppContext)
  return (
    <>
    {loading
      ?
      <Loader/>
      :    
      <>
        <Popup/>
        <main className='home'>
          {contextHolder}
          <Landing/>
          <WhyUs/>
          <OurProjects/>
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