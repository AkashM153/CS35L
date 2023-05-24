import * as React from 'react';
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



export default function EventPage1() {
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(dayjs('2022-04-17'));

  const handleStartTimeChange = (value) => {
    setStartTime(value);
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="eventName"
            name="eventName"
            label="Event Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
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


        <Grid item xs={12}>
        <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
        />
        </Grid>
        {/* Rest of your form fields */}
      </Grid>
    </React.Fragment>
  );
}
