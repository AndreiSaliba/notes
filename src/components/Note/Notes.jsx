// import { useState } from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { useContext } from "react";
import { jsx, css } from "@emotion/react";
import { Card, Popover } from "@geist-ui/react";
import { IoTrashOutline, IoArchiveOutline } from "react-icons/io5";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { RiPaletteLine } from "react-icons/ri";
import { ThemeContext } from "../../context/Theme";
import { NotesContext } from "../../context/Notes";

const Note = ({ item }) => {
    const { id, title, note, pinned } = item;
    // const [open, setOpen] = useState(false);s
    // const handler = () => setOpen(true);
    // const closeHandler = (event) => {
    //     setOpen(false);
    //     console.log("closed");
    // };

    const { getTheme } = useContext(ThemeContext);
    const { pinNote, archiveNote, deleteNote } = useContext(NotesContext);

    const hoverButton = css`
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        padding: 6px;
        margin-right: 5px;
        &:hover {
            background: ${getTheme() === "dark" ? "#111" : "#eee"};
        }
    `;

    const content = () => (
        <div>
            <p>Test</p>
        </div>
    );

    return (
        <Card
            key={id}
            style={{
                alignSelf: "flex-start",
            }}
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
                <div className="Card-Text Title">{title}</div>
                <div className="Card-Text">{note}</div>
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
                            onClick={() => pinNote(id)}
                        />
                    ) : (
                        <AiOutlinePushpin
                            css={hoverButton}
                            onClick={() => pinNote(id)}
                        />
                    )}

                    <IoArchiveOutline
                        css={hoverButton}
                        onClick={() => archiveNote(id)}
                    />
                    <IoTrashOutline
                        css={hoverButton}
                        onClick={() => deleteNote(id)}
                    />
                    {/* <Popover content={content} trigger="hover"> */}
                    <RiPaletteLine css={hoverButton} />
                    {/* </Popover> */}
                </div>
            </Card.Content>
        </Card>
    );
};

export default Note;

/* <Modal width="600px" open={open} onClose={closeHandler}>
        <Modal.Content
            style={{
                padding: "10px",
            }}
        >
            <div className="Card-Text Title">{title}</div>
            <div className="Card-Text">{note}</div>
        </Modal.Content>
    </Modal> */
