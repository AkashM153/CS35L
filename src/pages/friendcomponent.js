import React, { Component, useState } from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from './navbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';

const defaultTheme = createTheme();

class FriendComponent extends Component {
    constructor(props) {
        super(props);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    }

    async handleAddFriend() {
        const {friendUser} = this.props;
        axios.post('http://localhost:5000/addfriend', {
          userID: localStorage.getItem('userID'),
          friendUserID: friendUser._id
        }, { crossdomain: true })
        .then((res) => {
            if (res.status == 200){
              alert("Added User"); 
            }
            if (res.status == 203){
              alert("Could not add User"); 
            }
        })
        .catch((err) => {
            alert("Could not add User, err: ", err);
        })
    }

    async handleRemoveFriend() {
        const {friendUser} = this.props;
        axios.post('http://localhost:5000/removefriend', {
          userID: localStorage.getItem('userID'),
          friendUserID: friendUser._id
        }, { crossdomain: true })
        .then((res) => {
            if (res.status == 200){
              alert("Removed User"); 
            }
            if (res.status == 203){
              alert("Could not remove User"); 
            }
        })
        .catch((err) => {
            alert("Could not remove User, err: ", err);
        })
    }

    render() {

        const {friendUser} = this.props;

        return (
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
                <Paper variant="outlined" sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 3 } }}>
                  <React.Fragment>
                    <Box container spacing={5} >
                        {friendUser.firstName + " " + friendUser.lastName + ": " + friendUser.email}
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={this.handleAddFriend}
                        >
                        <AddIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={this.handleRemoveFriend}
                        >
                        <RemoveIcon />
                        </IconButton>
                    </Box>
                  </React.Fragment>
                </Paper>
              </Container>
              
            </ThemeProvider>
          );
    }
}

export default FriendComponent