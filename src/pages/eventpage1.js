import React, { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs'; // Import dayjs library and Dayjs type

import { Autocomplete } from '@react-google-maps/api';

import AutocompleteLocation from './autocomplete.js';


export default function EventPage1() {
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  
  const handleStartTimeChange = (value) => {
    localStorage.setItem("starttime", value.toString())
    setStartTime(value);
  };

  const handleEndTimeChange = (value) => {
    localStorage.setItem("endtime", value.toString())
    setEndTime(value);
  };
  
  const handleDateChange = (date) => {
    localStorage.setItem("date", date.toString())
    setSelectedDate(date);
  };

  const handleFieldChange = (event) => {
    localStorage.setItem(event.target.id, event.target.value)
  }

  const handleLocationSelect = (location) => {
    localStorage.setItem("loclat", "test");
    localStorage.setItem("loclng", location.lng);
  }

  return (
    <React.Fragment>
      <Grid container spacing={5} >
        <Grid item xs={12} sm={6} >
          <TextField
            required
            id="eventName"
            name="eventName"
            label="Event Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            defaultValue={localStorage.getItem("eventName")}
            onChange={handleFieldChange}

          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="organization"
            name="organization"
            label="Organization"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            defaultValue={localStorage.getItem("organization")}
            onChange={handleFieldChange}
          />
        </Grid>
        

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                id="starttime"
                name="starttime"
                label="Start Time"
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                id="endtime"
                name="endtime"
                label="End Time"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                id="date"
                name="date"
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <AutocompleteLocation/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
