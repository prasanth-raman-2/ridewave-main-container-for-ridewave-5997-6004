import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        {/* Auth routes will be added here */}
      </Route>

      {/* Main app routes */}
      <Route element={<MainLayout />}>
        {/* App routes will be added here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
