import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import { useSelector, useDispatch } from "react-redux";
import {selectLoggedIn, setLoggedIn} from './components/authSlice';
import "./App.css"


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectLoggedIn);

 // Load login state from localStorage on app load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      dispatch(setLoggedIn(true));
    }
    else {
       dispatch(setLoggedIn(false))
      }
  }, []);

  //Save login state to localStorage on login/logout
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      {/* Navigation bar */}
      <div className="navbar">
        {/* Brand link */}
        <Link to="/" className="navbar-brand">
          HAMOYE
        </Link>
        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
        // Log out link
        <Link  className="navbar-link" onClick={() => isLoggedIn(false)}>
          Log Out
         </Link>
        ) : (
          // Sign in and sign up links
          <>
             <div className="sign">
            <Link to="/" className="navbar-link">
              Sign In
            </Link>
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
            </div>
          </>
        )}
      </div>
      {/* Routing */}
      <Routes>
        {isLoggedIn ? (
          // Show Home page when logged in
          <Route path="/" element={<Home />} />
        ) : (
          // Show Login and Signup pages when logged out
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
