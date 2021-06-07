import { Button } from "@geist-ui/react";
import app from "../../../firebase";

const Home = () => {
    return (
        <>
            <h2>Home Page</h2>
            <Button type="dark" onClick={() => app.auth().signOut()}>
                Signout
            </Button>
        </>
    );
};

export default Home;
