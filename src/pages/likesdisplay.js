import { smallStringAvatar } from "./stringAvatar";
import { Box, Grid, IconButton, Avatar, Typography, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AnchorOutlined } from "@mui/icons-material";

export default function LikesDisplay({ friendLikesNames, friendLikesCount }){
    let spotlight = <></>;
    const [anchor, setAnchor] = React.useState(null);
    let name = friendLikesNames[0]
    const open = Boolean(anchor);
    // Determine the content of the "spotlight" based on the number of likes
    if (friendLikesCount == 1){
        // Display avatar and name if there's only one like
        spotlight = (
            <React.Fragment>
                <Avatar {...smallStringAvatar(name)} style={{margin: '10px'}}/>
                <Typography variant="body2">Liked By {name} </Typography>
            </React.Fragment>
        )
    }
    // Display avatar, name, and count if there are multiple likes
    else if (friendLikesCount >= 1){
        spotlight = (
            <React.Fragment>
                <Avatar {...smallStringAvatar(name)} style={{margin: '10px'}}/>
                <Typography variant="body2">Liked by {name} + {friendLikesCount-1} more</Typography>
            </React.Fragment>
        )
    }
     // Event handlers for mouse enter and leave events on the IconButton
    const handleMouseEnter = (event) => {
        setAnchor(event.currentTarget)
    }

    const handleMouseLeave = () => {
        setAnchor(null)
    }

    return (
        <IconButton disableRipple={true} onClick={ open ? handleMouseLeave : handleMouseEnter}>
        <Box style={{maxWidth: '180px', textAlign: 'left', alignItems: 'center'}} display="flex">
            {spotlight}
        </Box>
        <Menu dense anchorEl={anchor} open={open}>
        {friendLikesNames.map((name, index) => (
          <MenuItem key={name}>
            {name}
          </MenuItem>
        ))}
        </Menu>
      </IconButton>

    )
}