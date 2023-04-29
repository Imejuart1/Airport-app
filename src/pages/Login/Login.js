import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
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
      <div className="logo">
        <img src="https://www.hamoye.com/images/logo.png" alt="Hamoye logo" />
      </div>
    </div>
  );
}

export default Login;
