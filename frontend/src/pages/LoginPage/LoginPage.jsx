import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

// import components
import LocalLoginForm from './components/LocalLoginForm';
import SocialAuth from '../../components/SocialAuth';
import ToastWrapper from '../../components/ToastWrapper';

function Login() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  if (isLoggedIn) {return <Navigate to="/" />}

  return (
    <div className='form-page'>
      <ToastWrapper />
      <div className="form-item">
        <h1 className="form-heading">Login</h1>
        <SocialAuth />
        or log in with a username
        <LocalLoginForm />
        <p className="redirect-form">Don't have an account? &nbsp;
          <Link to='/register' className='redirect-form-link'>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;