/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState, useRef, useEffect, useContext } from "react";
import { NotesContext } from "../../context/Notes";
import { ThemeContext } from "../../context/Theme";
import { Card, useClickAway } from "@geist-ui/react";
import { IoTrashOutline, IoArchiveOutline } from "react-icons/io5";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import "./AddNote.css";

const AddNote = () => {
    const { notes, setNotes } = useContext(NotesContext);
    const { getTheme } = useContext(ThemeContext);
    const AddContainer = useRef();
    const [opened, setOpened] = useState(false);
    const [title, setTitle] = useState();
    const [note, setNote] = useState();
    // //Controls State
    // const [pinned, setPinned] = useState(false);

    // const hoverButton = css`
    //     width: 30px;
    //     height: 30px;
    //     border-radius: 50%;
    //     text-align: center;
    //     vertical-align: middle;
    //     padding: 6px;
    //     margin-right: 5px;
    //     &:hover {
    //         background: ${getTheme() === "dark" ? "#111" : "#eee"};
    //     }
    // `;

    const saveNote = () => {
        setOpened(false);
        (title != "" || note != "") &&
            setNotes([
                {
                    id: notes.length > 0 ? notes[0].id + 1 : 1,
                    title,
                    note,
                    pinned: false,
                    color: "",
                    archived: false,
                    deleted: false,
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
                            {/* <div className="Add-Controls-Container ">
                                {pinned ? (
                                    <AiFillPushpin
                                        css={hoverButton}
                                        onClick={() => setPinned(false)}
                                    />
                                ) : (
                                    <AiOutlinePushpin
                                        css={hoverButton}
                                        onClick={() => setPinned(true)}
                                    />
                                )}

                                <IoArchiveOutline
                                    css={hoverButton}
                                    // onClick={() => archiveNote()}
                                /> */}
                                <div
                                    css={css`
                                        align-self: flex-end;
                                        width: fit-content;
                                        border-radius: 3px;
                                        padding: 3px 10px;
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
                            {/* </div> */}
                        </div>
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
