import { BrowserRouter as Router, Route } from "react-router-dom";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

import { AuthProvider } from "./context/Auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Signup/Signup";
import Home from "./components/pages/Home/Home";
import app from "./firebase";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <GeistProvider themeType="dark">
                <CssBaseline />
                <Router>
                    <PrivateRoute path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                </Router>
            </GeistProvider>
        </AuthProvider>
    );
}

export default App;
