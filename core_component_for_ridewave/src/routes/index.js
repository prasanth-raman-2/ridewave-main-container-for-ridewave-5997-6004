import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import { LandingScreen } from '../features/booking';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        {/* Auth routes will be added here */}
      </Route>

      {/* Main app routes */}
      <Route element={<MainLayout />}>
        <Route index element={<LandingScreen />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
