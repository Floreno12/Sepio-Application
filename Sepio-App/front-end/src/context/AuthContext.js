import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Example function to set user
    const login = (userData) => {
        setUser(userData);
    };

    // Example function to clear user (logout)
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume context
export const useAuth = () => useContext(AuthContext);