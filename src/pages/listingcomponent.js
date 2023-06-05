import React, {Component, useState} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Box, Button, Container, Typography, Paper, Grid, Divider, IconButton } from '@mui/material';


import 'dayjs/locale/en';

dayjs.locale('en');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(timezone);

class ListingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: false
        }
    }

    componentDidMount() {
        const { isLiked } = this.props;
        if (isLiked) {
          this.setState({ isLiked: true });
        }

    }


    async likeEvent(listingId) {
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
          this.setState( { isLiked: true } )
        } catch (err) {
          alert('Failed to like event: ' + err.message);
        }
    }

    async unlikeEvent(listingId){
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
          this.setState( { isLiked: false } )
        } catch (err) {
          alert('Failed to unlike event: ' + err.message);
        }
      }
    

    render() {
        const { listing } = this.props;
        const { isLiked } = this.state;
        return(
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
                        if (!isLiked){
                          this.likeEvent(listing._id)
                        }
                        else {
                          this.unlikeEvent(listing._id)
                        }
                      }}
                    >
                      {(isLiked) ? (
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
        )
    }
}

export default ListingComponent