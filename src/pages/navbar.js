import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link , useLocation } from 'react-router-dom'
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import stringAvatar from './stringAvatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs'
import FilterBar from './filterbar'; // Import the FilterBar component
import DateFilter from './datepicker'; //Import the Date Picker component

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({ onDateChange, onEventChange }) {
  const location = useLocation();

  const isHomeScreen = location.pathname === '/home';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const avName = localStorage.getItem('name');
  let avContent = null;
  if (avName != ''){
    avContent = <Avatar {...stringAvatar(avName)}/>;
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleHomeClick = () => {
    localStorage.setItem('searchtype', 0)
    window.location.assign("/home");
  }
  
  const handleAddClick = () => {
    localStorage.setItem("eventName", "");
    localStorage.setItem("organization", "");
    localStorage.setItem("date", dayjs());
    localStorage.setItem("starttime", "");
    localStorage.setItem("endtime", "");
    localStorage.setItem("description", "");
    localStorage.setItem("eventtype", "");
    localStorage.setItem("loclng", "");
    localStorage.setItem("loclat", "");
    window.location.assign("/addevent");
  }

  const handleLogout = () => {
    handleMenuClose();
    localStorage.setItem('userId', '')
    localStorage.setItem('name', '')
    localStorage.setItem("searchStartDate", '')
    localStorage.setItem("searchEndDate", '')
  }
  
  if (!localStorage.getItem('name')){
    return <Navigate to="/"/>
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><AccountCircle style={{margin: '10px'}}/>My Profile</MenuItem>
      <MenuItem style={{color: 'red'}}onClick={handleLogout}><LogoutIcon style={{margin: '10px'}}/>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleHomeClick}>
        <IconButton
          size="large"
          color="inherit"
          >
          <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleAddClick}>
        <IconButton
          size="large"
          color="inherit"
        >
          <AddIcon />
        </IconButton>
        <p>Create Event</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton disableRipple variant="contained" style={{ backgroundColor: 'transparent' }} onClick={handleHomeClick}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color='white'
            sx={{ marginRight: '20px' }}
          >
            BruinConnect
          </Typography>
          </IconButton>
          

          
          {isHomeScreen && (
           <div style={{ display: 'flex', alignItems: 'center' }}>
           <FilterBar onEventChange={onEventChange}/>
           <div style={{ marginLeft: '20px' }}></div>
           <DateFilter onDateChange={onDateChange}/>
          </div>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleHomeClick}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleAddClick}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {avContent}
            </IconButton>
          </Box>
          {<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVertIcon/>
            </IconButton>
          </Box>}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

/*<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for event..."
              inputProps={{ 'aria-label': 'Search for event...' }}
            />
          </Search>*/
          