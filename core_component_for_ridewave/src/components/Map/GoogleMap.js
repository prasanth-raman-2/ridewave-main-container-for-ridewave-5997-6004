import React from 'react';
import { GoogleMap as GoogleMapComponent, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, CircularProgress } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '400px'
};

// PUBLIC_INTERFACE
const GoogleMap = ({ center, markers = [], onLoad, onClick }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <GoogleMapComponent
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onClick={onClick}
      onLoad={onLoad}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          title={marker.title}
          icon={marker.icon}
        />
      ))}
    </GoogleMapComponent>
  );
};

export default React.memo(GoogleMap);
