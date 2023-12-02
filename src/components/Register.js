import { BrowserRouter as Router, Routes, Route, Link, useNavigate,Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Register({ registerData, setRegisterData, handleRegister }) {
    const handleRoleChange = (e) => {
      setRegisterData({ ...registerData, role: e.target.value });
    };
  
    return (
      <div className="register-container">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <select value={registerData.role} onChange={handleRoleChange}>
        <option value="">Select Role</option>

          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button onClick={handleRegister}>Register</button>
        <div className="register-link">
          If  registered,,{' '}
          <Link to="/login">
            <span style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>Login  here</span>
          </Link>
          .
        </div>
      </div>
    );
  }

export default Register
