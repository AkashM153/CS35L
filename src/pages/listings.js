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
import ListingComponent from './listingcomponent';
import 'dayjs/locale/en';
import DateFilter from './datepicker';

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
      nEvents: 20,
      startdate: new Date(localStorage.getItem('searchStartDate')),
      enddate: new Date(localStorage.getItem('searchEndDate')),
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

  return (
    <Box elevation={0} style={{ maxHeight: '70vh', overflow: 'auto', padding: '10px' }}>
      {listings &&
        listings.map((listing, index) => {
          return(
          <ListingComponent listing = {listing} isLiked = {listing.likes.includes(localStorage.getItem("userID"))}/>
          )
        })}
    </Box>
  );
}

export async function getlocArray() {
  const data = await retrieveListings();
  return locArray;
}




