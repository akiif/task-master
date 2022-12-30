import React from 'react';

// import custom css
import "../assets/css/custom-loading.css";

function LoadingScreen() {
  return (
    <div className='loading-screen'>
      <div className="balls">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
      <span className="loading-screen-text">Loading...</span>
    </div>
  );
}

export default LoadingScreen;