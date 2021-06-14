import { useContext, useEffect } from "react";
import { NotesContext } from "../../../context/Notes";
import { AuthContext } from "../../../context/Auth";
import AddNote from "../../AddNote/AddNote";
import Header from "../../Header/Header";
import Notes from "../../Notes/Notes";
import "./Home.css";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const { loadNotes } = useContext(NotesContext);

    useEffect(() => {
        loadNotes(currentUser);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="Home-Page" style={{ padding: "20px" }}>
            <Header />
            <AddNote />
            <Notes />
        </div>
    );
};

export default Home;
