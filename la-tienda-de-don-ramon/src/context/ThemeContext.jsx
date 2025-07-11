    // src/context/ThemeContext.jsx
    import React, { createContext, useState, useContext, useEffect } from 'react';

    const ThemeContext = createContext();

    export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
        document.body.classList.toggle('dark-mode', isDark);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.body.classList.toggle('dark-mode', newMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {children}
        </ThemeContext.Provider>
    );
    };

    export const useTheme = () => useContext(ThemeContext);