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
       <PrimarySearchAppBar>
        <FilterBar /> {/* Include the FilterBar component within the PrimarySearchAppBar */}
      </PrimarySearchAppBar>
      <Grid container spacing={2} alignItems="center" style={{ minHeight: '100vh', padding: '20px' }}>
        <Grid item md={6}>
          <MapsComponent />
        </Grid>
        <Grid item >
          <Box display="flex" flexDirection="column" height="100%">
            <Listings setFeaturedPosts={addFeaturedPost} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}