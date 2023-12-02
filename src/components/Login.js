import { BrowserRouter as Router, Routes, Route, Link, useNavigate,Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Login({ loginData, setLoginData, handleLogin }) {
    const navigate = useNavigate(); // Use the useNavigate hook
  
    const handleRoleChange = (e) => {
      setLoginData({ ...loginData, role: e.target.value });
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <select value={loginData.role} onChange={handleRoleChange}>
          <option value="">Select Role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button onClick={() => handleLogin(navigate)}>Login</button>
  
        <div className="register-link">
          If not registered,{' '}
          <Link to="/register">
            <span style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>register here</span>
          </Link>
          .
        </div>
      </div>
    );
  }

export default Login
