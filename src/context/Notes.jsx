import React, { useState, useEffect, createContext } from "react";
import { firebase } from "../firebase";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [other, setOther] = useState([]);
    const [pinned, setPinned] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState();

    const getNotes = (user) => {
        if (user.uid) {
            firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .get()
                .then((doc) => {
                    setCurrentUser(user);
                    setOther(doc.data().other ?? []);
                    setPinned(doc.data().pinned ?? []);
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    };

    const addNote = (data) => setOther([...other, data]);

    const updateNote = (id, modalTitle, modalNote, isPinned) => {
        if (isPinned) {
            let tempNotes = [...pinned];
            tempNotes[
                tempNotes.indexOf(tempNotes.find((item) => item.id === id))
            ].title = modalTitle;
            tempNotes[
                tempNotes.indexOf(tempNotes.find((item) => item.id === id))
            ].note = modalNote;
            setPinned(tempNotes);
        } else if (!isPinned) {
            let tempNotes = [...other];
            tempNotes[
                tempNotes.indexOf(tempNotes.find((item) => item.id === id))
            ].title = modalTitle;
            tempNotes[
                tempNotes.indexOf(tempNotes.find((item) => item.id === id))
            ].note = modalNote;
            setOther(tempNotes);
        }
    };

    const pinNote = (id, isPinned) => {
        if (isPinned) {
            const item = pinned.splice(
                pinned.findIndex((item) => item.id === id),
                1
            )[0];
            item.pinned = false;
            setPinned([...pinned]);
            setOther([...other, item]);
        } else if (!isPinned) {
            const item = other.splice(
                other.findIndex((item) => item.id === id),
                1
            )[0];
            item.pinned = true;
            setOther([...other]);
            setPinned([...pinned, item]);
        }
    };

    const changeColor = (id, color, isPinned) => {
        if (isPinned) {
            let array = [...pinned];
            array[array.indexOf(array.find((item) => item.id === id))].color =
                color;
            setPinned([...array]);
        } else if (!isPinned) {
            let array = [...other];
            array[array.indexOf(array.find((item) => item.id === id))].color =
                color;
            setOther([...array]);
        }
    };

    const deleteNote = (id, isPinned) => {
        isPinned
            ? setPinned(pinned.filter((item) => item.id !== id))
            : setOther(other.filter((item) => item.id !== id));
    };

    const reorderNotes = (type, source, destination) => {
        const array = type === "other" ? other : pinned;
        const movedItem = array.splice(source, 1)[0];
        array.splice(destination, 0, movedItem);
        type === "other" ? setOther([...array]) : setPinned([...array]);
        firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid)
            .set({ other, pinned }, { merge: true });
    };

    useEffect(() => {
        if (currentUser) {
            firebase
                .firestore()
                .collection("users")
                .doc(currentUser.uid)
                .set({ other, pinned }, { merge: true })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        }
    }, [currentUser, other, pinned]);

    return (
        <NotesContext.Provider
            value={{
                getNotes,
                other,
                pinned,
                addNote,
                updateNote,
                deleteNote,
                pinNote,
                changeColor,
                reorderNotes,
                isModalOpen,
                setIsModalOpen,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
