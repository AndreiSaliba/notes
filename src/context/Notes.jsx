import React, { useState, useEffect, createContext } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState(
        JSON.parse(localStorage.getItem("notes")) ?? []
    );

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

    const changeColor = (id, color, hex) => {
        let tempNotes = [...notes];
        tempNotes[
            tempNotes.indexOf(tempNotes.find((item) => item.id === id))
        ].color = color;
        tempNotes[
            tempNotes.indexOf(tempNotes.find((item) => item.id === id))
        ].colorHex = hex;
        setNotes([...tempNotes]);
    };

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes,
                archiveNote,
                deleteNote,
                pinNote,
                changeColor,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
