/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Card, Input, Button, Spacer, Text } from "@geist-ui/core";
import { useFormik } from "formik";
import { ThemeContext } from "../context/Theme";
import { AuthContext } from "../context/Auth";
import firebase from "../firebase";

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
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            values.email,
                            values.password
                        )
                        .then((user) => {
                            firebase
                                .firestore()
                                .collection("users")
                                .doc(user.user.uid)
                                .set(
                                    {
                                        userID: user.user.uid,
                                        email: user.user.email,
                                        other: [],
                                        pinned: [],
                                    },
                                    { merge: true }
                                )
                                .then(() => {
                                    console.log("Document written");
                                })
                                .catch((error) => {
                                    console.error(
                                        "Error adding document: ",
                                        error
                                    );
                                });
                        })
                        .then(() => {
                            setError("");
                            history.push("/");
                        })
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
            } else {
                setError("Please enter an email and a password");
            }
        },
    });

    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
            `}
        >
            <Card width="400px">
                <form
                    className="Signup-Form"
                    css={css`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                    `}
                >
                    <Text size={30} b>
                        Sign Up
                    </Text>
                    <span
                        css={css`
                            width: 100%;
                        `}
                    >
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
                    <span
                        css={css`
                            width: 100%;
                        `}
                    >
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
                    height: "45px",
                    margin: "10px",
                }}
            >
                <Link to="/login">
                    <Text
                        small
                        size={13}
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
                        size={13}
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
