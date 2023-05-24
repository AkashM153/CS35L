import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

export default function EventPage2() {
  const [description, setDescription] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextareaAutosize
            id="description"
            name="description"
            label="Description"
            placeholder="Enter description"
            minRows={4}
            value={description}
            onChange={handleDescriptionChange}
            style={{ width: '100%' }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="eventtype"
            name="eventtype"
            label="Event Type"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} md={6}>
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
