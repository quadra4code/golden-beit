import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import 'swiper/css';
import 'swiper/css/pagination';
import 'rc-slider/assets/index.css';
import { AppProvider } from './Context/AppContext';
import Units from './Pages/Units';
import SingleUnit from './Pages/SingleUnit';
import ScreenShare from './Pages/TestScreenSharing';

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/sign-up' && location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/units" element={<Units />} />
        <Route path="units/:id" element={<SingleUnit />} />
        <Route path="/screen-share" element={<ScreenShare />} />
      </Routes>
      {location.pathname !== '/sign-up' && location.pathname !== '/login' && <Footer />}
    </>
  );
}
const MainApp = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  )
}
export default MainApp;
