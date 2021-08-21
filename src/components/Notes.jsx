/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext } from "react";
import { NotesContext } from "../context/Notes";
import { Text, Spacer } from "@geist-ui/react";
import SortableList from "react-easy-sort";
import Note from "./Note";

const Notes = () => {
    const { pinned, other, reorderNotes } = useContext(NotesContext);

    const notesContainer = css`
        max-width: 100vw;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(175px, 250px));
        grid-template-rows: masonry;

        @media only screen and (max-width: 615px) {
            gap: 10px 20px;
            grid-template-columns: repeat(auto-fill, minmax(175px, 95vw));
        }
    `;

    const handlePinned = (oldIndex, newIndex) =>
        reorderNotes("pinned", oldIndex, newIndex);

    const handleOther = (oldIndex, newIndex) =>
        reorderNotes("other", oldIndex, newIndex);

    return (
        <div
            css={css`
                max-width: 85vw;
                @media only screen and (max-width: 615px) {
                    max-width: 91.5vw;
                }
            `}
        >
            <SortableList
                onSortEnd={handlePinned}
                className="pinned"
                draggedItemClassName="pinned"
            >
                <Spacer y={0.5} />
                {pinned.length > 0 && (
                    <div>
                        <Text size={16}>Pinned</Text>
                        <div css={notesContainer}>
                            {pinned.map((element, idx) => {
                                return <Note key={element.id} item={element} />;
                            })}
                        </div>
                    </div>
                )}
            </SortableList>
            <SortableList
                onSortEnd={handleOther}
                className="other"
                draggedItemClassName="other"
            >
                <Spacer y={0.5} />
                {other.length > 0 && (
                    <div>
                        {pinned.length > 0 && <Text>Other</Text>}
                        <div css={notesContainer}>
                            {other.map((element, idx) => {
                                return (
                                    <Note
                                        key={element.id}
                                        item={element}
                                        index={idx}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </SortableList>
        </div>
    );
};

export default Notes;
