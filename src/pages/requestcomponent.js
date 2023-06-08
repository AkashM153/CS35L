import React, { Component, useState } from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { stringAvatar } from './stringAvatar';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';

const defaultTheme = createTheme();

class RequestComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {request} = this.props;

        return (
            <div style={{ border: '1px 	solid goldenrod', borderRadius: '4px', padding: '8px', marginBottom: '8px' }}>
            <Typography variant="h6" color = '#0047AB'>
            {request.firstName} {request.lastName}
            </Typography>
            {/* Render other friend information here */}
            <Typography variant="body1">
            Email: {request.email}
            </Typography>
            {/* Add more friend information as needed */}
            </div>
        );
    }
}

RequestComponent.defaultProps = {
  buttons: true,
  onPress: ()=>{}
}

export default RequestComponent