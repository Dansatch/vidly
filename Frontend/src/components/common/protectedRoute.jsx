import React from "react";
import { useLocation } from "react-router-dom";
import auth from "../../services/authService";
import LoginForm from "../loginForm";

const getUrlParams = () => {
  const url = window.location.href;

  // Returns id in the URL http://localhost/movies/:id
  return url.split("/").pop();
};

const ProtectedRoute = ({ Component, ...rest }) => {
  const location = useLocation();

  if (!auth.getCurrentUser()) return <LoginForm from={location} />;

  const urlParam = getUrlParams();
  return <Component urlParam={urlParam} />;
};

export default ProtectedRoute;
