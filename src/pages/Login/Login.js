//This is the login screen  to verify users and lead them to the home page
import React, { useState } from 'react';
import './Login.css';
import Hamoye from "../../assets/images/Hamoye.svg"
import { useDispatch } from 'react-redux';
import { setUid, setAmail, setLoggedIn} from '../../components/authSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../firebase"


function Login() {

   // State to store email and password entered by user
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState('');

  const dispatch = useDispatch();
  
  // Function to handle user login
  const handleLogin = (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
    const auth= getAuth();
    // Get authentication object from Firebase
    // Call signInWithEmailAndPassword method to authenticate user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email);
        console.log(user.uid)
        setSuccess('Registration successful!')
        // Dispatch actions to update Redux store with user information
        const uid = user.uid;
        dispatch(setUid({ uid, email }));
        dispatch(setAmail(user.email));
        dispatch(setLoggedIn(true));
      })
      .catch(error => {alert(error.message); setSuccess(error.message)} )
      
  }

  return (
    <div className="container">
      <div className="logo">
        <img src={Hamoye} alt="Hamoye logo" />
        <h2>AIRLINES INFORMATION</h2>
      </div>
       <div className="login-form">
       <h2>Welcome</h2>
        <h3>Login into your account</h3>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
           <input type="email" placeholder="Enter your email address" name="email" required onChange={(event) => setEmail(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"placeholder="Enter your password" onChange={(event) => setPassword(event.target.value)} />
          </div>
          <h5>Don't have an account?  <a href='/signup'>SIGN UP</a></h5>
           <p>{success}</p>
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
