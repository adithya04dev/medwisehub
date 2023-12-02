import { BrowserRouter as Router, Routes, Route, Link, useNavigate,Navigate } from 'react-router-dom';
import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import ResponsiveDrawer from './Navbar';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import PermanentDrawerLeft from './Navbar';

const PrescriptionManagement = () => {
    // console.log(token);
    // const token=useAuth;
    console.log("hello PrescriptionManagement error");

    const [prescriptionHistory, setPrescriptionHistory] = useState([]);

    const token = localStorage.getItem('token');
    
    // console.log(useAuth);
    const fetchPrescriptionHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prescription/history', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPrescriptionHistory(response.data.prescriptionHistory);
      } catch (error) {
        console.error('Error fetching prescription history:', error.response.data.message);
      }
    };
    useEffect(() => {
      fetchPrescriptionHistory();
    }, [token]);
    
      const [prescriptionText, setPrescriptionText] = useState('');
    
      const handlePrescriptionUpload = async (prescriptionText) => {
        try {
          // Make API call to upload prescription
          
    await axios.post('http://localhost:5000/api/prescription/upload', {
      prescriptionText: prescriptionText.join('\n'), // Convert array to a multiline string

    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',  // Adjust content type if needed
      },
    });
   

          console.log('Prescription uploaded successfully');
          fetchPrescriptionHistory();

          // You may also want to update the local state or fetch the updated user data after the upload
        } catch (error) {
          console.error('Error uploading prescription:', error.response.data.message);
        }
      };
      const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      try {
        // Create a FormData object and append the file to it
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        // Make a POST request to http://127.0.0.1:8000/extract-text
        const extractTextResponse = await fetch('http://127.0.0.1:8000/extract-text', {
          method: 'POST',
          body: formData,
        });
  
        // Extracted text from the response
        const { text: prescriptionText } = await extractTextResponse.json();
  
        // Call handlePrescriptionUpload to make a POST request to http://localhost:5000/api/prescription/upload
        await handlePrescriptionUpload(prescriptionText);
  
        console.log('Prescription uploaded successfully');
        console.log(`${prescriptionText}`);
        // You may also want to update the local state or fetch the updated user data after the upload
      } catch (error) {
        console.error('Error uploading prescription:', error.response.data.message);
      }
    }
  };
  
     
  return (
    <div>
      <PermanentDrawerLeft/>
      <input
    type="file"
    ref={fileInputRef}
    style={{ marginTop: '200px'  }}
    onChange={handleFileChange}
  />
  <button onClick={handleButtonClick} style={{width:'250px'}}>Upload Prescription</button>
      <div style={{ margin: '10px' }}></div>

      {prescriptionHistory.map((prescription,index) => (

        <Card key={prescription._id} sx={{ maxWidth: 650,  margin: '10px', backgroundColor: 'lightblue', 
      }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="body2" component="div">
                Prescription Date: {new Date(prescription.prescriptionDate).toLocaleString()}
              </Typography>
              <Typography variant="body2" >
                Prescription Text: {prescription.prescriptionText}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  )
}

export default PrescriptionManagement
