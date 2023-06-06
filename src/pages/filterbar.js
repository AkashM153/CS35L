import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, Typography } from '@mui/material';


export default function FilterBar({ onEventChange }){
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
        onEventChange(index)
        setTypeAnchorEl(null);
    }
    const handleTypeClick = (event) => {
        setTypeAnchorEl(event.currentTarget);
    };
    const handleTypeClose = () => {
        setTypeAnchorEl(null);
      };
      return (
        <List component="nav">
          <ListItem button onClick={handleTypeClick} sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'white', '&:hover': { bgcolor: 'white' } }}>
            <ListItemText primaryTypographyProps={{ noWrap: true, variant: 'body1', color: 'black' }} primary={eventTypes[selectedType]} />
            <ArrowDropDownIcon sx={{ fontSize: '2rem', color: 'black' }} />
          </ListItem>
    
          <Menu id="lock-menu" anchorEl={typeAnchorEl} open={typeOpen} onClose={handleTypeClose}>
            {eventTypes.map((option, index) => (
              <MenuItem key={option} selected={index === selectedType} onClick={(event) => handleTypeItemClick(event, index)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </List>
      );
    }

    
    
    
    
    
    
   
    
    
    
    
    
    
    