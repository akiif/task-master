import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import api
import axiosRequest from '../../../api/user.api';

// import components
import FormPasswordField from '../../../components/FormPasswordField';

function LocalRegisterForm() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isRegistered, setIsRegistered] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (registerEmail === "" || registerUsername === "" || registerPassword === "") {
      setErrors({
        ...errors,
        emptyError: "Email/Username/Password cannot be empty!"
      });
    } else {
      if (!validEmail(registerEmail)) {setErrors({...errors, email:"Invalid Email ID"});return;}
      else {register();}
    }
  }

  const validEmail = (email) => {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(email).search (filter) != -1;
  }

  const register = () => {
    const data = {
      email: registerEmail,
      username: registerUsername,
      password: registerPassword
    }
    axiosRequest.post('/register', data)
      .then((res) => {
        console.log(res.data);
        if (res.data.isRegistered) {
          setIsRegistered(true);
          toast.success("You have registered successfully! Login with your new account to continue..");
        }
      })
      .catch((err) => {
        err.response.data && setErrors(err.response.data);
      });
  }

  if (isRegistered) {return <Navigate to="/login" />}
  if (isLoggedIn) {return <Navigate to="/" />}

  return (
    <form className='local-auth-form' onSubmit={handleSubmit}>
      <p className='form-error-field'>{errors.emptyError}</p>
      <input
        className={`${errors.userError && 'form-input-error'} form-input`}
        type="email"
        placeholder="Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      <p className='form-error-field'>{errors.email}</p>
      <input 
        className={`${errors.userError && 'form-input-error'} form-input`}
        type="text"
        placeholder="Username"
        value={registerUsername}
        onChange={(e) => setRegisterUsername(e.target.value)} 
        spellCheck={false} 
      />
      <p className='form-error-field'>{errors.username}</p>
      <FormPasswordField
        value={registerPassword}
        onChange={(value) => setRegisterPassword(value)}
        passwordError={errors.password ? errors.password : ""}
      />
      <p className='form-error-field'>{errors.password}</p>
      <button className='form-submit-btn' type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}

export default LocalRegisterForm;