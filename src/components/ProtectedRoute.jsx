import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      useAuthStore.setState({ user: JSON.parse(storedUser) });
    } else {
      
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

export default ProtectedRoute;
