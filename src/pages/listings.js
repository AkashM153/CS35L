import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Button, Container, Typography } from '@mui/material';
import 'dayjs/locale/en';

dayjs.locale('en');

let locArray = [];
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(timezone);

export async function retrieveListings() {
  const eventTypes = [
    'All Events',
    'Cultural Performance',
    'Professional Development',
    'Live Music',
    'Social',
    'Info Meeting',
    'Workshop',
    'Greek Life',
    'Networking',
    'Sports'
  ];
  try {
    const res = await axios.post('http://localhost:5000/getevents', {
      loc: JSON.parse(localStorage.getItem('location')),
      nEvents: 10,
      startdate: dayjs().startOf('day'),
      enddate: dayjs().endOf('day'),
      eventtype: eventTypes[localStorage.getItem('searchtype')]
    }, { crossdomain: true })
      if (res && res.status === 200) {
        const newLocArray = res.data.map((listing) => listing.location.coordinates);
        locArray = newLocArray;
        return res.data;
      } else {
        alert(res.data.message);
      }
  } catch (err) {
    alert('Failed to retrieve events: ' + err.message);
  }
}


export default function Listings({ setFeaturedPosts }) {
  const [listings, setListings] = useState(null);
  const [likedListings, setLikedListings] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await retrieveListings();
      setListings(data);
    }

    fetchData();
  }, []);


  // this is supposed to do the saving of the likes but its not
  useEffect(() => {
    // Retrieve liked listings from local storage when the component mounts
    const savedLikes = localStorage.getItem('likedListings');
    if (savedLikes) {
      setLikedListings(JSON.parse(savedLikes));
    }
  }, []);
 
  //this function as well
  useEffect(() => {
    // Save liked listings to local storage whenever the likedListings state changes
    localStorage.setItem('likedListings', JSON.stringify(likedListings));
  }, [likedListings]);

  //used to update the liked status of all the listings
  const updateLikedStatus = (listingId, liked) => {
    setLikedListings((prevLikedListings) => ({
      ...prevLikedListings,
      [listingId]: liked,
    }));
  };

  const updateFeaturedPost = (index, updatedPost) => {
    setFeaturedPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      newPosts[index] = updatedPost;
      return newPosts;
    });
  };
  
  
  
  async function likeEvent(listingId) {
    try {
      const userID = localStorage.getItem('userID');
      const res = await axios.post('http://localhost:5000/likeevent', {
        userID: userID,
        eventID: listingId
      }, { crossdomain: true });
      
      if (res.status === 200) {

      } else if (res.status === 203) {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Failed to like event: ' + err.message);
    }
  }

  async function unlikeEvent(listingId){
    try {
      const userID = localStorage.getItem('userID');
      const res = await axios.post('http://localhost:5000/unlikeevent', {
        userID: userID,
        eventID: listingId
      }, { crossdomain: true });
      
      if (res.status === 200) {
        
      } else if (res.status === 203) {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Failed to unlike event: ' + err.message);
    }
  }


  return (
    <Box elevation={0} style={{ maxHeight: '70vh', overflow: 'auto', padding: '10px' }}>
      {listings &&
        listings.map((listing, index) => {
          const isLiked = likedListings[listing._id] || false;
  
          return (
            <React.Fragment key={listing._id}>
              <Paper elevation={4} style={{ width: '95%', height: 'auto', marginBottom: '10px', padding: '10px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">{listing.title}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{listing.orgname}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">{listing.description}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{dayjs(listing.startDate).format('YYYY-MM-DD')}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{dayjs(listing.startDate).format('h:mm A')}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{dayjs(listing.endDate).format('YYYY-MM-DD')}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{dayjs(listing.endDate).format('h:mm A')}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <img src={listing.image} alt="Listing Image" style={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={() => {
                        if (!listing.likes.includes(localStorage.getItem("userID"))){
                          likeEvent(listing._id)
                        }
                        else {
                          unlikeEvent(listing._id)
                        }
                      }}
                    >
                      {(listing.likes.includes(localStorage.getItem("userID"))) ? (
                        <ThumbUpIcon style={{ color: 'blue' }} />
                      ) : (
                        <ThumbUpOutlinedIcon style={{ color: 'gray' }} />
                      )}
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
              <Divider />
            </React.Fragment>
          );
        })}
    </Box>
  );
}

export async function getlocArray() {
  const data = await retrieveListings();
  return locArray;
}




