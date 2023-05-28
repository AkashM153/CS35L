import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Listings from './listings';

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

  /*useEffect(() => {
    if (Listings.locArray && Listings.locArray.length > 0) {
      setMarkers(
        Listings.locArray.map((location, index) => ({
          key: index,
          position: location,
        }))
      );
    }
  }, []);*/
  useEffect(() => {
    const locArray = Listings.listings && Listings.listings.map((listing) => listing.loc);
    if (locArray && locArray.length > 0) {
      setMarkers(
        locArray.map((location, index) => ({
          key: index,
          position: location,
        }))
      );
    }
  }, []);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyB99JZitN5Z-9NqEcG-iSxxNyE28aDYCIE">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position />
          <Marker position />
          <Marker position />
          <Marker position = {center} />
          if(marker.length === 0) <Marker position={{ lat: 34.07, lng: -118.445}} />
          {markers.map((marker) => (
            <Marker 
              key={marker.key} 
              position={marker.position} 
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(MapsComponent);




