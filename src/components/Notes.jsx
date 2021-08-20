/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext } from "react";
import { NotesContext } from "../context/Notes";
import { Text, Spacer } from "@geist-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Note from "./Note";

const Notes = () => {
    const { notes, reorderNotes } = useContext(NotesContext);

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

    const handleDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            reorderNotes(source.index, destination.index);
        }
    };

    return (
        <div
            css={css`
                max-width: 85vw;
                @media only screen and (max-width: 615px) {
                    max-width: 91.5vw;
                }
            `}
        >
            <DragDropContext onDragEnd={handleDragEnd}>
                <Spacer y={0.5} />
                {notes.filter((item) => !!item.pinned).length > 0 && (
                    <div>
                        <Text size={16}>Pinned</Text>
                        <Droppable droppableId="Pinned" direction="horizontal">
                            {(provided) => (
                                <div
                                    css={notesContainer}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {notes
                                        .filter((item) => !!item.pinned)
                                        .map((element, idx) => {
                                            return (
                                                <Note
                                                    key={element.id}
                                                    item={element}
                                                    index={idx}
                                                />
                                            );
                                        })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}

                {notes.filter((item) => !item.pinned).length > 0 && (
                    <div>
                        <Spacer y={1} />
                        {notes.filter((item) => !!item.pinned).length > 0 && (
                            <Text>Other</Text>
                        )}
                        <Droppable droppableId="Other" direction="horizontal">
                            {(provided) => (
                                <div
                                    css={notesContainer}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {notes
                                        .filter((item) => !item.pinned)
                                        .map((element, idx) => {
                                            return (
                                                <Note
                                                    key={element.id}
                                                    item={element}
                                                    index={idx}
                                                />
                                            );
                                        })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
                <Spacer y={3} />
            </DragDropContext>
        </div>
    );
};

export default Notes;
