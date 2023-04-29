import React from 'react';
import './Login.css';
import Hamoye from "../../assets/images/Hamoye.svg"

function Login() {
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
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
