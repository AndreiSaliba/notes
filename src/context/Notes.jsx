import React, { useState, useEffect, createContext } from "react";

import app from "../firebase";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [notes, setNotes] = useState([]);

    const loadNotes = (user) => {
        if (user.uid) {
            app.firestore()
                .collection("users")
                .doc(user.uid)
                .get()
                .then((doc) => {
                    setCurrentUser(user);
                    setNotes(doc.data().notes ?? []);
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    };

    const pinNote = (id) => {
        let tempNotes = [...notes];
        tempNotes[
            tempNotes.indexOf(tempNotes.find((item) => item.id === id))
        ].pinned =
            !tempNotes[
                tempNotes.indexOf(tempNotes.find((item) => item.id === id))
            ].pinned;
        setNotes([...tempNotes]);
    };

    const archiveNote = (id) => {
        let tempNotes = [...notes];
        tempNotes[
            tempNotes.indexOf(tempNotes.find((item) => item.id === id))
        ].archived =
            !tempNotes[
                tempNotes.indexOf(tempNotes.find((item) => item.id === id))
            ].archived;
        setNotes([...tempNotes]);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter((item) => item.id !== id));
    };

    const changeColor = (id, color) => {
        let tempNotes = [...notes];
        tempNotes[
            tempNotes.indexOf(tempNotes.find((item) => item.id === id))
        ].color = color;
        setNotes([...tempNotes]);
    };

    useEffect(() => {
        if (currentUser) {
            app.firestore()
                .collection("users")
                .doc(currentUser.uid)
                .set({
                    userID: currentUser.uid,
                    email: currentUser.email,
                    notes: notes,
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
        // localStorage.setItem("notes", JSON.stringify(notes));
    }, [currentUser, notes]);

    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes,
                archiveNote,
                deleteNote,
                pinNote,
                changeColor,
                loadNotes,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
