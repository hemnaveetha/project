// SignUp.js
import React, { useState } from 'react';
import './SignUp.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = () => {
    // Perform email validation, e.g., check for the presence of '@'
    if (email && !email.includes('@')) {
      alert('Please add @ symbol to your email address');
    }
  };

  const navigateToGmail = () => {
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=weekwonders.app@gmail.com';
    window.location.href = gmailUrl;
  };

  const handleSignIn = () => {
    // Add logic for handling sign-in
    console.log('Sign-in logic here');
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} alt='user icon' />
          <input
            type='text'
            placeholder='Username'
            title='Please fill in your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input'>
          <img src={email_icon} alt='email icon' />
          <input
            type='email'
            placeholder='Email'
            title='Please fill in your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt='password icon' />
          <input
            type='password'
            placeholder='Password'
            title='Please fill in your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt='password icon' />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            title='Please confirm your password'
          />
        </div>
      </div>
      <div className='forgot-password' onClick={navigateToGmail}>
        Already a User? <span> Login!</span>
      </div>
      <div className='submit-container'>
        <button className="button-85" role="button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
