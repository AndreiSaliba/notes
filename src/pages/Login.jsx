/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Card, Input, Button, Spacer, Text } from "@geist-ui/react";
import { useFormik } from "formik";
import { ThemeContext } from "../context/Theme";
import { AuthContext } from "../context/Auth";
import firebase from "../firebase";

const Login = () => {
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
                        .signInWithEmailAndPassword(
                            values.email,
                            values.password
                        )
                        .then(() => {
                            setError("");
                            history.push("/");
                        })
                        .catch((error) => {
                            switch (error.code) {
                                case "auth/wrong-password":
                                    setError("Wrong password");
                                    break;
                                case "auth/user-not-found":
                                    setError("User not found");
                                    break;
                                case "auth/invalid-email":
                                    setError("Invalid email address");
                                    break;
                                case "auth/user-disabled":
                                    setError("Your account has been disabled");
                                    break;
                                default:
                                    setError("An error has occourred");
                                    console.log(error);
                                    break;
                            }
                        });
                } else {
                    setError("Invalid email address");
                }
            } else {
                setError("Please enter your email and password");
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
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                    `}
                >
                    <Text size={30} b>
                        Login
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
                </div>
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
                <Link to="/signup">
                    <Text
                        small
                        size={13}
                        style={{
                            color: getTheme() === "dark" ? "#fff" : "#000",
                        }}
                    >
                        Don't have an account? Sign Up
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

export default Login;
