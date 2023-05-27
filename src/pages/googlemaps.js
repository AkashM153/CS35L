import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PrimarySearchAppBar from './navbar';
import Listings, { locArray } from './listings';

const containerStyle = {
  width: '600px',
  height: '600px',
};

const center = {
  lat: 34.0699,
  lng: -118.445,
};

function MapsComponent() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(locArray.map((location, index) => ({
      key: index,
      position: location,
    })));
  }, []);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyB99JZitN5Z-9NqEcG-iSxxNyE28aDYCIE">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker />
          <Marker />
          <Marker />
          <Marker />
          <Marker />
          <Marker position = {{lat: 34.06, lng: -118.445}} />
          <Marker position={center} />
          {markers.map((marker) => (
            <Marker 
            key={marker.key} 
            position={marker.position} />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(MapsComponent);




