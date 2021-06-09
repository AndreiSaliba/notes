import { useState, useRef } from "react";
import { Card, useClickAway } from "@geist-ui/react";
import "./AddNote.css";

const AddNote = () => {
    const AddContainer = useRef();
    const [focused, setFocused] = useState(false);
    const [title, setTitle] = useState();
    const [note, setNote] = useState();
    const [notes, setNotes] = useState(localStorage.getItem("notes") ?? []);

    useClickAway(AddContainer, () => {
        setFocused(false);
        setNotes([
            ...notes,
            {
                title,
                note,
            },
        ]);
        localStorage.setItem("notes", notes);
    });

    return (
        <div ref={AddContainer} onFocus={() => setFocused(true)}>
            <Card
                style={{ width: "550px", maxWidth: "85vw", marginTop: "30px" }}
            >
                <Card.Content style={{ padding: "10px 15px" }}>
                    {focused ? (
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
