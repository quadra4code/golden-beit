import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { AppProvider } from './Context/AppContext';
import { DesktopProvider } from './Context/IsDesktop';
import Units from './Pages/Units';
import SingleUnit from './Pages/SingleUnit';
import ProtectedRoute from './Components/ProtectedRoute';
import 'swiper/css';
import 'swiper/css/pagination';
import 'rc-slider/assets/index.css';
import Table from './Pages/Table';
import AddNewUnit from './Pages/AddNewUnit';
import InquiryPage from './Pages/InquiryPage';

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/sign-up' && location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-units" element={<ProtectedRoute><Units /></ProtectedRoute>} />
        <Route path="/add-new-unit" element={<ProtectedRoute><AddNewUnit /></ProtectedRoute>} />
        <Route path="/inquiry-page" element={<InquiryPage />} />
        <Route path="all-units/:id" element={<ProtectedRoute><SingleUnit /></ProtectedRoute>} />
      </Routes>
      {location.pathname !== '/sign-up' && location.pathname !== '/login' && <Footer />}
    </>
  );
}
const MainApp = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <DesktopProvider>
          <App />
        </DesktopProvider>
      </AppProvider>
    </BrowserRouter>
  )
}
export default MainApp;
