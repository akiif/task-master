import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastWrapper() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      closeOnClick
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}

export default ToastWrapper;
