import React, { Component, useState } from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { stringAvatar } from './stringAvatar';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';

const defaultTheme = createTheme();

class RequestComponent extends Component {
    constructor(props) {
        super(props);
        this.handleAcceptRequest = this.handleAcceptRequest.bind(this);
        this.handleDeclineRequest = this.handleDeclineRequest.bind(this);
    }

    async handleAcceptRequest() {
        const {request} = this.props;
        axios.post('http://localhost:5000/acceptrequest', {
          userID: localStorage.getItem('userID'),
          friendUserID: request._id
        }, { crossdomain: true })
        .then((res) => {
            if (res.status == 200){
              alert("Accepted Request"); 
            }
            if (res.status == 203){
              alert(res.data.message); 
            }
        })
        .catch((err) => {
            alert("Could not accept friend request, err: ", err);
        })
    }

    async handleDeclineRequest() {
        const {request} = this.props;
        axios.post('http://localhost:5000/declinerequest', {
          userID: localStorage.getItem('userID'),
          friendUserID: request._id
        }, { crossdomain: true })
        .then((res) => {
            if (res.status == 200){
              alert("Declined Request"); 
            }
            if (res.status == 203){
              alert(res.data.message); 
            }
        })
        .catch((err) => {
            alert("Could not decline friend request, err: ", err);
        })
    }

    render() {
        const {request} = this.props;

        return (
            <div style={{ border: '1px 	solid goldenrod', borderRadius: '4px', padding: '8px', marginBottom: '8px' }}>
                <Box>
                    <Typography variant="h6" color = '#0047AB'>
                    {request.firstName} {request.lastName}
                    </Typography>
                    {/* Render other friend information here */}
                    <Typography variant="body1">
                    Email: {request.email}
                    </Typography>
                    {/* Add more friend information as needed */}
                </Box>

                <Box
                >
                <IconButton
                      size="large"
                      color="inherit"
                      onClick={this.handleAcceptRequest}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={this.handleDeclineRequest}
                    >
                      <RemoveIcon />
                    </IconButton>
                </Box>
            </div>
        );
    }
}

export default RequestComponent