
import React, { useEffect, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import TextField from '@mui/material/TextField';

const { Component } = require('react')

class AutocompleteLocation extends Component {
  constructor (props) {
    super(props)

    this.autocomplete = null
    // Function bindings
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  // Callback function triggered when Autocomplete is loaded
  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  // Callback function triggered when the selected place changes
  onPlaceChanged () {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace()
      if (place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;
        const locName = place.name;

        // Store location details in localStorage
        localStorage.setItem("loclat", lat());
        localStorage.setItem("loclng", lng());
        localStorage.setItem("locname", locName)
      }
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  render () {
    return (
        <LoadScript googleMapsApiKey="AIzaSyB99JZitN5Z-9NqEcG-iSxxNyE28aDYCIE" libraries={["places"]}>
        <Autocomplete
            onLoad={this.onLoad}
            onPlaceChanged={this.onPlaceChanged}
          >
            <TextField
              type="text"
              placeholder="Location"
            //   style={{
            //     boxSizing: `border-box`,
            //     border: `1px solid transparent`,
            //     width: `240px`,
            //     height: `32px`,
            //     padding: `0 12px`,
            //     borderRadius: `3px`,
            //     boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            //     fontSize: `14px`,
            //     outline: `none`,
            //     textOverflow: `ellipses`,
            //     position: "absolute",
            //     left: "50%",
            //     marginLeft: "-120px"
            //   }}
            />
          </Autocomplete>
      </LoadScript>
    )
  }
}
 
// used to export the AutocompleteLocation 
// component as the default export of the file.
export default React.memo(AutocompleteLocation);