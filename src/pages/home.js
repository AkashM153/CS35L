import PrimarySearchAppBar from "./navbar"
import MapsComponent from "./googlemaps"
import React, { useEffect } from 'react'
import { Grid } from "@mui/material"
import Listings from "./listings"
import { getNativeSelectUtilityClasses } from "@mui/material"

export default function HomePage(){
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            try{
                const loc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                localStorage.setItem('location', JSON.stringify(loc))
            }
            catch{
                localStorage.setItem('location', null)
            }
        })
    }, [])
    return(
        <>
            <PrimarySearchAppBar/>
            <Grid container spacing={10} alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item sx={{margin: '100px'}}>
                    {/*<MapsComponent/>*/}
                </Grid>
                <Grid item>
                    <Listings/>
                </Grid>
            </Grid>
        </>
    )
}