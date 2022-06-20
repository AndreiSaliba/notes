import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { AuthProvider } from "./context/Auth";
import { NotesProvider } from "./context/Notes";
import { ThemeContext } from "./context/Theme";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

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
