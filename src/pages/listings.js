import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Listings({ setFeaturedPosts }) {
  const [listings, setListings] = useState(null);

  async function retrieveListings() {
    try {
      const response = await axios.post('http://localhost:5000/getevents', {
        loc: JSON.parse(localStorage.getItem('location')),
        nEvents: 10
      }, { crossdomain: true });

      if (response && response.status === 200) {
        setListings(response.data);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Failed to retrieve events: " + err.message);
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
    <Paper elevation={4} sx={{ p: 2 }}>
      <List>
        {listings &&
          listings.map((listing, index) => (
            <React.Fragment key={listing._id}>
              <ListItem disablePadding>
                <ListItemText
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
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>
    </Paper>
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
                nEvents: 10
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
