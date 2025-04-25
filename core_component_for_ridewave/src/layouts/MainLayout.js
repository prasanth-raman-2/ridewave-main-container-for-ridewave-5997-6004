import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Main layout structure will be implemented here */}
      <Outlet />
    </Box>
  );
};

export default MainLayout;
