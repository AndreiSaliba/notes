import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { NotesProvider } from "./context/Notes";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { ThemeContext } from "./context/Theme";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Signup/Signup";
import Home from "./components/pages/Home/Home";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
// import app from "./firebase";
import "./App.css";

function App() {
    const { getTheme } = useContext(ThemeContext);

    return (
        <AuthProvider>
            <NotesProvider>
                <GeistProvider themeType={getTheme()}>
                    <CssBaseline />
                    <Router>
                        <Switch>
                            <Route path="/signup" component={Signup} />
                            <Route path="/login" component={Login} />
                            <Route path="/reset" component={ResetPassword} />
                            <PrivateRoute path="/" component={Home} />
                        </Switch>
                    </Router>
                </GeistProvider>
            </NotesProvider>
        </AuthProvider>
    );
}

export default App;
