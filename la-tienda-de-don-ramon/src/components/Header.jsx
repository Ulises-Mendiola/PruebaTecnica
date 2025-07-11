    // src/components/Header.jsx
    import React from 'react';
    import { useAuth } from '../context/AuthContext';
    import { useTheme } from '../context/ThemeContext';
    import DonRamon from '../assets/DonRamon.png';
    import './Header.css'; // Importación corregida

    function Header() {
    const { user } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <header className={darkMode ? 'dark-mode' : ''}>
        <div className="logo-container">
            <img src={DonRamon} alt="Logo de Don Ramón" className="logo" />
            <h1>La Tienda de Don Ramón</h1>
        </div>
        
        <div className="header-controls">
            {user && (
            <div className="user-greeting">
                Hola, {user.name}!
            </div>
            )}
            
            <button 
            onClick={toggleDarkMode} 
            className="theme-toggle"
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
            {darkMode ? '☀️' : '🌙'}
            </button>
        </div>
        </header>
    );
    }

    export default Header;