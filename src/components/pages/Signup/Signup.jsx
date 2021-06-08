import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { Card, Input, Button, Spacer, Text } from "@geist-ui/react";
import { ThemeContext } from "../../../context/Theme";
import { AuthContext } from "../../../context/Auth";
import app from "../../../firebase";
import "./Signup.css";

const Signup = () => {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const { getTheme } = useContext(ThemeContext);
    currentUser && history.push("/");

    const [error, setError] = useState("");
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        onSubmit: async (values) => {
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
                    <Text size={30} b>
                        Sign Up
                    </Text>
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

                    <span
                        style={{
                            color: "#b80000",
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            fontSize: "17px",
                        }}
                    >
                        {error}
                    </span>

                    <Button auto type="success" onClick={formik.handleSubmit}>
                        <span style={{ width: "175px" }}>Submit</span>
                    </Button>
                </form>
            </Card>
            <span
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "50px",
                    margin: "10px",
                    marginTop: "20px",
                    color: "#fff",
                }}
            >
                <Link to="/login">
                    <Text
                        small
                        size={14}
                        style={{
                            color: getTheme() === "dark" ? "#fff" : "#000",
                        }}
                    >
                        Already have an account? Login
                    </Text>
                </Link>
                <Link to="/reset">
                    <Text
                        small
                        size={14}
                        style={{
                            color: getTheme() === "dark" ? "#fff" : "#000",
                        }}
                    >
                        Forgot Password?
                    </Text>
                </Link>
            </span>
        </div>
    );
};

export default Signup;
