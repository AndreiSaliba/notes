/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
// import { IoArchiveOutline } from "react-icons/io5";
import { useContext } from "react";
import { Card } from "@geist-ui/react";
import { NotesContext } from "../../context/Notes";
import "./Notes.css";

const Notes = () => {
    const { notes } = useContext(NotesContext);

    return (
        <div className="Notes-Container">
            {notes.map((element) => {
                const { id, title, note } = element;
                return (
                    <Card
                        key={id + "N"}
                        style={{
                            alignSelf: "flex-start",
                        }}
                    >
                        <Card.Content style={{ padding: "10px" }}>
                            <div className="Card-Text Title">{title}</div>
                            <div className="Card-Text">{note}</div>
                        </Card.Content>
                    </Card>
                );
            })}
        </div>
    );
};

export default Notes;
