import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

// import redux actions
import { setIsLoggedIn } from '../../../state/features/auth/authSlice';

// import api
import axiosRequest from '../../../api/user.api';

// import components
import FormPasswordField from '../../../components/FormPasswordField';

function LocalLoginForm() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loginUsername === "" || loginPassword === "") {
      setErrors({
        ...errors,
        emptyError: "Username or Password cannot be empty!"
      });
    } else {
      login();
    }
  }

  const login = async () => {
    const data = {
        username: loginUsername,
        password: loginPassword
      };
    axiosRequest.post('/login', data)
      .then((res) => {
      if (res.data.isLoggedIn) {
        dispatch(setIsLoggedIn(true));
        return <Navigate to="/" />;
      }
    })
      .catch((err) => {
        err.response.data && setErrors(err.response.data);
      });
  }
  
  if (isLoggedIn) {return <Navigate to="/" />}
  
  return (
    <form className='local-auth-form' onSubmit={handleSubmit}>
      <p className='form-error-field'>{errors.emptyError}</p>
      <input 
        className={`${errors.userError && 'form-input-error'} form-input`}
        type="text"
        placeholder="Username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
        autoFocus 
      />
      <p className='form-error-field'>{errors.userError}</p>
      <FormPasswordField
        value={loginPassword}
        onChange={(value) => setLoginPassword(value)}
        passwordError={ errors.passwordError}
      />
      <p className='form-error-field'>{errors.passwordError}</p>
      <button className='form-submit-btn' type="submit" onClick={handleSubmit}>Login</button>
    </form>
  );
}

export default LocalLoginForm;