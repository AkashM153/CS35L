import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { getlocArray, retrieveListings } from './listings';

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
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await retrieveListings();
      setListings(data);
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

    fetchData();
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyB99JZitN5Z-9NqEcG-iSxxNyE28aDYCIE">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          {markers.map((marker) => (
            <Marker
              key={marker.key}
              position={marker.position}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <h3>{listings[selectedMarker.key].title}</h3>
                <p>{listings[selectedMarker.key].description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(MapsComponent);





