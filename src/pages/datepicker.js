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
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


export default function DateFilter(){
    const [selectedStartDate, setSelectedStartDate] = React.useState(dayjs());
    const [selectedEndDate, setSelectedEndDate] = React.useState(dayjs());

    const handleStartDateChange = (date) => {
        localStorage.setItem("startDate", date.toString())
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
        localStorage.setItem("endDate", date.toString())
        setSelectedEndDate(date);
    };

    return(
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  label="Start Date"
                  value={selectedStartDate}
                  onChange={handleStartDateChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                        borderRadius: 0, 
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      backgroundColor: 'white', // Set the fill color to white
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  id="endDate"
                  name="endDate"
                  label="End Date"
                  value={selectedEndDate}
                  onChange={handleEndDateChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                        borderRadius: 0, 
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      backgroundColor: 'white', // Set the fill color to white
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
    )
}
