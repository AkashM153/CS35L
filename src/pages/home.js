import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from './navbar';
import MapsComponent from './googlemaps';
import Listings from './listings';
import FilterBar from './filterbar'
import { Box, Grid, Paper, Typography } from '@mui/material';



export default function HomePage() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      try {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        localStorage.setItem('location', JSON.stringify(loc));
      } catch {
        localStorage.setItem('location', null);
      }
    });
  }, []);

  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [eventType, setEventType] = useState(null)
  const [updateCount, setUpdateCount] = useState(0)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selected, setSelected] = useState(null)
  const [scroll, setScroll] = useState(null)

  useEffect(()=>{
    setSelected(selectedMarker)
  }, [selectedMarker])

  useEffect(()=>{
    if (selectedMarker == null){
      setSelected(selectedEvent)
      setScroll(selectedEvent)
    }
  }, [selectedEvent])

  const setDates = (startDate, endDate) => {
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)
    setUpdateCount(updateCount+1)
  }

  const setMarker = (marker) => {
    setSelectedMarker(marker)
  }

  const setEvent = (type) => {
    setEventType(type)
    setUpdateCount(updateCount+1)
  }
  
  return (
    <>
      <PrimarySearchAppBar onDateChange={setDates} onEventChange={setEvent}/>
      <Grid container spacing={2} alignItems="center" justify="center" style={{ minHeight: '100vh', padding: '20px', marginTop: '30px'}}>
        <Grid item md={6} style={{ marginLeft: '20px' }} >
          <div style={{ width: '600px', height: '600px', border: '4px solid goldenrod', borderRadius: '5px'}}>
            <MapsComponent toUpdate={updateCount} onMarkerSelect={setMarker} selectedMarker={selected}/>
          </div>
        </Grid>
        <Grid item md={5}>
          <Box display="flex" flexDirection="column" height="100%">
            <Listings selected={selected} setSelectedEvent={setSelectedEvent} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} eventType={eventType} scroll={scroll}/>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}