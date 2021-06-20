import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser, loadingUser } = useContext(AuthContext);

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