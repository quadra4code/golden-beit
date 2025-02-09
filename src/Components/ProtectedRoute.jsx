import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token =  localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login', {replace: true});
    }
  }, [token, navigate]); // Run this effect when token or navigate changes
  return token ? children : navigate('/login', {replace: true}) // Render children if token exists, otherwise render nothing
};
export default ProtectedRoute;
