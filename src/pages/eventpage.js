import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EventPage1 from './eventpage1';
import EventPage2 from './eventpage2';
import { Navigate } from 'react-router-dom';
import PrimarySearchAppBar from './navbar';
import dayjs from 'dayjs'
import axios from 'axios'


const mongoose = require('mongoose')


const steps = ['Event details', 'Add Description'];


function getStepContent(step) {
  switch (step) {
    case 0:
      return <EventPage1/>;
    case 1:
      return <EventPage2/>;
    default:
      throw new Error('Unknown step');
  }
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };
  const handleNext = () => {
    if (activeStep !== steps.length-1){
      setActiveStep(activeStep + 1);
    }
    else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {/*
    if (localStorage.getItem("date") == null){
      localStorage.setItem("date", dayjs())
    }*/
    const exDate = dayjs(localStorage.getItem("date")).format('YYYY-MM-DD')
    const exStart = dayjs(localStorage.getItem("starttime")).format('THH:mm:ss')
    const exEnd = dayjs(localStorage.getItem("endtime")).format('THH:mm:ss')
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        localStorage.setItem('image-upload',dataUrl);
        continueFormSubmission(exDate,exStart, exEnd);
      };
      reader.readAsDataURL(imageFile);
    } else {
      continueFormSubmission(exDate, exStart, exEnd);
    }
  };
  const continueFormSubmission = (exDate, exStart, exEnd) => {
    const room = localStorage.getItem('room')
    const locNameandRoom = (room ? (localStorage.getItem('locname') + ', Room ' + room) : localStorage.getItem('locname'))
    axios.post('http://localhost:5000/addevent', {
      creator: localStorage.getItem('userID'),
      creatorname: localStorage.getItem('name'),
      orgname: localStorage.getItem('organization'),
      title: localStorage.getItem('eventName'),
      description: localStorage.getItem('description'),
      eventtype: localStorage.getItem('eventtype'),
      locNameandRoom: locNameandRoom,
      startDate: new Date(exDate+exStart),
      endDate: new Date(exDate+exEnd),
      location: {
        type: 'Point',
        coordinates: [Number(localStorage.getItem("loclng")), Number(localStorage.getItem("loclat"))]
      },
      image: localStorage.getItem('image-upload')
      

    }, { crossdomain: true })
    .then((res) => {
      if (res.status == 200){
        localStorage.setItem('organization', '')
        localStorage.setItem('eventName', '')
        localStorage.setItem('description', '')
        localStorage.setItem('eventtype', '')
        localStorage.setItem('room', '')
        localStorage.setItem('locname', '')
        window.location.assign("/home")
        alert("Event Successfully Uploaded");
      }
      if (res.status == 201){
        alert("Invalid Input, Please Fill Out All Required Fields");
      }
      if (res.status == 202){
        alert("Event Already Exists"); 
      }
      if (res.status == 203){
        alert("Event Upload Failure :("); 
      }
    })
    .catch((err) => {
      alert("Could Not Log You In :(");
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <PrimarySearchAppBar/>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
        <Paper variant="outlined" sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Add Event
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Add Event' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
