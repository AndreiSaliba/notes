/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext, useEffect } from "react";
import { NotesContext } from "../context/Notes";
import { AuthContext } from "../context/Auth";
import AddNote from "../components/AddNote";
import Header from "../components/Header";
import Notes from "../components/NotesContainer";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    //const { getNotes } = useContext(NotesContext);

    // useEffect(() => {
    //     getNotes(currentUser);
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            {/* <AddNote /> */}
            {/* <Notes /> */}
        </div>
    );
};

export default Home;
