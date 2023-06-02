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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function MapsComponent() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [listings, setListings] = useState([]);
  const [hasData, setHasData] = useState(false);

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await retrieveListings();
      setListings(data);
      const importedlocArray = await getlocArray();
      await sleep(150);
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

    const delayRendering = async () => {
      await sleep(1000); // Delay for 5 seconds
      setHasData(true);
    };

    fetchData();
    
    // console.log("start of delay\n");
    // console.log(markers);
    setHasData(true);
    // console.log("end of delay\n");
    // console.log(markers);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <>{hasData ? (
      <LoadScript googleMapsApiKey="AIzaSyB99JZitN5Z-9NqEcG-iSxxNyE28aDYCIE">
        <GoogleMap mapContainerStyle={containerStyle} center={JSON.parse(localStorage.getItem("location"))} zoom={15}>
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
      </LoadScript>) : <p> Loading Events ... </p>}
    </>
  );
}

export default React.memo(MapsComponent);





