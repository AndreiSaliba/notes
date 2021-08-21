/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState, useRef, useContext } from "react";
import { NotesContext } from "../context/Notes";
import { ThemeContext } from "../context/Theme";
import { Card, useClickAway } from "@geist-ui/react";

const AddNote = () => {
    const { addNote } = useContext(NotesContext);
    const { getTheme } = useContext(ThemeContext);
    const AddContainer = useRef();
    const [opened, setOpened] = useState(false);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    const saveNote = () => {
        setOpened(false);
        (title !== "" || note !== "") &&
            addNote({
                id: new Date().getTime().toString(36),
                title,
                note,
                color: "",
                pinned: false,
            });
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
                style={{
                    width: "550px",
                    maxWidth: "91.5vw",
                    marginTop: "30px",
                }}
            >
                <Card.Content style={{ padding: "10px 15px" }}>
                    {opened ? (
                        <div
                            css={css`
                                display: flex;
                                flex-direction: column;
                                outline: none;
                            `}
                        >
                            <div
                                contentEditable="true"
                                placeholder="Title"
                                css={css`
                                    width: 100%;
                                    max-width: 100%;
                                    margin-bottom: 15px;
                                    outline: none;
                                    overflow-wrap: break-word;
                                    font-size: 20px;
                                    white-space: pre-wrap;
                                    &:empty::before {
                                        content: attr(placeholder);
                                        color: #555;
                                    }
                                `}
                                onInput={(e) => {
                                    setTitle(e.currentTarget.innerText);
                                }}
                            ></div>

                            <div
                                contentEditable="true"
                                placeholder="Add note"
                                css={css`
                                    width: 100%;
                                    max-width: 100%;
                                    overflow-wrap: break-word;
                                    outline: none;
                                    white-space: pre-wrap;
                                    &:empty::before {
                                        content: attr(placeholder);
                                        color: #555;
                                    }
                                `}
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
                            contentEditable="true"
                            placeholder="Add note"
                            css={css`
                                width: 100%;
                                max-width: 100%;
                                overflow-wrap: break-word;
                                outline: none;
                                white-space: pre-wrap;
                                &:empty::before {
                                    content: attr(placeholder);
                                    color: #555;
                                }
                            `}
                        ></div>
                    )}
                </Card.Content>
            </Card>
        </div>
    );
};
export default AddNote;
