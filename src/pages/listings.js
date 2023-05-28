import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid'
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Container } from '@mui/material';

let locArray = [];

export default function Listings({ setFeaturedPosts }) {
  const [listings, setListings] = useState(null);
  //const [locArray, setLocArray] = useState([]);

  async function retrieveListings() {
    try {
      const res = await axios.post('http://localhost:5000/getevents', {
        loc: JSON.parse(localStorage.getItem('location')),
        nEvents: 10,
        startdate: dayjs().startOf('day'),
        enddate: dayjs().endOf('day'),
        eventtype: null
      }, { crossdomain: true });
  
      console.log(res.data); // Check the received data from the server
  
      if (res && res.status === 200) {
        setListings(res.data);
        const newLocArray = res.data.map((listing) => listing.location.coordinates);
        locArray = newLocArray;
  
        //setLocArray(newLocArray);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Failed to retrieve events: ', err.message);
    }
  }

  /*function getlocArray() {
    return locArray;
  }*/

  useEffect(() => {
    retrieveListings();
  }, []);

  const updateFeaturedPost = (index, updatedPost) => {
    setFeaturedPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      newPosts[index] = updatedPost;
      return newPosts;
    });
  };

  return (
    <React.Fragment>
      <Box elevation={0} style={{ height: '70vh', overflow: 'auto' }}>
        <List>
          {listings &&
            listings.map((listing, index) => {
              const { orgname, title, date, description, startTime, endTime } = listing;
              return (
                <React.Fragment key={listing._id}>
                  <Paper elevation={4} style={{ width: '300px', p: 2, padding: '20px', marginBottom: '20px' }}>
                    <Grid>
                      {orgname}
                      {title} {date}
                      {description}
                      {startTime}
                      {endTime}
                    </Grid>
                  </Paper>
                  <Divider />
                </React.Fragment>
              );
            })}
        </List>
      </Box>
    </React.Fragment>
  );
}

export function getlocArray() {
  // Call the function from inside the Listings component
  console.log(locArray)
  return locArray;
}





