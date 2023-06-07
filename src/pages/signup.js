import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import dayjs from 'dayjs';
import bg from "./background.css"
import Paper from '@mui/material/Paper';


const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff', // Set the outline color to white
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff', // Set the outline color to white on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#577ffa', // Set the outline color to light baby blue on focus
            },
          },
          '& .MuiInputLabel-root': {
            color: '#fff', // Set the label color to white
          },
          '& .MuiInputBase-input': {
            color: '#fff', // Set the input text color to white
          },
          '&.Mui-focused .MuiInputLabel-root': {
            color: '#FFF', // Set the focused label color to white
          },
          '&.Mui-focused .MuiInputBase-input': {
            color: '#FFF', // Set the focused input text color to white
          },
        },
      },
    },
  },
});

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('http://localhost:5000/signup', {
      firstName: data.get('firstName').trim().charAt(0).toUpperCase() + data.get('firstName').trim().substring(1).toLowerCase(),
      lastName: data.get('lastName').trim().charAt(0).toUpperCase() + data.get('lastName').trim().substring(1).toLowerCase(),
      email: data.get('email'),
      password: data.get('password')
    }, { crossdomain: true })
    .then((res) => {
      if (res.status == 200){
        alert("User already exists with this email, sign in through sign in page")
      }
      if (res.status == 202){
        alert("Please fill out all fields")
      }
      if (res.status == 201){
        localStorage.setItem('userID', res.data.id)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem("searchStartDate", dayjs().toString())
        localStorage.setItem("searchEndDate", dayjs().endOf('week').toString())
        window.location.assign("/home");
      }
    })
    .catch((err) => {
      alert("Could not sign you up :(");
      console.log("err: ", err)
    }) 
  };

  return (
    <ThemeProvider theme={theme}>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 19,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="first-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="last-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2" onClick={()=> {localStorage.setItem('searchtype', 0); window.location.href='/login'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}