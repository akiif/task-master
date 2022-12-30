import React from 'react';

// import social buttons
import GoogleButton from './SocialAuthButtons/GoogleButton';
import FacebookButton from './SocialAuthButtons/FacebookButton';
import GithubButton from './SocialAuthButtons/GithubButton';
import TwitterButton from './SocialAuthButtons/TwitterButton';

function SocialAuth() {
  return (
    <div>
      <h4>Log in to your account</h4>
      <div className="social-auth-items">
        <GoogleButton />
        <FacebookButton />
        <GithubButton />
        <TwitterButton />
      </div>
    </div>
  );
}

export default SocialAuth;
