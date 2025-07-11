    // src/components/LoadingSpinner.jsx
    import React from 'react';
    import './LoadingSpinner.css';

    function LoadingSpinner({ message = "Cargando..." }) {
    return (
        <div className="loading-container">
        <div className="spinner"></div>
        <p>{message}</p>
        </div>
    );
    }

    export default LoadingSpinner;