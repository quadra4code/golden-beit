import React, {useContext, useEffect, useRef} from 'react';
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
import Services from '../Components/Services';
import UserTypesCarouselPage from '../Components/UserTypesCarouselPage';
import AddUnitBtn from '../Components/AddUnitBtn';
import IsDesktop from '../Context/IsDesktop';
import OpacityNotification from '../Components/OpacityNotification';
const Home = () => {
  const {isLaptop} = useContext(IsDesktop)
  const {loading, featuredUnits, mostViewedUnits} = useContext(AppContext);
  return (
    <>
    {loading
      ?
      <Loader/>
      :    
      <>
        <main className='home'>
          <OpacityNotification/>
          <Popup/>
          <Landing/>
          {featuredUnits && featuredUnits.length > 0 && <OurProjects/>}
          {mostViewedUnits && mostViewedUnits.length > 0 && <TopShow/>}
          {!isLaptop&& <AddUnitBtn/>}
          <WhyUs/>
          <UserTypesCarouselPage/>
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