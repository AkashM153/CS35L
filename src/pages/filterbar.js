import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

export default function FilterBar(){
    const eventTypes = [
        'All Events',
        'Cultural Performance',
        'Professional Development',
        'Live Music',
        'Social',
        'Info Meeting',
        'Workshop',
        'Greek Life',
        'Networking',
        'Sports'
    ];

    const [typeAnchorEl, setTypeAnchorEl] = React.useState(null);
    const [selectedType, setSelectedType] = React.useState(localStorage.getItem('searchtype'));
    const typeOpen = Boolean(typeAnchorEl);
    const handleTypeItemClick = (event, index) => {
        setSelectedType(index);
        localStorage.setItem('searchtype', index);
        setTypeAnchorEl(null);
    }
    const handleTypeClick = (event) => {
        setTypeAnchorEl(event.currentTarget);
    };
    const handleTypeClose = () => {
        setTypeAnchorEl(null);
      };
    return (
        <Grid>
        <List
        component="nav"
        sx={{ bgcolor: 'background.paper', width: '200px', height: '50px' }}
        >
        <ListItem
          button
          onClick={handleTypeClick}
          sx={{display:'flex', align:'flex-end'}}
        >
          <ListItemText 
            secondary="Event Type"
            primary={eventTypes[selectedType]}
          />
        </ListItem>
        </List>

        <Menu
        id="lock-menu"
        anchorEl={typeAnchorEl}
        open={typeOpen}
        onClose={handleTypeClose}
      >
        {eventTypes.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedType}
            onClick={(event) => handleTypeItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
        </Grid>
    );
};