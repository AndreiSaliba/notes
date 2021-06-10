import { useState, useRef, useEffect, useContext } from "react";
import { NotesContext } from "../../context/Notes";
import { Card, useClickAway } from "@geist-ui/react";
import "./AddNote.css";

const AddNote = () => {
    const { notes, setNotes } = useContext(NotesContext);
    const AddContainer = useRef();
    const [opened, setOpened] = useState(false);
    const [title, setTitle] = useState();
    const [note, setNote] = useState();

    useClickAway(AddContainer, () => {
        setOpened(false);
        (title || note) &&
            setNotes([
                {
                    id: notes.length > 0 ? notes[0].id + 1 : 1,
                    title,
                    note,
                },
                ...notes,
            ]);
        setTitle("");
        setNote("");
    });

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <div
            ref={AddContainer}
            onFocus={() => {
                setOpened(true);
            }}
        >
            <Card
                style={{ width: "550px", maxWidth: "85vw", marginTop: "30px" }}
            >
                <Card.Content style={{ padding: "10px 15px" }}>
                    {opened ? (
                        <>
                            <div
                                className="Title-Input"
                                contentEditable="true"
                                onInput={(e) => {
                                    setTitle(e.currentTarget.textContent);
                                }}
                            ></div>

                            <div
                                className="Note-Input"
                                contentEditable="true"
                                onInput={(e) => {
                                    setNote(e.currentTarget.textContent);
                                }}
                            ></div>
                        </>
                    ) : (
                        <div
                            className="Note-Input"
                            contentEditable="true"
                        ></div>
                    )}
                </Card.Content>
            </Card>
        </div>
    );
};
export default AddNote;
