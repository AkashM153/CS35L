import React, { useState } from 'react';
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

import FriendComponent from './friendcomponent';

const defaultTheme = createTheme();

export default function FriendPage() {
    const [searched, setSearched] = useState(false);
    const [friendObject, setFriendObject] = useState(null);

    const handleFieldChange = (event) => {
        localStorage.setItem(event.target.id, event.target.value)
    }

    const handleSearch = () => {
        axios.post('http://localhost:5000/searchforfriends', {
          firstName: localStorage.getItem('friendFirstName'),
          lastName: localStorage.getItem('friendLastName')
        }, { crossdomain: true })
        .then((res) => {
            if (res.status == 200){
              setFriendObject(res.data);
              setSearched(true); 
            }
            if (res.status == 203){
              alert("Could not find User"); 
            }
        })
        .catch((err) => {
            alert("Could not find User, err: ", err);
        })
    };

    /* For now, this is unncessary, as adding friends is handled in friendcomponent */
    // const handleAddFriend = () => {
    //     axios.post('http://localhost:5000/addfriend', {
    //       userID: localStorage.getItem('userID'),
    //       friendUserID: friendObject._id
    //     }, { crossdomain: true })
    //     .then((res) => {
    //         if (res.status == 200){
    //           alert("Added User"); 
    //         }
    //         if (res.status == 203){
    //           alert("Could not add User"); 
    //         }
    //     })
    //     .catch((err) => {
    //         alert("Could not add User, err: ", err);
    //     })
    // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <PrimarySearchAppBar/>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
        <Paper variant="outlined" sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Friends
          </Typography>
          <React.Fragment>
            <Grid container spacing={5} >
                <Grid item xs={12} sm={6} >
                    <TextField
                        required
                        id="friendFirstName"
                        name="friendFirstName"
                        label="First Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <TextField
                        required
                        id="friendLastName"
                        name="friendLastName"
                        label="Last Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{ mt: 3, ml: 1 }}
                    >
                    Search Friends
                    </Button>
                </Grid>
                {/* <Grid item xs={12} sm={6} >
                    <Button
                        variant="contained"
                        onClick={handleAddFriend}
                        sx={{ mt: 3, ml: 1 }}
                    >
                    Add Friend
                    </Button>
                </Grid> */}
                <>{searched && friendObject !== null ? (
                    <FriendComponent
                        friendUser={friendObject}
                    />
                ) : <> </> }</>
            </Grid>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}