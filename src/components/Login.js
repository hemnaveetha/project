// Login.js
import React, { useState } from 'react';
import './Login.css';

import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = () => {
    // Perform email validation, e.g., check for the presence of '@'
    if (email && !email.includes('@')) {
      alert('Please add @ symbol to your email address');
    }
  };

  const navigateToGmail = () => {
    const subject = encodeURIComponent('Password Reset Request');
    const body = encodeURIComponent('Please send me the email for password reset.');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=weekwonders.app@gmail.com&su=${subject}&body=${body}`;
    window.location.href = gmailUrl;
  };
  

  const handleLogin = () => {
    // Add logic for handling login
    console.log('Login logic here');
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
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
      </div>
      <div className='forgot-password' onClick={navigateToGmail}>
        Forgot Password?<span> Click here!</span>
      </div>
      <div className='submit-container'>
        <button class="button-85" role="button">Login</button>
      </div>
    </div>
  );
};

export default Login;
