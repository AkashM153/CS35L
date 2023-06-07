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

function MapsComponent({ toUpdate, onMarkerSelect }) {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
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
    setSelectedMarker({ marker, index });
    onMarkerSelect(index);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
    onMarkerSelect(null);
  };

  const renderMarkerIcon = (index) => {
    if (selectedMarker !== null && selectedMarker.index === index) {
      return { url: selectedMarkerIcon, scaledSize: new window.google.maps.Size(40, 40) };
    } else {
      return { url: defaultMarkerIcon, scaledSize: new window.google.maps.Size(40, 40) };
    }
  };

  return (
    <>
      {hasData ? (
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            {markers.map((marker, index) => (
              <Marker
                key={marker.key}
                position={marker.position}
                icon={renderMarkerIcon(index)} // Use the icon property with a custom icon based on the selected state
                onClick={() => handleMarkerClick(marker, index)}
              >
                {selectedMarker !== null && selectedMarker.index === index && (
                  <InfoWindowF onCloseClick={handleInfoWindowClose}>
                    <div>
                      <h3>{listings[selectedMarker.index]?.title}</h3>
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
