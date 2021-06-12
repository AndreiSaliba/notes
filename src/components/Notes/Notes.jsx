import { useContext } from "react";
import { NotesContext } from "../../context/Notes";
import Note from "../Note/Notes";
import "./Notes.css";

const Notes = () => {
    const { notes } = useContext(NotesContext);

    return (
        <div className="Notes-Container">
            {notes.map((element) => {
                return <Note item={element} />;
            })}
        </div>
    );
};

export default Notes;
