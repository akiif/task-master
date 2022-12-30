import React from 'react';
import { Link } from 'react-router-dom';

function LoginButton() {
  return (
    <Link to="/login" className='login-btn' />
  );
}

export default LoginButton;
