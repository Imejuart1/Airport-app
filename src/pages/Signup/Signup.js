import React from 'react';
import '../Login/Login.css';
import Hamoye from "../../assets/images/Hamoye.svg"

function Signup() {
  return (
    <div className="container">
      <div className="logo">
        <img src={Hamoye} alt="Hamoye logo" />
        <h2>AIRLINES INFORMATION</h2>
      </div>
       <div className="login-form">
       <h2>Welcome</h2>
        <h3>Create your account</h3>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
           <input type="email" placeholder="Enter your email address" name="email" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"placeholder="Enter your password" />
          </div>
           <h5>Already have an account? </h5>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
