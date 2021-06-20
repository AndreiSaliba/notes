import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { Card, Input, Button, Spacer, Text } from "@geist-ui/react";
import { ThemeContext } from "../../context/Theme";
import { AuthContext } from "../../context/Auth";
import firebase from "../../firebase";
import "./ResetPassword.css";

const ResetPassword = () => {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const { getTheme } = useContext(ThemeContext);
    currentUser && history.push("/");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        onSubmit: async (values) => {
            if (values.email.match(/^\S+@\S+\.\S+$/)) {
                try {
                    await firebase.auth().sendPasswordResetEmail(values.email);
                    setError("");
                    setSuccess("Reset password email sent");
                } catch (error) {
                    switch (error.code) {
                        case "auth/invalid-email":
                            setError("Invalid Email Address");
                            break;
                        case "auth/user-not-found":
                            setError("User not found");
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
        },
    });

    return (
        <div className="Reset-Page">
            <Card width="400px">
                <form className="Reset-Form">
                    <Text size={25} b>
                        Send reset password email
                    </Text>
                    <Spacer y={1} />
                    <span className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            name="email"
                            width="100%"
                            autoComplete="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </span>

                    <span
                        style={{
                            color: error ? "#af0000" : "#00af00",
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            fontSize: "17px",
                        }}
                    >
                        {error || success}
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
                        Remembered your password? Login
                    </Text>
                </Link>
            </span>
        </div>
    );
};

export default ResetPassword;
