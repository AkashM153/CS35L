import React, { useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from './navbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import AutocompleteLocation from './autocomplete.js';

const defaultTheme = createTheme();

export default function FriendPage() {

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
                    />
                </Grid>
                <Grid item xs={12} sm={12} >
                    <TextField
                        required
                        id="friendEmail"
                        name="friendEmail"
                        label="Email"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
