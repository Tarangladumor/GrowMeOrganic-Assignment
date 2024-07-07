import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const navigate = useNavigate();

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const userInfo = localStorage.getItem('userInfo');
    
    if (!userInfo) {
        alert('You must enter your details before accessing this page.');
        navigate("/");
    }

    return <>{children}</>;
}

export default ProtectedRoute
