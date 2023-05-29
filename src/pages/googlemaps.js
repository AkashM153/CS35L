import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getlocArray, Listings } from './listings';

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
    async function fetchMarkers() {
      const importedlocArray = await getlocArray();
      if (importedlocArray.length > 0) {
        setMarkers(
          importedlocArray.map((location, index) => ({
            key: index,
            position: {
              lat: location[1],
              lng: location[0],
            },
          }))
        );
      }
    }

    fetchMarkers();
  }, []);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyB99JZitN5Z-9NqEcG-iSxxNyE28aDYCIE">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
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




