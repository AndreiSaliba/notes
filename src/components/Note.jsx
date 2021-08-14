/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext, useState } from "react";
import { Card, Popover, Modal } from "@geist-ui/react";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { RiPaletteLine } from "react-icons/ri";
import { ThemeContext } from "../context/Theme";
import { NotesContext } from "../context/Notes";
import ColorPicker from "./ColorPicker";
import { Draggable } from "react-beautiful-dnd";

const Note = ({ index, item }) => {
    const { getTheme } = useContext(ThemeContext);
    const { notes, setNotes, pinNote, deleteNote } = useContext(NotesContext);
    const { id, title, note, pinned, color } = item;

    // Edit Note
    const [modalTitle, setModalTitle] = useState(note);
    const [modalNote, setModalNote] = useState(title);

    // Modal
    const [open, setOpen] = useState(false);
    const handler = () => {
        setOpen(true);
        setModalTitle(title);
        setModalNote(note);
    };
    const closeHandler = () => {
        setOpen(false);
        if (modalTitle === title || modalNote === note) {
            let tempNotes = [...notes];
            tempNotes[
                tempNotes.indexOf(tempNotes.find((item) => item.id === id))
            ].title = modalTitle;
            tempNotes[
                tempNotes.indexOf(tempNotes.find((item) => item.id === id))
            ].note = modalNote;
            setNotes(tempNotes);
        }
    };

    const hoverButton = css`
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        padding: 6px;
        margin-right: 5px;
        &:hover {
            background: ${getTheme() === "dark" ? "#44444465" : "#cccccc65"};
        }
    `;

    const cardText = css`
        width: 100%;
        margin-bottom: 10px;
        overflow-wrap: break-word;
        white-space: pre-wrap;
        outline: none;
    `;

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Card
                        style={{ backgroundColor: color }}
                        css={css`
                            alignself: "flex-start";

                            @media (hover: hover) {
                                .Controls-Container {
                                    visibility: hidden;
                                }

                                &:hover {
                                    .Controls-Container {
                                        visibility: visible;
                                    }
                                }
                            }
                        `}
                    >
                        <Card.Content style={{ padding: "10px" }}>
                            <span onClick={handler}>
                                <div
                                    css={[
                                        cardText,
                                        css`
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                            font-size: 20px;
                                            display: -webkit-box;
                                            -webkit-line-clamp: 5;
                                            -webkit-box-orient: vertical;
                                        `,
                                    ]}
                                >
                                    {title}
                                </div>
                                <div
                                    css={[
                                        cardText,
                                        css`
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                            display: -webkit-box;
                                            -webkit-line-clamp: 17;
                                            -webkit-box-orient: vertical;
                                        `,
                                    ]}
                                >
                                    {note}
                                </div>
                            </span>
                            <div
                                className="Controls-Container"
                                css={css`
                                    margin-top: 10px;
                                    margin-left: -5px;
                                `}
                            >
                                {pinned ? (
                                    <AiFillPushpin
                                        css={hoverButton}
                                        onClick={() => {
                                            pinNote(id);
                                            closeHandler();
                                        }}
                                    />
                                ) : (
                                    <AiOutlinePushpin
                                        css={hoverButton}
                                        onClick={() => {
                                            pinNote(id);
                                            closeHandler();
                                        }}
                                    />
                                )}

                                <Popover
                                    content={() => <ColorPicker id={id} />}
                                    trigger="hover"
                                >
                                    <RiPaletteLine css={hoverButton} />
                                </Popover>

                                <IoTrashOutline
                                    css={hoverButton}
                                    onClick={() => {
                                        deleteNote(id);
                                        setOpen(false);
                                    }}
                                />
                            </div>
                        </Card.Content>
                    </Card>

                    <Modal width="600px" open={open} onClose={closeHandler}>
                        <Modal.Content
                            css={css`
                                margin: -22px !important;
                                margin-bottom: -22px !important;
                                padding: 10px !important;
                                background-color: ${color};
                                color: ${getTheme() === "dark"
                                    ? "#fff"
                                    : "#000"};
                            `}
                        >
                            <div
                                className="Title-Input"
                                css={css`
                                    margin-bottom: 5px;
                                    font-size: 20px;
                                    overflow-wrap: break-word;
                                    white-space: pre-wrap;
                                    outline: none;
                                `}
                                contentEditable
                                suppressContentEditableWarning
                                onLoad={(e) => {
                                    setModalTitle(e.currentTarget.innerText);
                                }}
                                onInput={(e) => {
                                    setModalTitle(e.currentTarget.innerText);
                                }}
                            >
                                {title}
                            </div>
                            <div
                                contentEditable
                                suppressContentEditableWarning
                                placeholder="Add note"
                                css={cardText}
                                onLoad={(e) => {
                                    setModalNote(e.currentTarget.innerText);
                                }}
                                onInput={(e) => {
                                    setModalNote(e.currentTarget.innerText);
                                }}
                            >
                                {note}
                            </div>
                            <div
                                className="Controls-Container"
                                css={css`
                                    margin-top: 15px;
                                    margin-left: -5px;
                                    display: flex;
                                    align-content: center;
                                `}
                            >
                                {pinned ? (
                                    <AiFillPushpin
                                        css={hoverButton}
                                        onClick={() => pinNote(id)}
                                    />
                                ) : (
                                    <AiOutlinePushpin
                                        css={hoverButton}
                                        onClick={() => pinNote(id)}
                                    />
                                )}

                                <IoTrashOutline
                                    css={hoverButton}
                                    onClick={() => deleteNote(id)}
                                />

                                <div
                                    css={css`
                                        margin-left: auto;
                                        margin-right: 5px;
                                        width: fit-content;
                                        padding: 3px 10px;
                                        border-radius: 3px;
                                        font-size: 14px;
                                        user-select: none;
                                        cursor: pointer;
                                        &:hover {
                                            background: ${getTheme() === "dark"
                                                ? "#44444465"
                                                : "#cccccc65"};
                                        }
                                    `}
                                    onClick={() => closeHandler()}
                                >
                                    Close
                                </div>
                            </div>
                        </Modal.Content>
                    </Modal>
                </div>
            )}
        </Draggable>
    );
};

export default Note;
