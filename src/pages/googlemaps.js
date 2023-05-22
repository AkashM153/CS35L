import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '600px',
  height: '600px'
};


//latitude and longitude 
const center = {
  lat: 34.0699,
  lng: -118.45
};


//creating a fronted function, which contians google maps api, and then specifies how much to zoom 
function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDcT8vjUTGgqt6qgDd-15ZDqPIJK8Fqqrk"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)



