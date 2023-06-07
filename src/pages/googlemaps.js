import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindowF } from '@react-google-maps/api';
import { getlocArray, retrieveListings } from './listings';

const containerStyle = {
  width: '600px',
  height: '600px',
};

const center = {
  lat: 34.0703,
  lng: -118.448,
};

const defaultMarkerIcon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
const selectedMarkerIcon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function MapsComponent({ toUpdate, onMarkerSelect, selectedMarker }) {
  const [markers, setMarkers] = useState([]);
  //const [selectedMarker, setSelectedMarker] = useState(null);
  const [listings, setListings] = useState([]);
  const [hasData, setHasData] = useState(false);

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
            icon: defaultMarkerIcon, // Add the icon property to each marker
          }))
        );
      } else {
        setMarkers([]);
      }
    }

    fetchData();
    setHasData(true);
  }, [toUpdate]);

  const handleMarkerClick = (marker, index) => {
    onMarkerSelect(index);
  };

  const handleInfoWindowClose = () => {
    onMarkerSelect(null);
  };

  const renderMarkerIcon = (index) => {
    if (selectedMarker !== null && selectedMarker=== index) {
      return window.google.maps.Animation.BOUNCE;
    } else {
      return
    }
  };

  return (
    <>
      {hasData ? (
        <LoadScript googleMapsApiKey="AIzaSyB99JZitN5Z-9NqEcG-iSxxNyE28aDYCIE">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            {markers.map((marker, index) => (
              <Marker
                key={marker.key}
                position={marker.position}
                //icon={renderMarkerIcon(index)} // Use the icon property with a custom icon based on the selected state
                onClick={() => handleMarkerClick(marker, index)}
                animation={renderMarkerIcon(index)}
              >
                {selectedMarker !== null && selectedMarker === index && (
                  <InfoWindowF onCloseClick={handleInfoWindowClose}>
                    <div>
                      <h3>{listings[selectedMarker]?.title}</h3>
                      <h4>{listings[selectedMarker]?.locNameandRoom}</h4>
                    </div>
                  </InfoWindowF>
                )}
              </Marker>
            ))}
            <div id="location-labels">
              {listings.map((listing, index) => (
                <div
                  key={index}
                  className="location-label"
                  onClick={() => handleMarkerClick(markers[index], index)}
                >
                  {listing.title}
                </div>
              ))}
            </div>
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Loading Events...</p>
      )}
    </>
  );
}

export default React.memo(MapsComponent);
