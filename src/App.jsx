import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

import { AuthProvider } from "./context/Auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Signup/Signup";
import Home from "./components/pages/Home/Home";
// import app from "./firebase";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <GeistProvider themeType="dark">
                <CssBaseline />
                <Router>
                    <Switch>
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/" component={Home} />
                    </Switch>
                </Router>
            </GeistProvider>
        </AuthProvider>
    );
}

export default App;
