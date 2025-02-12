import React,{ useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
const ProtectedRoute = ({ children }) => {
  const { openNotificationWithIcon } = useContext(AppContext)
  const navigate = useNavigate();
  const token =  localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      openNotificationWithIcon('info', '', 'برجاء تسجيل الدخول لاضافة وحدتك')
    }
  }, [token, navigate]);
  return token ? children : openNotificationWithIcon('info', '', 'برجاء تسجيل الدخول لاضافة وحدتك') // Render children if token exists, otherwise render nothing
};
export default ProtectedRoute;
