import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import main_img from '../assets/authentication_without_text.svg';
import { useGeneralMsg, useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { useAuth, useAuthUpdate } from '../context/AuthContext';
import { useLoadingUpdate } from '../context/LoadingContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const generalMsg = useGeneralMsg();
  const setGeneralMsg = useGeneralMsgUpdate();
  const { user, isAuthenticated, login} = useAuth();
  const updateUser = useAuthUpdate();
  const setLoading = useLoadingUpdate();

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
    <div className='authentication'>
      <div className='authentication-img' style={{ backgroundImage: `url(${main_img})` }} aria-hidden='true'/>
      <form onSubmit={handleLogin}>
        <h2>Welcome Back!</h2>
        <p>Login to your account</p>

        <div className='form-group'>
          <input 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
          {emailError && <span className='error'>{emailError}</span>}
        </div>

        <div className='form-group'>
          <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
          {passwordError && <span className='error'>{passwordError}</span>}
        </div>

        <div className='form-group'>
          <label>
            <input type='checkbox' />
            Remember me
          </label>
          <a href='/forgot-password' className='forgot-password'>Forgot Password?</a>
        </div>

        <button type='submit' disabled={loginLoading}>
          {loginLoading ? 'Logging in...' : 'Login'}
        </button>

        <span className='or-divider'>OR</span>

        <button type='button' className='google-login'>
          Login with Google
        </button>
      </form>

      <p className='new-user'>
        New user? <a href='/signup'>Sign up</a>
      </p>
    </div>
  );
};

export default Login;