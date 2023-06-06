import React, {Component, useState} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Box, Button, Container, Typography, Paper, Grid, Divider, IconButton } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import 'dayjs/locale/en';
import './styles.css';

dayjs.locale('en');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(timezone);

class ListingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: false,
            count: 0
        }
    }

    componentDidMount() {
        const { isLiked } = this.props;
        if (isLiked) {
          this.setState({ isLiked: true });
        }
        const { listing } = this.props;
        if ( listing ) {
            this.setState({ count: listing.likesCount })
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
          this.setState ( { count: this.state.count + 1})
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
          this.setState ( { count: this.state.count - 1})
        } catch (err) {
          alert('Failed to unlike event: ' + err.message);
        }
      }
    

    render() {
      const { listing } = this.props;
      console.log(listing.image);
      const { isLiked } = this.state;
      const { count } = this.state;
      
      return (
        <React.Fragment key={listing._id}>
          <Paper elevation={4} style={{ width: '95%', height: 'auto', marginBottom: '10px', padding: '10px', border: '4px solid orange'}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="title-likes-container">
                <Typography variant="h5"style={{ fontFamily: 'Lato, sans-serif', fontSize: '26px', color: 'blue' }}>{listing.title}</Typography>
                  <div className="likes-count">
                    <Typography variant="body1">{count}</Typography>
                  </div>
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={() => {
                        if (!isLiked) {
                          this.likeEvent(listing._id);
                        } else {
                         this.unlikeEvent(listing._id);
                        }
                      }}
                   >
                      {isLiked ? (
                        <CheckBoxIcon style={{ color: 'green', fontSize: '32px' }} />
                      ) : (
                        <CheckBoxOutlinedIcon style={{ color: 'gray', fontSize: '32px' }} />
                      )}
                    </IconButton>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" >{listing.orgname}</Typography>
              </Grid>
              <Grid item xs={6} container justifyContent="flex-end">
                <Typography variant="body2" style={{ marginRight: '10px' }}>{dayjs(listing.startDate).format('M/D/YY')}</Typography>
                <Typography variant="body2">{dayjs(listing.startDate).format('h:mm A')}</Typography>
                <Typography variant="body2" style={{ margin: '0 5px' }}>-</Typography>
                <Typography variant="body2">{dayjs(listing.endDate).format('h:mm A')}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box border={1} borderColor="orange" p={1}>
                  <Typography variant="body1" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}>{listing.description}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <img src={listing.image} alt="Listing Image" style={{ width: '100%' }} />
              </Grid>
            </Grid>
          </Paper>
          <Divider />
        </React.Fragment>
      );
    }
      
}

export default ListingComponent