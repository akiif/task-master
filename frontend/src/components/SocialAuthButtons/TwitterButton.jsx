import React from 'react';
import TwitterIcon from "../../assets/images/twitter.svg";

// import config
import configFile from "../../config/config.json";

const SERVER_URL = configFile.SERVER_URL;

function TwitterButton() {
  return (
    <button className='social-auth-btn twitter-btn'>
      <a className='social-auth-link' href={`${SERVER_URL}/auth/twitter`}>
        <img src={TwitterIcon} alt="twitter-icon" className='social-auth-icon-img' />
      </a>
    </button>
  );
}

export default TwitterButton;