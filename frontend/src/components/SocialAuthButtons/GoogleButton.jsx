import React from 'react';
import GoogleIcon from "../../assets/images/google.svg";

// import config
import configFile from "../../config/config.json";

const SERVER_URL = configFile.SERVER_URL;

function GoogleButton() {
  return (
    <button className='social-auth-btn google-btn'>
      <a className='social-auth-link' href={`${SERVER_URL}/auth/google`}>
        <img src={GoogleIcon} alt="google-icon" className='social-auth-icon-img' />
      </a>
    </button>
  );
}

export default GoogleButton;