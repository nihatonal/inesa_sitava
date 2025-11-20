import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // LocalStorage’dan token al
        const storedToken = localStorage.getItem("token");
        const storedAdmin = localStorage.getItem("admin");
        if (storedToken) {
            setToken(storedToken);
            setAdmin(storedAdmin ? JSON.parse(storedAdmin) : null);
        }
        setLoading(false);
    }, []);

    const login = ({ token, admin }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("admin", JSON.stringify(admin));
        setToken(token);
        setAdmin(admin);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        setToken(null);
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ token, admin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
