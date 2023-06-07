import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from './navbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';

import FriendComponent from './friendcomponent';

const defaultTheme = createTheme();

export default function FriendPage() {
    const [searched, setSearched] = useState(false);
    const [friendObject, setFriendObject] = useState(null);
    const [searchedFriends, setSearchedFriends] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [changeCount, setChangeCount] = useState(0);

    useEffect(()=>{
      axios.post('http://localhost:5000/listfriends', {
        userID: localStorage.getItem('userID')
      }, { crossdomain: true })
      .then((res)=>{
        if (res.status == 200){
          setFriendsList(res.data)
        }
      })
    }, [changeCount])

    const addCount = () => {
      setChangeCount(changeCount+1)
    }

    const handleFieldChange = (event) => {
        localStorage.setItem(event.target.id, event.target.value)
    }

    const handleSearch = () => {
        axios.post('http://localhost:5000/searchforfriends', {
          firstName: localStorage.getItem('friendFirstName'),
          lastName: localStorage.getItem('friendLastName'),
          userID: localStorage.getItem('userID')
        }, { crossdomain: true })
        .then((res) => {
            if (res.status == 200){
              setSearchedFriends(res.data);
              setSearched(true); 
            }
            if (res.status == 203){
              alert(res.data.message); 
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
            Add/Remove Friends
          </Typography>
            <Grid container spacing={2} justifyContent="center">
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
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{ mt: 3, ml: 1 }}
                    >
                    Search Users
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
            </Grid>
            <Grid>
              {searched && searchedFriends.length > 0 && 
                searchedFriends.map((friend, index) => {
                  return(
                    <FriendComponent 
                      friendUser = {friend} buttons={true} onPress={addCount}
                    />
                  )
                })}
            </Grid>
        </Paper>
        <Box elevation={0} style={{ maxHeight: '70vh', overflow: 'auto', padding: '10px' }}>
          {friendsList &&
            friendsList.map((friend, index) => {
            return(
              <FriendComponent friendUser = {friend} buttons={false}/>
            ) 
          } )
           }
        </Box>
      </Container>
    </ThemeProvider>
  );
}