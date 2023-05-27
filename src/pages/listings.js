import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';


export default function Listings(){
    const [listings, setListings] = useState(null);

    async function retrieveListings(){
        try {
            axios.post('http://localhost:5000/getevents', {
                loc: JSON.parse(localStorage.getItem('location')),
                nEvents: 10,
                startdate: dayjs().startOf('day'),
                enddate: dayjs().endOf('day'),
                eventtype: null
            }, { crossdomain: true })
            .then((res) => {
                if (res && res.status == 200){
                    setListings(res.data)
                }
                else {
                    alert(res.data.message)
                }
            })
        }
        catch (err){
            alert("Failed to retrieve events: ", err.message)
        }
    }
    useEffect(()=>{
        retrieveListings();
    }, [])
    return(
        <>
        </>
    )
} 