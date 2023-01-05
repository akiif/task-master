// import modules
import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./assets/css/form.css"
import "./assets/css/dark-mode.css";

// import utils
import PrivateRoutes from './utils/PrivateRoutes';

// import asyncThunk
import { checkIsLoggedIn } from "./state/features/auth/authSlice";

// import Pages
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ToastWrapper from './components/ToastWrapper';

function App() {
  const { isLoading } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, []);
  
  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }
  
  return (
    <div className={`App ${theme === "dark" && "dark"}`} >
      <ToastWrapper />
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route exact path='/' element={<HomePage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
