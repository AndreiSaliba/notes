import { Button } from "@geist-ui/react";
import app from "../../../firebase";

const Home = () => {
    return (
        <div style={{padding:'20px'}}>
            <h2>Home Page</h2>
            <Button type="dark" onClick={() => app.auth().signOut()}>
                Signout
            </Button>
        </div>
    );
};

export default Home;
