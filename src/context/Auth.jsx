import React, { useState, useEffect, createContext } from "react";
import app from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoadingUser(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, loadingUser }}>
            {children}
        </AuthContext.Provider>
    );
};
