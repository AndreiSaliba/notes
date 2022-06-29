/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import { NotesContext } from "../context/Notes";
import Header from "../components/Header";
import AddNote from "../components/AddNote";
import NotesContainer from "../components/NotesContainer";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const { getNotes } = useContext(NotesContext);

    useEffect(() => {
        getNotes(currentUser);
    }, [currentUser, getNotes]);
    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px;
            `}
        >
            <Header />
            <AddNote />
            <NotesContainer />
        </div>
    );
};

export default Home;
