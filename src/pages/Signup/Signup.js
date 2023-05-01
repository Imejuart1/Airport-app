import React, { useState } from 'react';
import '../Login/Login.css';
import Hamoye from '../../assets/images/Hamoye.svg';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../firebase"
function Signup() {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle sign up
  const handleSignUp = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registration successful
        const user = userCredential.user;
        console.log(user);
        setSuccess('Registration successful!')
        alert('Registration successful!');
        
      })
      .catch((error) => {
        // If there's an error during registration, show the error message
        setSuccess(error.message)
        alert(error.message);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className='container'>
      <div className='logo'>
        <img src={Hamoye} alt='Hamoye logo' />
        <h2>AIRLINES INFORMATION</h2>
      </div>
      <div className='login-form'>
        <h2>Welcome</h2>
        <h3>Create your account</h3>
        <form>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter your email address'
              name='email'
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <h5> Already have an account? <a href='/'>SIGN IN</a></h5>
          
          <p>{success}</p>
          <button type='submit' onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
