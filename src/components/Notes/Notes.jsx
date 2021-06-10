import { useState } from "react";
import { Card } from "@geist-ui/react";
import "./Notes.css";

const Notes = () => {
    const [notes] = useState(JSON.parse(localStorage.getItem("notes")) ?? []);

    return (
        <div className="Notes-Container">
            {notes.map((element) => {
                const { title, note } = element;
                return (
                    <Card style={{ maxWidth: "200px", margin: "5px" }}>
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
