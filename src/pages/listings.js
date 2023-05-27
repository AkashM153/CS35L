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
import { Container } from '@mui/material';

const timezone = require('dayjs/plugin/timezone');
dayjs.extend(timezone);

export default function Listings({ setFeaturedPosts }) {
  const [listings, setListings] = useState(null);
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

  async function retrieveListings(){
    try {
        axios.post('http://localhost:5000/getevents', {
            loc: JSON.parse(localStorage.getItem('location')),
            nEvents: 10,
            startdate: dayjs().startOf('day').toDate(),
            enddate: dayjs().endOf('day').toDate(),
            eventtype: eventTypes[localStorage.getItem('searchtype')]
        }, { crossdomain: true })
        .then((res) => {
            if (res && res.status == 200){
                setListings(res.data)
            }
            else {
                alert(res.data.message)
            }
        })
    }
    catch (err){
        alert("Failed to retrieve events: ", err.message)
    }
}

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
    <Grid container >

    </Grid>
      <List>
        {listings &&
          listings.map((listing, index) => (
            <React.Fragment key={listing._id}>
              <Paper elevation={4} style={{ width: '300px', p: 2, padding: '20px'}}>
                {/*<ListItemText
                  primary={listing.title}
                  secondary={listing.description}
                  onClick={() =>
                    updateFeaturedPost(index, {
                      title: listing.title,
                      date: listing.startDate,
                      description: listing.description,
                      eventType: listing.eventtype,
                      startTime: listing.startDate,
                      endTime: listing.endDate,
                      image: 'https://source.unsplash.com/random?wallpapers',
                      imageLabel: 'Image Text',
                    })
                  }
                />*/}
                <Grid>
                {listing.title}
                {listing.description}
                </Grid>
              </Paper>
              <Divider />
            </React.Fragment>
          ))}
      </List>
    </React.Fragment>
  );
}

/*
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function Listings(){
    const [listings, setListings] = useState(null);

    async function retrieveListings(){
        try {
            axios.post('http://localhost:5000/getevents', {
                loc: JSON.parse(localStorage.getItem('location')),
                nEvents: 10,
                startdate: dayjs().startOf('day'),
                enddate: dayjs().endOf('day'),
                eventtype: null
            }, { crossdomain: true })
            .then((res) => {
                if (res && res.status == 200){
                    setListings(res.data)
                }
                else {
                    alert(res.data.message)
                }
            })
        }
        catch (err){
            alert("Failed to retrieve events: ", err.message)
        }
    }
    useEffect(()=>{
        retrieveListings();
    }, [])
    return(
        <>
        </>
    )
} 
*/
