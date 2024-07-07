import React from 'react'
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const userInfo = localStorage.getItem('userInfo');
    
    if (!userInfo) {
        return <Navigate to="/" state={{ error: 'Please fill out the form before accessing this page.' }} />;
    }

    return <>{children}</>;
}

export default ProtectedRoute
