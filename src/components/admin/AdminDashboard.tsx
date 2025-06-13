
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Legacy AdminDashboard component - redirects to the main AdminDashboard page
 * This ensures backward compatibility while centralizing dashboard logic
 */
const AdminDashboard = () => {
  // Redirect to the main admin dashboard page
  return <Navigate to="/admin-dashboard" replace />;
};

export default AdminDashboard;
