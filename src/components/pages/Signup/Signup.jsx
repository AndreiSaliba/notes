import { useState, useContext } from "react";
import "./Signup.css";
import { useFormik } from "formik";
import { Card, Input, Button, Spacer, Text } from "@geist-ui/react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../context/Auth";
import app from "../../../firebase";

const Signup = () => {
    const [error, setError] = useState("");

    let history = useHistory();
    const { user } = useContext(AuthContext);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        onSubmit: (values) => {
            if (values.email && values.password) {
                if (values.email.match(/^\S+@\S+\.\S+$/)) {
                    app.auth()
                        .createUserWithEmailAndPassword(
                            values.email,
                            values.password
                        )
                        // .then((user) => setUser(user))
                        .then(() => history.push("/"))
                        .catch((error) => {
                            switch (error.code) {
                                case "auth/email-already-in-use":
                                    setError("Email address already in use.");
                                    break;
                                case "auth/weak-password":
                                    setError("Weak password");
                                    break;
                                case "auth/invalid-email":
                                    setError("Invalid email address");
                                    break;
                                case "auth/operation-not-allowed":
                                    setError(
                                        "Accounts can't be created with email and password."
                                    );
                                    break;
                                default:
                                    setError("An error has occourred");
                                    break;
                            }
                        });
                } else {
                    setError("Invalid email address");
                }
            }
        },
    });

    return (
        <div className="Signup-Page">
            {user && <Redirect to={{ pathname: "/" }}></Redirect>}
            <Card width="400px">
                <form className="Signup-Form">
                    <h3>Sign Up</h3>
                    <span className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            name="email"
                            width="100%"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </span>
                    <Spacer y={0.5} />
                    <span className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <Input.Password
                            id="password"
                            name="password"
                            width="100%"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </span>
                    <Spacer y={1.5} />
                    {error !== "" && (
                        <>
                            <Text type="error">{error}</Text>
                            <Spacer y={1.5} />
                        </>
                    )}

                    <Button auto type="success" onClick={formik.handleSubmit}>
                        <span style={{ width: "100px" }}>Submit</span>
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Signup;
