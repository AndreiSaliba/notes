// import { useContext } from "react";
// import { ThemeContext } from "../../../context/Theme";
// import { Button } from "@geist-ui/react";
// import app from "../../../firebase";
import AddNote from "../../AddNote/AddNote";
import Header from "../../Header/Header";
import Notes from "../../Notes/Notes";
import "./Home.css";

const Home = () => {
    return (
        <div className="Home-Page" style={{ padding: "20px" }}>
            <Header />
            <AddNote />
            <Notes />
        </div>
    );
};

export default Home;
