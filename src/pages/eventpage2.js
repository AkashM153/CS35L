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

export default function EventPage2({ }) {
  const [description, setDescription] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState('');

  const handleDescriptionChange = (event) => {
    localStorage.setItem(event.target.id, event.target.value)
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
            renderInput={(params) => <TextField {...params} label="Event Type" inputProps={params.inputProps} />}
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
          <input accept="image/*" id="image-upload" type="file" onChange={handleImageChange} />
          {imageFile && (
            <div>
              <Typography variant="body1">Selected Image:</Typography>
              <img src={imagePreview} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />
            </div>
          )}
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
