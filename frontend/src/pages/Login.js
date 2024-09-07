import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import main_img from '../assets/authentication_without_text.svg';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const setGeneralMsg = useGeneralMsgUpdate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setEmailError('');
    setPasswordError('');
    setGeneralMsg('');

    try {
      // Call login API and save token to cookies
      await login(email, password, setLoginLoading);
      navigate('/dashboard'); 
    } catch (error) {
      setLoginLoading(false);
      // Show a general error message
      const errorMsg = error? error : 'An unknown error occurred';
      setGeneralMsg(errorMsg, 'error');
    }
  };

  return (
    <div className='authentication-container'>
      <div className='authentication-img' style={{ backgroundImage: `url(${main_img})` }} aria-hidden='true'/>
      <div className='authentication'>
      <div className='logo'>
        Logo
      </div>
      <form onSubmit={handleLogin}>
        <h1>Welcome Back!</h1>
        <h2>Login to your account</h2>

        <div className='form-group'>
          <input 
            className='input-text'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
            required
          />
          {emailError && <span className='error'>{emailError}</span>}
        </div>

        <div className='form-group'>
          <input 
            className='input-text'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
          {passwordError && <span className='error'>{passwordError}</span>}
        </div>

        <div className='form-group options'>
          <label className='checkbox-container'>
            <input type='checkbox' />
            Remember me
          </label>
          <a href='/forgot-password' className='forgot-password'>Forgot Password?</a>
        </div>

        <div className='submit-btns-container'>
          <button className='submit' type='submit' disabled={loginLoading}>
            {loginLoading ? 'Logging in...' : 'Login'}
          </button>

          <p className='or-divider'>OR</p>

          <button className='submit google-login' type='button'>
            <FcGoogle className='google-icon'/> Login with Google
            {/* TODO: add google signing functionality */}
          </button>
        </div>
      </form>

      <p className='new-user-container'>
        New user? <a className='new-user' href='/register'>Register</a>
      </p>
      </div>
    </div>
  );
};

export default Login;