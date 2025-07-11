    // src/context/AuthContext.jsx
    import React, { createContext, useState, useContext, useEffect } from 'react';

    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem('user');
        }
        }
        setAuthChecked(true);
    }, []);

    const login = (username, password) => {
        if (username === 'Ulises' && password === 'TecnoCom') {
        const userData = { username, name: "Ing. Mendiola" };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ 
        user, 
        authChecked,
        login, 
        logout 
        }}>
        {children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => useContext(AuthContext);