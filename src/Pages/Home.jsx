import React from 'react';
import Landing from '../Components/Landing';
import AboutUs from '../Components/AboutUs';
import WhyUs from '../Components/WhyUs';
import Navbar from '../Components/Navbar';
import OurProjects from '../Components/OurProjects';
import Articles from '../Components/Articles';
import OurReviews from '../Components/OurReviews';
import Popup from '../Components/Popup';
const Home = () => {
  return (
    <>
      <Popup/>
      <main className='home'>
        <Landing/>
        <OurProjects/>
        <AboutUs/>
        <WhyUs/>
        <OurReviews/>
        <Articles/>
      </main>
    </>
  )
}

export default Home