import React, { useState, useEffect, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(
        localStorage.getItem("theme") ?? "system"
    );

    const getSystemTheme = () => {
        return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };

    const getTheme = () => {
        return currentTheme === "system"
            ? getSystemTheme()
            : currentTheme === "dark"
            ? "dark"
            : "light";
    };

    const updateTheme = (value) => {
        setCurrentTheme(value);
    };

    useEffect(() => {
        localStorage.setItem("theme", currentTheme);
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, getTheme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
