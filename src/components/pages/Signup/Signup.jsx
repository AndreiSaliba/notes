import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { Card, Input, Button, Spacer, Text } from "@geist-ui/react";
import { AuthContext } from "../../../context/Auth";
import app from "../../../firebase";
import "./Signup.css";

const Signup = () => {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    currentUser && history.push("/");

    const [error, setError] = useState("");
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        onSubmit: async (values) => {
            console.log(values.email, values.password);
            if (values.email && values.password) {
                if (values.email.match(/^\S+@\S+\.\S+$/)) {
                    try {
                        await app
                            .auth()
                            .createUserWithEmailAndPassword(
                                values.email,
                                values.password
                            );
                        setError("");
                        history.push("/");
                    } catch (error) {
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
                    }
                } else {
                    setError("Invalid email address");
                }
            } else {
                setError("Please enter an email and a password");
            }
        },
    });

    return (
        <div className="Signup-Page">
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

                    {error !== "" && (
                        <span
                            style={{
                                color: "#b80000",
                                paddingTop: "15px",
                                paddingBottom: "0px",
                                fontSize: "17px",
                            }}
                        >
                            {error}
                        </span>
                    )}
                    <Link to="/login">
                        <Text size={13} type="primary">
                            Already have an account? Login
                        </Text>
                    </Link>

                    <Button auto type="success" onClick={formik.handleSubmit}>
                        <span style={{ width: "175px" }}>Submit</span>
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Signup;
