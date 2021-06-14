/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState, useRef, useContext } from "react";
import { NotesContext } from "../../context/Notes";
import { ThemeContext } from "../../context/Theme";
import { Card, useClickAway } from "@geist-ui/react";
import "./AddNote.css";

const AddNote = () => {
    const { notes, setNotes } = useContext(NotesContext);
    const { getTheme } = useContext(ThemeContext);
    const AddContainer = useRef();
    const [opened, setOpened] = useState(false);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    const saveNote = () => {
        setOpened(false);
        (title !== "" || note !== "") &&
            setNotes([
                {
                    id: notes.length > 0 ? notes[0].id + 1 : 1,
                    title,
                    note,
                    color: "",
                    pinned: false,
                },
                ...notes,
            ]);
        setTitle("");
        setNote("");
    };

    useClickAway(AddContainer, () => saveNote());

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
                        <div className="Add-Content">
                            <div
                                className="Title-Input"
                                contentEditable="true"
                                placeholder="Title"
                                onInput={(e) => {
                                    setTitle(e.currentTarget.innerText);
                                }}
                            ></div>

                            <div
                                className="Note-Input"
                                contentEditable="true"
                                placeholder="Add note"
                                onInput={(e) => {
                                    setNote(e.currentTarget.innerText);
                                }}
                            ></div>

                            <div
                                css={css`
                                    align-self: flex-end;
                                    width: fit-content;
                                    margin-top: 15px;
                                    padding: 3px 10px;
                                    border-radius: 3px;
                                    font-size: 14px;
                                    user-select: none;
                                    cursor: pointer;
                                    &:hover {
                                        background-color: ${getTheme() ===
                                        "dark"
                                            ? "#111"
                                            : "#eee"};
                                    }
                                `}
                                onClick={() => saveNote()}
                            >
                                Close
                            </div>
                        </div>
                    ) : (
                        <div
                            className="Note-Input"
                            contentEditable="true"
                            placeholder="Add note"
                        ></div>
                    )}
                </Card.Content>
            </Card>
        </div>
    );
};
export default AddNote;
