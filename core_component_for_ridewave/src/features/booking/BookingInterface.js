import React, { useState, useCallback } from 'react';
import { Box, Paper, Typography, Button, Grid } from '@mui/material';
import GoogleMap from '../../components/Map/GoogleMap';
import LocationSearchInput from '../../components/LocationSearch/LocationSearchInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { locationService } from '../../services/locationService';

// Initial map center (can be updated with user's location)
const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

// PUBLIC_INTERFACE
const BookingInterface = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState([]);
  const [price, setPrice] = useState(null);

  // Handle location selection
  const handleSelectLocation = async (address, type) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      
      // Update the selected location
      if (type === 'pickup') {
        setPickupLocation(address);
      } else {
        setDropoffLocation(address);
      }

      // Update markers and map center
      const newMarker = {
        position: latLng,
        title: address,
        icon: type === 'pickup' ? '/pickup-marker.png' : '/dropoff-marker.png'
      };

      setMarkers(prevMarkers => {
        const updatedMarkers = [...prevMarkers];
        if (type === 'pickup') {
          updatedMarkers[0] = newMarker;
        } else {
          updatedMarkers[1] = newMarker;
        }
        return updatedMarkers;
      });

      setMapCenter(latLng);

      // If both locations are set, calculate route and price
      if (pickupLocation && dropoffLocation) {
        calculateRoute();
      }
    } catch (error) {
      console.error('Error selecting location:', error);
    }
  };

  // Calculate route and estimated price
  const calculateRoute = async () => {
    try {
      const route = await locationService.calculateRoute(
        pickupLocation,
        dropoffLocation
      );
      // Assuming the route calculation returns distance and duration
      // We can implement a basic price calculation here
      const estimatedPrice = calculatePrice(route.distance, route.duration);
      setPrice(estimatedPrice);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  // Basic price calculation
  const calculatePrice = (distance, duration) => {
    const basePrice = 5;
    const pricePerKm = 2;
    const pricePerMinute = 0.5;
    
    return basePrice + (distance * pricePerKm) + (duration * pricePerMinute);
  };

  // Handle map load
  const onMapLoad = useCallback((map) => {
    // Map initialization logic here
  }, []);

  // Handle booking submission
  const handleBookRide = async () => {
    // Implement booking submission logic
  };

  return (
    <Box sx={{ p: 3, height: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <GoogleMap
            center={mapCenter}
            markers={markers}
            onLoad={onMapLoad}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              backgroundColor: 'background.paper',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              Book a Ride
            </Typography>
            
            <LocationSearchInput
              value={pickupLocation}
              onChange={setPickupLocation}
              onSelect={(address) => handleSelectLocation(address, 'pickup')}
              placeholder="Enter pickup location"
            />

            <LocationSearchInput
              value={dropoffLocation}
              onChange={setDropoffLocation}
              onSelect={(address) => handleSelectLocation(address, 'dropoff')}
              placeholder="Enter destination"
            />

            {price && (
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Estimated Price: ${price.toFixed(2)}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!pickupLocation || !dropoffLocation}
              onClick={handleBookRide}
              sx={{ mt: 2 }}
            >
              Book Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingInterface;
