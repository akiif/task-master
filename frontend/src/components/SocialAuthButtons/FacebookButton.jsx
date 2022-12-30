import React from 'react';
import FacebookIcon from "../../assets/images/facebook.svg";

// import config
import configFile from "../../config/config.json";

const SERVER_URL = configFile.SERVER_URL;

function FacebookButton() {
  return (
    <button className='social-auth-btn facebook-btn'>
      <a className='social-auth-link' href={`${SERVER_URL}/auth/facebook`}>
        <img src={FacebookIcon} alt="facebook-icon" className='social-auth-icon-img' />
      </a>
    </button>
  );
}

export default FacebookButton;