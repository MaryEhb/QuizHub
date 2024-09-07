import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { FcGoogle } from "react-icons/fc";
import main_img from '../assets/authentication_without_text.svg';
import { register } from '../services/authService';
import { GoAlert } from "react-icons/go";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();
  const setGeneralMsg = useGeneralMsgUpdate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setEmailError('');
    setPasswordError('');
    setFirstNameError('');
    setLastNameError('');
    setGeneralMsg('');

    try {
      await register(firstName, lastName, email, password);
      setRegisterLoading(false);
      setGeneralMsg('Your account was created successfully. Confirm your email then login', 'success');
      navigate('/login'); 
    } catch (error) {
      setRegisterLoading(false);
      // Show a general error message
      const errorMsg = error? error : 'An unknown error occurred';
      setGeneralMsg(errorMsg, 'error');
    }

  }

  return (
    <div className='authentication-container'>
      <div className='authentication-img' style={{ backgroundImage: `url(${main_img})` }} aria-hidden='true'/>
      <div className='authentication'>
      <div className='logo'>
        Logo
      </div>
      <form onSubmit={handleRegister}>
        <h2>Create an Account to get started</h2>

        <div className='input-names-container'>

        <div className='form-group'>
          <input 
            className='input-text'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
          />
          {firstNameError && <div className='error'><GoAlert className='error-icon'/> {firstNameError}</div>}
        </div>

        <div className='form-group'>
          <input 
            className='input-text'
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
          />
          {lastNameError && <div className='error'><GoAlert className='error-icon'/> {lastNameError}</div>}
        </div>

        </div>

        <div className='form-group'>
          <input 
            className='input-text'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
            required
          />
          {emailError && <div className='error'><GoAlert className='error-icon'/> {emailError}</div>}
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
          {passwordError && <div className='error'><GoAlert className='error-icon'/> {passwordError}</div>}
        </div>

        <div className='submit-btns-container'>
          <button className='submit' type='submit' disabled={registerLoading}>
            {registerLoading ? 'Registering...' : 'Register'}
          </button>

          <p className='or-divider'>OR</p>

          <button className='submit google-login' type='button'>
            <FcGoogle className='google-icon'/> Register with Google
            {/* TODO: add google signing functionality */}
          </button>
        </div>
      </form>

      <p className='new-user-container'>
        Have an Account? <a className='new-user' href='/login'>Login</a>
      </p>
      </div>
    </div>
  );
}

export default Register