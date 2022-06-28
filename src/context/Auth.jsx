import React, { useState, useEffect, createContext } from "react";
import { auth, db } from "../firebase";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setDoc(
                    doc(db, "users", user.user.uid),
                    {
                        userID: user.user.uid,
                        email: user.user.email,
                        other: [],
                        pinned: [],
                    },
                    { merge: true }
                ).catch((error) => {
                    console.error("Error creating user record: ", error);
                });
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        return "Email address already in use.";
                    case "auth/weak-password":
                        return "Weak password";
                    case "auth/invalid-email":
                        return "Invalid email address";
                    case "auth/operation-not-allowed":
                        return "Accounts can't be created with email and password.";
                    default:
                        return "An error has occourred";
                }
            });
    };

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).catch((error) => {
            switch (error.code) {
                case "auth/wrong-password":
                    return "Wrong password";
                case "auth/user-not-found":
                    return "User not found";
                case "auth/invalid-email":
                    return "Invalid email address";
                case "auth/user-disabled":
                    return "Your account has been disabled";
                default:
                    return "An error has occourred";
            }
        });
    };

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const logOut = () =>
        signOut(auth).catch((error) => console.log(`Signout error: ${error}`));

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoadingUser(false);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                loadingUser,
                signUp,
                login,
                logOut,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
