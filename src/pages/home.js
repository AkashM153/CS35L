import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from './navbar';
import MapsComponent from './googlemaps';
import Listings from './listings';
import { Grid, Paper, Typography } from '@mui/material';

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

  // Function to add a new featured post
  const addFeaturedPost = (newPost) => {
    setFeaturedPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <>
      <PrimarySearchAppBar />
      <Grid container spacing={2} alignItems="center" style={{ minHeight: '100vh', padding: '20px' }}>
        <Grid item xs={12} md={6}>
          <MapsComponent />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {featuredPosts.map((post) => (
              <Grid item xs={12} key={post.title}>
                <Paper elevation={4} sx={{ p: 2 }}>
                  <Typography variant="h5" component="h3" mb={1}>
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" mb={1}>
                    {post.date}  {post.startTime}  {post.endTime}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {post.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Listings setFeaturedPosts={addFeaturedPost} />
        </Grid>
      </Grid>
    </>
  );
}

/*
import PrimarySearchAppBar from "./navbar"
import MapsComponent from "./googlemaps"
import React, { useEffect } from 'react'
import { Grid } from "@mui/material"
import Listings from "./listings"
import { getNativeSelectUtilityClasses } from "@mui/material"

export default function HomePage(){
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            try{
                const loc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                localStorage.setItem('location', JSON.stringify(loc))
            }
            catch{
                localStorage.setItem('location', null)
            }
        })
    }, [])
    return(
        <>
            <PrimarySearchAppBar/>
            <Grid container spacing={10} alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item sx={{margin: '100px'}}>
                    {/*<MapsComponent/>*/}
                </Grid>
                <Grid item>
                    <Listings/>
                </Grid>
            </Grid>
        </>
    )
}
*/
