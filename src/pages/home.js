import PrimarySearchAppBar from "./navbar"
import MapsComponent from "./googlemaps"
import React, { useEffect } from 'react'
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
            <MapsComponent/>
        </>
    )
}