import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  IconButton
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

// Mock data for available rides
const MOCK_RIDES = [
  {
    id: 1,
    type: 'Standard',
    icon: <DirectionsCarIcon />,
    basePrice: 15,
    waitTime: '3-5 min'
  },
  {
    id: 2,
    type: 'Premium',
    icon: <LocalTaxiIcon />,
    basePrice: 25,
    waitTime: '4-6 min'
  },
  {
    id: 3,
    type: 'Business',
    icon: <DirectionsCarIcon />,
    basePrice: 35,
    waitTime: '7-10 min'
  }
];

// PUBLIC_INTERFACE
const LandingScreen = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);

  // Calculate estimated price based on distance (mock calculation)
  const calculateEstimatedPrice = (basePrice) => {
    if (!origin || !destination) return basePrice;
    // Mock distance factor based on input length
    const distanceFactor = (origin.length + destination.length) / 20;
    return (basePrice * (1 + distanceFactor)).toFixed(2);
  };

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking ride:', {
      origin,
      destination,
      rideType: selectedRide?.type,
      estimatedPrice: calculateEstimatedPrice(selectedRide?.basePrice)
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Book Your Ride
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Stack spacing={3}>
              <TextField
                label="Pickup Location"
                fullWidth
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                variant="outlined"
              />
              
              <TextField
                label="Destination"
                fullWidth
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                variant="outlined"
              />
            </Stack>
          </Paper>

          {origin && destination && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              Available rides near you:
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {origin && destination && (
            <Stack spacing={2}>
              {MOCK_RIDES.map((ride) => (
                <Card 
                  key={ride.id}
                  variant="outlined"
                  sx={{
                    cursor: 'pointer',
                    bgcolor: selectedRide?.id === ride.id ? 'action.selected' : 'background.paper',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                  onClick={() => setSelectedRide(ride)}
                >
                  <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <IconButton color="primary" sx={{ bgcolor: 'background.default' }}>
                          {ride.icon}
                        </IconButton>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6">{ride.type}</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <AccessTimeIcon fontSize="small" />
                          <Typography variant="body2">{ride.waitTime}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">
                          ${calculateEstimatedPrice(ride.basePrice)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={!selectedRide}
                onClick={handleBooking}
                sx={{ mt: 2 }}
              >
                Book {selectedRide?.type} Ride
              </Button>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingScreen;
