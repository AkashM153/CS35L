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



export default function DateFilter({ onDateChange }){
    // State variables for selected start and end dates
    const [selectedStartDate, setSelectedStartDate] = React.useState(dayjs(localStorage.getItem("searchStartDate")));
    const [selectedEndDate, setSelectedEndDate] = React.useState(dayjs(localStorage.getItem("searchEndDate")));

    useEffect(() => {
      // Update the "searchStartDate" in localStorage when selectedStartDate changes
      localStorage.setItem("searchStartDate", selectedStartDate.toString())
      // Call the onDateChange callback with updated dates
      onDateChange(selectedStartDate, selectedEndDate)
    }, [selectedStartDate]);

    useEffect(() => {
      // Update the "searchEndDate" in localStorage when selectedEndDate changes
      localStorage.setItem("searchEndDate", selectedEndDate.toString())
      // Call the onDateChange callback with updated dates
      onDateChange(selectedStartDate, selectedEndDate)
    }, [selectedEndDate]);

    const handleStartDateChange = (date) => {
      // Update the selectedStartDate state variable
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
      // Update the selectedEndDate state variable
        setSelectedEndDate(date);
    };

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={6} style={{ marginTop: '-7px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  label="Start Date"
                  value={selectedStartDate}
                  onChange={handleStartDateChange}
                  
                  sx={{
                    '& .MuiInputLabel-root': {
                      transform: 'translate(0, 0.5px)', // Move the label down
                      fontSize: '10px', // Adjust the font size
                      paddingLeft: '5px',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        // Adjust the padding to make it thinner
                        paddingTop: '6px',
                        paddingBottom: '12px',
                        borderColor: 'white',
                        borderRadius: 0, 
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'white',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'black',
                      },
                      backgroundColor: 'white', // Set the fill color to white
                      // Adjust the height to make it thinner
                      height: '47px',
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} style={{ marginTop: '-7px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  id="endDate"
                  name="endDate"
                  label="End Date"
                  value={selectedEndDate}
                  onChange={handleEndDateChange}
                  inputLabelProps={{
                    shrink: true,
                    style: { fontSize: '7px', position: 'absolute', top: '-7px', left: '10px' },
                  }}
                  sx={{
                    '& .MuiInputLabel-root': {
                      transform: 'translate(0, 0.5px)', // Move the label down
                      fontSize: '10px', // Adjust the font size
                      paddingLeft: '5px',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        // Adjust the padding to make it thinner
                        paddingTop: '6px',
                        paddingBottom: '12px',
                        borderColor: 'white',
                        borderRadius: 0, 
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'white',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'black',
                      },
                      backgroundColor: 'white', // Set the fill color to white
                      // Adjust the height to make it thinner
                      height: '47px',
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}
