import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Container, Typography } from '@mui/material';
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
  
  useEffect(() => {
    async function fetchData() {
      const data = await retrieveListings();
      setListings(data);
    }

    fetchData();
  }, []);

  const updateFeaturedPost = (index, updatedPost) => {
    setFeaturedPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      newPosts[index] = updatedPost;
      return newPosts;
    });
  };

  return (
    <Box elevation={0} style={{ maxHeight: '70vh', overflow: 'auto', padding: '10px' }}>
      {listings &&
        listings.map((listing, index) => (
          <React.Fragment key={listing._id}>
            <Paper elevation={4} style={{ width: '300px', marginBottom: '10px', padding: '10px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">{listing.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">{listing.description}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{listing.orgname}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{listing.date}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{listing.startTime}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{listing.endTime}</Typography>
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
              </Grid>
            </Paper>
            <Divider />
          </React.Fragment>
        ))}
    </Box>
  );
}

export async function getlocArray() {
  const data = await retrieveListings();
  return locArray;
}





