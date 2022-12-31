import React from 'react'

function LoadingButton() {
  return (
    <div className='loading-login-btn'>
      <span className="loading-btn-text">Loading</span>
      <div className="balls-btn">
        <div className="ball-btn ball1-btn"></div>
        <div className="ball-btn ball2-btn"></div>
        <div className="ball-btn ball3-btn"></div>
      </div>
    </div>
  );
}

export default LoadingButton;