import { BrowserRouter as Router, Routes, Route, Link, useNavigate,Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './App.css'; // Import the CSS file
import Login from './components/Login';
import Register from './components/Register';
import PatientDashboard from './components/PatientDashboard';
import Navbar from './components/Navbar';
import PrescriptionManagement from './components/PrescriptionManagement';
import MedicineInfo from './components/MedicineInfo';
import ReminderSystem from './components/ReminderSystem';
import Chatbot from './components/Chatbot';
import ResponsiveDrawer from './components/Navbar';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import Nut from './components/Nutients';


function App() {
  const [token, setToken] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [userRole, setUserRole] = useState('');

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post(`http://localhost:5000/api/login/${loginData.role}`, loginData);
  //     console.log(`${loginData.role} logged in successfully. Token:`, response.data.token);
  //   } catch (error) {
  //     console.error(`Error logging in as ${loginData.role}:`, error.response.data.message);
  //   }
  // };
  // Inside the handleLogin function in App.js

  
  // Inside App.js
const handleLogin = async (navigate) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/login/${loginData.role}`, loginData);
    const { token } = response.data;
    setToken(token);

    console.log(`${loginData.role} logged in successfully. Token:`, token);
    localStorage.setItem('token', token);

    // Update the user role in state or context
    setUserRole(loginData.role);

    // Navigate to the dashboard
    navigate('/Prescription'); // Pass the token as state

  } catch (error) {
    console.error(`Error logging in as ${loginData.role}:`, error.response.data.message);
  }
};



  const handleRegister = async () => {
    try {
      console.log(registerData.role);

      await axios.post(`http://localhost:5000/api/register/${registerData.role}`, registerData);
      console.log(`${registerData.role} registered successfully`);
      alert("Registered Successfull.")
    } catch (error) {
      console.error(`Error registering as ${registerData.role}:`, error.response.data.message);
    }
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/Prescription" element={<PrescriptionManagement />} />
          <Route path="/MedicineInfo" element={<MedicineInfo />} />
          <Route path="/ReminderSystem" element={<ReminderSystem />} />
          <Route path="/HealthAssistant" element={<Chatbot />} />


          <Route path="/login" element={<Login loginData={loginData} setLoginData={setLoginData} handleLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register registerData={registerData} setRegisterData={setRegisterData} handleRegister={handleRegister} />}
          />
          <Route
            path="/dashboard" element={<PrescriptionManagement />}
            
          />
          <Route
            path="/NutriTracker" element={<Nut />}
            
          />
          
        </Routes>
      </div>
    </Router>

  );
}

export default App;
