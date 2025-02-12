// import React, {useEffect} from 'react';
// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import Home from './Pages/Home';
// import Login from './Pages/Login';
// import Footer from './Components/Footer';
// import Navbar from './Components/Navbar';
// import { AppProvider } from './Context/AppContext';
// import { DesktopProvider } from './Context/IsDesktop';
// import Units from './Pages/Units';
// import SingleUnit from './Pages/SingleUnit';
// import ProtectedRoute from './Components/ProtectedRoute';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'rc-slider/assets/index.css';
// import AddNewUnit from './Pages/AddNewUnit';
// import InquiryPage from './Pages/InquiryPage';
// import PageTransition from './Components/PageTransition';

// const App = () => {
//   useEffect(()=>{
//     window.scrollTo(0,0)
//   })
  
//   const location = useLocation();
//   return (
//     <>
//       {location.pathname !== '/sign-up' && location.pathname !== '/login' && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/all-units" element={<ProtectedRoute><Units /></ProtectedRoute>} />
//         <Route path="/add-new-unit" element={<ProtectedRoute><AddNewUnit /></ProtectedRoute>} />
//         <Route path="/inquiry-page" element={<InquiryPage />} />
//         <Route path="all-units/:id" element={<ProtectedRoute><SingleUnit /></ProtectedRoute>} />
//       </Routes>
//       {location.pathname !== '/sign-up' && location.pathname !== '/login' && <Footer />}
//     </>
//   );
// }
// const MainApp = () => {
//   return (
//     <BrowserRouter>
//       <AppProvider>
//         <DesktopProvider>
//           <App />
//         </DesktopProvider>
//       </AppProvider>
//     </BrowserRouter>
//   )
// }
// export default MainApp;
import React, { useEffect } from 'react';
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
import AddNewUnit from './Pages/AddNewUnit';
import InquiryPage from './Pages/InquiryPage';
import PageTransition from './Components/PageTransition';
import FAQ from './Pages/FAQ';
const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/all-units", element: <Units /> },
    { path: "/add-new-unit", element: <ProtectedRoute><AddNewUnit /></ProtectedRoute> },
    { path: "/inquiry-page", element: <InquiryPage /> },
    { path: "/faq", element: <FAQ /> },
    { path: "all-units/:id", element: <SingleUnit /> },
  ];
  return (
    <>
      {location.pathname !== '/sign-up' && location.pathname !== '/login' && <Navbar />}
      <PageTransition routes={routes} />
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
  );
}

export default MainApp;