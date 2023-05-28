import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Listings, getlocArray } from './listings';

const containerStyle = {
  width: '600px',
  height: '600px',
};

const center = {
  lat: 34.0699,
  lng: -118.445,
};

const importedlocArray = getlocArray();

console.log(importedlocArray)


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
    if (importedlocArray.length > 0) {
      setMarkers(
        importedlocArray.map((location, index) => ({
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
          <Marker />
          <Marker />
          <Marker />
          <Marker />
          <Marker />
          <Marker position = {center} />

          {markers.map((marker) => (
            <Marker 
              key={marker.key} 
              position={marker.position} 
            />
          ))}
          {importedlocArray.length === 0 && (
            <Marker position={{ lat: 34.0699, lng: -118.445 }} />
        )}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(MapsComponent);




