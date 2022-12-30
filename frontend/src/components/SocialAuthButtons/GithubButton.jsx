import React from 'react';
import GitHubIcon from "../../assets/images/github.svg";

// import config
import configFile from "../../config/config.json";

const SERVER_URL = configFile.SERVER_URL;

function GithubButton() {
  return (
    <button className='social-auth-btn github-btn'>
      <a className='social-auth-link' href={`${SERVER_URL}/auth/github`}>
        <img src={GitHubIcon} alt="github-icon" className='social-auth-icon-img' />
      </a>
    </button>
  );
}

export default GithubButton;