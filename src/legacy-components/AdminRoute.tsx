import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  // Check if admin is logged in
  const isAdminLoggedIn = () => {
    const admin = localStorage.getItem('indicab_admin');
    return !!admin;
  };

  // If not logged in as admin, redirect to admin login page
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  // Otherwise, render the protected admin component
  return <>{children}</>;
};

export default AdminRoute;
