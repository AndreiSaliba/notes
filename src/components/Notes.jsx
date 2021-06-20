/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext } from "react";
import { NotesContext } from "../context/Notes";
import { Text, Spacer } from "@geist-ui/react";
import Note from "./Note";

const Notes = () => {
    const { notes } = useContext(NotesContext);

    const notesContainer = css`
        max-width: 95vw;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(175px, 250px));
        grid-template-rows: masonry;

        @media only screen and (max-width: 615px) {
            gap: 10px 20px;
            grid-template-columns: repeat(auto-fill, minmax(175px, 95vw));
        }
    `;

    return (
        <div>
            <Spacer y={0.5} />
            {notes.filter((item) => !!item.pinned).length > 0 && (
                <div>
                    <Text size={16}>Pinned</Text>
                    <div css={notesContainer}>
                        {notes
                            .filter((item) => !!item.pinned)
                            .map((element) => {
                                return <Note key={element.id} item={element} />;
                            })}
                    </div>
                </div>
            )}

            {notes.filter((item) => !item.pinned).length > 0 && (
                <div>
                    <Spacer y={1} />
                    {notes.filter((item) => !!item.pinned).length > 0 && (
                        <Text>Other</Text>
                    )}
                    <div css={notesContainer}>
                        {notes
                            .filter((item) => !item.pinned)
                            .map((element) => {
                                return <Note key={element.id} item={element} />;
                            })}
                    </div>
                </div>
            )}
            <Spacer y={3} />
        </div>
    );
};

export default Notes;
