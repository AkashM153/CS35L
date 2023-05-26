import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

const eventTypes = [
  {label: 'Cultural Performance'},
  {label: 'Professional Development'},
  {label: 'Live Music'},
  {label: 'Social'},
  {label: 'Info Meeting'},
  {label: 'Workshop'},
  {label: 'Greek Life'},
  {label: 'Networking'},
  {label: 'Sports'}
]

export default function EventPage2({ triggerFunc }) {
  const [description, setDescription] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleDescriptionChange = (event) => {
    localStorage.setItem(event.target.id, event.target.value)
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };


  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextareaAutosize
            id="description"
            name="description"
            label="Description"
            placeholder="Enter description"
            minRows={3}
            defaultValue={localStorage.getItem("description")}
            value={description}
            onInput={handleDescriptionChange}
            style={{ width: '100%' }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            id="eventtype"
            name="eventtype"
            autoComplete="family-name"
            variant="standard"
            defaultValue={localStorage.getItem("eventtype")}
            options={eventTypes}
            renderInput={(params) => <TextField {...params} label="Event Type" />}
            onChange={(event, option) => {
              if (option== null){
                localStorage.setItem("eventtype", "")
              }
              else{
                localStorage.setItem("eventtype", option.label)
              }
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
