import { useContext } from "react"; //useState,
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import app from "../../firebase";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser, loadingUser } = useContext(AuthContext);
    // const [authState, setAuthState] = useState(false);

    // if (app.auth().currentUser.user.uid) {
    //     setAuthState(true);
    // }

    return (
        !loadingUser && (
            <Route
                {...rest}
                render={(props) =>
                    currentUser ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/login" />
                    )
                }
            />
        )
    );
};

export default PrivateRoute;
