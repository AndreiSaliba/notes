import { useState, useContext } from "react"; // useRef
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { Card, Input, Button, Spacer, Text } from "@geist-ui/react";
import { AuthContext } from "../../../context/Auth";
import app from "../../../firebase";
import "./Login.css";

const Login = () => {
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
            if (values.email && values.password) {
                if (values.email.match(/^\S+@\S+\.\S+$/)) {
                    try {
                        await app
                            .auth()
                            .signInWithEmailAndPassword(
                                values.email,
                                values.password
                            );
                        setError("");
                        history.push("/");
                    } catch (error) {
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
                    }
                } else {
                    setError("Invalid email address");
                }
            }
        },
    });

    return (
        <div className="Login-Page">
            <Card width="400px">
                <div className="Login-Form">
                    <h3>Login</h3>
                    <span className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            name="email"
                            width="100%"
                            // ref={email}
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
                            // ref={password}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </span>

                    {error !== "" ? (
                        <Text type="error">{error}</Text>
                    ) : (
                        <Spacer y={1.5} />
                    )}

                    <Button auto type="success" onClick={formik.handleSubmit}>
                        <span style={{ width: "150px" }}>Submit</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Login;
