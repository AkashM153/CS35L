import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { getlocArray, retrieveListings } from './listings';

const containerStyle = {
  width: '600px',
  height: '600px',
};

const center = {
  lat: 34.0703,
  lng: -118.448,
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function MapsComponent({toUpdate, onMarkerSelect}) {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [listings, setListings] = useState([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await retrieveListings();
      setListings(data);
      const importedlocArray = await getlocArray();
      await sleep(150); //this fixes the marker refresh so there is time to 
      //get the location array before checking if the length is nonzero
      
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
      else {
        setMarkers([])
      }
    }

    fetchData();
    setHasData(true);
  }, [toUpdate]);

  const handleMarkerClick = (marker, index) => {
    setSelectedMarker(marker);
    onMarkerSelect(index)
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
    onMarkerSelect(null)
  };

  return (
    <>{hasData ? (
      <LoadScript googleMapsApiKey="AIzaSyB99JZitN5Z-9NqEcG-iSxxNyE28aDYCIE">
        <GoogleMap mapContainerStyle={containerStyle} center={JSON.parse(localStorage.getItem('location'))} zoom={15}>
          {markers.map((marker, index) => (
            <Marker
              key={marker.key}
              position={marker.position}
              onClick={() => handleMarkerClick(marker, index)}
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
      </LoadScript>) : <p> Loading Events ... </p>}
    </>
  );
}

export default React.memo(MapsComponent);





