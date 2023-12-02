import { BrowserRouter as Router, Routes, Route, Link, useNavigate,Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Navbar, Nav } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import PrescriptionManagement from './PrescriptionManagement';
import ReminderSystem from './ReminderSystem';
import MedicineInfo from './MedicineInfo';
import Chatbot from './Chatbot';
import { SidebarData } from './SidebarData';

function PatientDashboard({ token }) {
    useEffect(() => {
      const fetchPrescriptionHistory = async () => {
        try {
          // Make API call to fetch prescription history
          const response = await axios.get('http://localhost:5000/api/prescription/history', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log(response);
          // Update state or perform any other actions with the fetched data
        } catch (error) {
          console.error('Error fetching prescription history:', error.response.data.message);
        }
      };
  
      fetchPrescriptionHistory();
    }, [token]);
  
  
    const [prescriptionText, setPrescriptionText] = useState('');
  
    const handlePrescriptionUpload = async () => {
      try {
        // Make API call to upload prescription
        
  await axios.post('http://localhost:5000/api/prescription/upload', {
    prescriptionText,
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',  // Adjust content type if needed
    },
  });
  
        console.log('Prescription uploaded successfully');
        // You may also want to update the local state or fetch the updated user data after the upload
      } catch (error) {
        console.error('Error uploading prescription:', error.response.data.message);
      }
    };
const [selectedOption, setSelectedOption] = useState('chatbot');
   
  const renderComponent = () => {
    switch (selectedOption) {
      case 'prescription':
        return <PrescriptionManagement />;
      case 'reminder':
        return <ReminderSystem />;
      case 'medicineInfo':
        return <MedicineInfo />;
      default:
        return <Chatbot />;
    }
  };

  return (
    <Container fluid className="dashboard-container">
      
        {/* Sidebar */}
        <Col md={3} className="bg-info sidebar">
          <Nav defaultActiveKey="chatbot" className="flex-column">
            <Nav.Link eventKey="chatbot" onClick={() => setSelectedOption('chatbot')}>Chatbot</Nav.Link>
            <Nav.Link eventKey="prescription" onClick={() => setSelectedOption('prescription')}>Prescription Management</Nav.Link>
            <Nav.Link eventKey="reminder" onClick={() => setSelectedOption('reminder')}>Reminder System</Nav.Link>
            <Nav.Link eventKey="medicineInfo" onClick={() => setSelectedOption('medicineInfo')}>Medicine Info</Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        
      
    </Container>
  );
};

export default PatientDashboard;