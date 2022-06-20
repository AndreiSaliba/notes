/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext } from "react";
import { Button, Text, Popover, Select } from "@geist-ui/core";
import { BrowserRouter as Link } from "react-router-dom";
import { Settings, Display, Moon, Sun } from "@geist-ui/react-icons";
import { ThemeContext } from "../context/Theme";
import firebase from "../firebase";

const Header = () => {
    const { currentTheme, updateTheme } = useContext(ThemeContext);

    const content = () => (
        <div style={{}}>
            <Popover.Item style={{ padding: "5px 15px" }}>
                <Select
                    pure
                    value={currentTheme}
                    size="mini"
                    style={{ height: "35px" }}
                    onChange={(value) => updateTheme(value)}
                >
                    <Select.Option size="mini" value="system">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Display size={16} />
                            <span style={{ marginLeft: "5px" }}>System</span>
                        </div>
                    </Select.Option>
                    <Select.Option size="mini" value="dark">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Moon size={16} />
                            <span style={{ marginLeft: "5px" }}>Dark</span>
                        </div>
                    </Select.Option>
                    <Select.Option size="mini" value="light">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Sun size={16} />
                            <span style={{ marginLeft: "5px" }}>Light</span>
                        </div>
                    </Select.Option>
                </Select>
            </Popover.Item>
            <Popover.Item onClick={() => firebase.auth().signOut()}>
                <Text style={{ margin: "0px", marginLeft: "5px" }}>
                    Sign Out
                </Text>
            </Popover.Item>
        </div>
    );

    return (
        <div
            // className="Header-Wrapper"
            css={css`
                display: flex;
                align-items: center;
                justify-content: center;
            `}
        >
            <div
                // className="Header-Container"
                css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 85vw;
                    @media only screen and (max-width: 650px) {
                        width: 91.5vw;
                    }
                `}
            >
                <Link to="/">
                    <Text h2 style={{ userSelect: "none" }}>
                        Notes
                    </Text>
                </Link>
                <Popover content={content} placement="bottomEnd">
                    <Button auto icon={<Settings />} />
                </Popover>
            </div>
        </div>
    );
};

export default Header;
