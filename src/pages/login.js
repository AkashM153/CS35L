import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate } from 'react-router-dom';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('http://localhost:5000/login', {
      email: data.get('email'),
      password: data.get('password')
    }, { crossdomain: true })
    .then((res) => {
      if (res.status == 201){
        localStorage.setItem('userId', res.data.id)
        localStorage.setItem('name', res.data.name)
        window.location.assign("/home");
      }
      if (res.status == 202){
        alert("Invalid email/password, click sign up if you are a new user");
      }
    })
    .catch((err) => {
      alert("Could not log you in :(");
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
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
          <Typography component="h1" variant="h5" >
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:"#577ffa", color:"#fffff"}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/*(<Link href="#" style={{color: 'white'}} variant="body2">
                  Forgot password?
                </Link>*/}
              </Grid>
              <Grid item>
                <Link href="#" style={{color: 'white'}} variant="body2" onClick={()=> window.location.href='/signup'}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4}} /> */}
      </Container>
    </ThemeProvider>
  );
}


/*  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>*/