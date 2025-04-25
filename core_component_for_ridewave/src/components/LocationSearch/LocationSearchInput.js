import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { TextField, Paper, List, ListItem, ListItemText } from '@mui/material';

// PUBLIC_INTERFACE
const LocationSearchInput = ({ value, onChange, onSelect, placeholder }) => {
  const renderInput = ({ getInputProps }) => {
    return (
      <TextField
        {...getInputProps({
          placeholder: placeholder || 'Search location...',
          className: 'location-search-input',
        })}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />
    );
  };

  const renderSuggestions = ({ 
    getItemProps, 
    suggestions, 
    loading 
  }) => {
    return (
      <Paper 
        elevation={3} 
        sx={{
          position: 'absolute',
          zIndex: 1000,
          width: '100%',
          maxHeight: '300px',
          overflow: 'auto',
          mt: -2
        }}
      >
        <List>
          {loading && (
            <ListItem>
              <ListItemText primary="Loading..." />
            </ListItem>
          )}
          {suggestions.map((suggestion, index) => {
            const itemProps = getItemProps({ item: suggestion });
            return (
              <ListItem 
                button 
                key={suggestion.placeId}
                {...itemProps}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(232, 122, 65, 0.1)'
                  }
                }}
              >
                <ListItemText 
                  primary={suggestion.formattedSuggestion.mainText}
                  secondary={suggestion.formattedSuggestion.secondaryText}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <PlacesAutocomplete
        value={value}
        onChange={onChange}
        onSelect={onSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            {renderInput({ getInputProps })}
            {suggestions.length > 0 && renderSuggestions({
              getItemProps: getSuggestionItemProps,
              suggestions,
              loading
            })}
          </>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationSearchInput;
