import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

// import components
import LocalRegisterForm from './components/LocalRegisterForm';
import SocialAuth from '../../components/SocialAuth';

function Register() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {return <Navigate to="/" />}

  return (
    <div className='form-page'>
      <div className="form-item">
        <h1 className="form-heading">Register</h1>
        <SocialAuth />
        or register with an email
        <LocalRegisterForm />
        <p className="redirect-form">Already have an account?
          <Link to='/login' className='redirect-form-link'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;