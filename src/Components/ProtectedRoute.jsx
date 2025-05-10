import React,{ useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
const ProtectedRoute = ({ children }) => {
  const { openNotificationWithIcon } = useContext(AppContext)
  const navigate = useNavigate();
  const token =  localStorage.getItem('golden-beit-website-token');
  useEffect(() => {
    if (!token) {
      navigate('/', {replace: true});
      openNotificationWithIcon('info', '', 'برجاء تسجيل الدخول ')
    }
  }, [token, navigate]);
  return token ? children : openNotificationWithIcon('info', '', 'برجاء تسجيل الدخول') // Render children if token exists, otherwise render nothing
};
// const isAuthenticated = () => {
//   return localStorage.getItem('golden-beit-website-token') !== null;
// };
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { openNotificationWithIcon } = useContext(AppContext)
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           openNotificationWithIcon('info', '', 'برجاء تسجيل الدخول ') 
//         )
//       }
//     />
//   );
// }
export default ProtectedRoute;
