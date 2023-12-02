import axios from 'axios';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import ResponsiveDrawer from './Navbar';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import PermanentDrawerLeft from './Navbar';
const Nut = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);


    const id='1c2207bf';
    const key="73ae45ba6ccd132766dc2f902a49bc61";

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleNutrientSearch = async () => {
    try {
        console.log(input);
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        {
          query: input,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': id,
            'x-app-key': key,
          },
        }
      );

      setResponses((prevResponses) => [...prevResponses, response.data.foods[0]]);
    } catch (error) {
      console.error('Error fetching nutrients:', error);
    }
  };

  const handleExerciseSearch = async () => {
    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/exercise',
        {
          query: input,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': id,
            'x-app-key': key,
          },
        }
      );

      setResponses((prevResponses) => [...prevResponses, response.data.exercises[0]]);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  return (
    <div >
        <PermanentDrawerLeft/>
        <h3  style={{marginTop:'40px'}}>Check Nutrients/Calories for your Food/Exercises</h3>
      <div style={{marginTop:'140px'}}>
      <input className="form-control" rows="4" placeholder='Check for your food items/exercise' style={{marginBottom:'10px'}} value={input} onChange={handleInputChange} />
      </div>
      <button className="btn btn-primary me-2" style={{marginBottom:'10px'}}  onClick={handleNutrientSearch}>
        Search Nutrients
      </button>
      <button className="btn btn-success" onClick={handleExerciseSearch}>
        Search Exercises
      </button>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
      {responses.map((data, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card sx={{ maxWidth: 650, margin: '10px' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.food_name || data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Calories: {data.nf_calories || data.nf_calories}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Proteins: {data.nf_protein || data.nf_protein}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fats: {data.nf_total_fat || data.nf_total_fat}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Carbohydrates: {data.nf_total_carbohydrate || data.nf_total_carbohydrate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cholesterol: {data.nf_cholesterol || data.nf_cholesterol}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Caffeine: {data.nf_caffeine || 'N/A'}
                </Typography>
                {/* Add more information here based on your needs */}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default Nut;
