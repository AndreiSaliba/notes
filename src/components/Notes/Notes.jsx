import { useContext } from "react";
import { NotesContext } from "../../context/Notes";
import { Text, Spacer } from "@geist-ui/react";
import Note from "../Note/Note";
import "./Notes.css";

const Notes = () => {
    const { notes } = useContext(NotesContext);

    return (
        <div>
            <Spacer y={1.5} />
            {notes.filter((item) => !!item.pinned).length > 0 && (
                <div>
                    <Text size={16}>Pinned</Text>
                    <div className="Notes-Container">
                        {notes
                            .filter((item) => !!item.pinned)
                            .map((element) => {
                                return <Note item={element} />;
                            })}
                    </div>
                </div>
            )}

            {notes.filter((item) => !item.pinned).length > 0 && (
                <div>
                    {notes.filter((item) => !!item.pinned).length > 0 && (
                        <Text>Other</Text>
                    )}
                    <div className="Notes-Container">
                        {notes
                            .filter((item) => !item.pinned)
                            .map((element) => {
                                return <Note item={element} />;
                            })}
                    </div>
                </div>
            )}
            <Spacer y={3} />
        </div>
    );
};

export default Notes;
