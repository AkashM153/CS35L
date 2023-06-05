import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from './navbar';
import MapsComponent from './googlemaps';
import Listings from './listings';
import FilterBar from './filterbar'
import { Box, Grid, Paper, Typography } from '@mui/material';



export default function HomePage() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      try {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        localStorage.setItem('location', JSON.stringify(loc));
      } catch {
        localStorage.setItem('location', null);
      }
    });
  }, []);

  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [eventType, setEventType] = useState(null)
  const [updateCount, setUpdateCount] = useState(0)

  const setDates = (startDate, endDate) => {
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)
    setUpdateCount(updateCount+1)
  }

  const setEvent = (type) => {
    setEventType(type)
    setUpdateCount(updateCount+1)
  }

  // Function to add a new featured post
  const addFeaturedPost = (newPost) => {
    setFeaturedPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64Image = reader.result;
      localStorage.setItem('image-upload', base64Image);
      // Update the imageURL state variable
      setImageURL(base64Image);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <>
      <PrimarySearchAppBar onDateChange={setDates} onEventChange={setEvent}/>
      <Grid container spacing={2} alignItems="center" justify="center" style={{ minHeight: '100vh', padding: '20px', marginTop: '30px'}}>
        <Grid item md={6} style={{ marginLeft: '20px' }} >
          <MapsComponent toUpdate={updateCount}/>
        </Grid>
        <Grid item md={5}>
          <Box display="flex" flexDirection="column" height="100%">
            <Listings setFeaturedPosts={addFeaturedPost} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} eventType={eventType}/>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}