import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if user is logged in
  const isLoggedIn = () => {
    const user = localStorage.getItem('indicab_user');
    return !!user;
  };

  // If not logged in, redirect to login page
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
