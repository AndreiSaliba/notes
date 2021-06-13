/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext, useState } from "react";
import { Card, Popover, Modal } from "@geist-ui/react";
import { IoTrashOutline } from "react-icons/io5"; //, IoArchiveOutline, IoArchive
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { RiPaletteLine } from "react-icons/ri";
import { ThemeContext } from "../../context/Theme";
import { NotesContext } from "../../context/Notes";
import ColorPicker from "../ColorPicker/ColorPicker";

const Note = ({ item }) => {
    const { getTheme } = useContext(ThemeContext);
    const { notes, setNotes, pinNote, deleteNote } = useContext(NotesContext); //archiveNote,
    const { id, title, note, pinned, color, colorHex } = item; //archived,

    //Edit Note
    const [modalTitle, setModalTitle] = useState(note);
    const [modalNote, setModalNote] = useState(title);

    // Modal
    const [open, setOpen] = useState(false);
    const handler = () => {
        setOpen(true);
        setModalTitle(title);
        setModalNote(note);
    };
    const closeHandler = (event) => {
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

    const content = () => <ColorPicker id={id} />;

    return (
        <div>
            <Card
                style={{
                    alignSelf: "flex-start",
                }}
                type={color === "" ? "default" : color}
                css={css`
                    .Controls-Container {
                        visibility: hidden;
                    }

                    &:hover {
                        .Controls-Container {
                            visibility: visible;
                        }
                    }
                `}
            >
                <Card.Content style={{ padding: "10px" }}>
                    <span onClick={handler}>
                        <div className="Card-Text Home Title">{title}</div>
                        <div className="Card-Text Home">{note}</div>
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

                        <Popover content={content} trigger="hover">
                            <RiPaletteLine css={hoverButton} />
                        </Popover>

                        {/* {archived ? (
                            <IoArchive
                                css={hoverButton}
                                onClick={() => archiveNote(id)}
                            />
                        ) : (
                            <IoArchiveOutline
                                css={hoverButton}
                                onClick={() => archiveNote(id)}
                            />
                        )} */}

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
                {/* ref={Modal} */}
                <Modal.Content
                    css={css`
                        margin: -22px !important;
                        margin-bottom: -22px !important;
                        padding: 10px !important;
                        background-color: ${colorHex === "dark"
                            ? getTheme() === "dark"
                                ? "#fff"
                                : "#000"
                            : colorHex};
                        color: ${color === "cyan"
                            ? "#000"
                            : color === "violet" || color === "alert"
                            ? "#fff"
                            : colorHex === ""
                            ? getTheme() === "dark"
                                ? "#fff"
                                : "#000"
                            : getTheme() === "dark"
                            ? "#000"
                            : "#fff"};
                    `}
                >
                    <div
                        className="Title-Input"
                        contentEditable
                        suppressContentEditableWarning
                        placeholder="Title"
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
                        className="Card-Text"
                        contentEditable
                        suppressContentEditableWarning
                        css={css`
                            outline: none;
                        `}
                        placeholder="Add note"
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

                        {/* <Popover content={content} trigger="hover">
                            <RiPaletteLine css={hoverButton} />
                        </Popover> */}

                        {/* {archived ? (
                            <IoArchive
                                css={hoverButton}
                                onClick={() => archiveNote(id)}
                            />
                        ) : (
                            <IoArchiveOutline
                                css={hoverButton}
                                onClick={() => archiveNote(id)}
                            />
                        )} */}

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
            {/* </div> */}
        </div>
    );
};

export default Note;
