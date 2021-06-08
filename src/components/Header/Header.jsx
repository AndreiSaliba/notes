import { useContext } from "react";
import { Button, Text, Popover, Select } from "@geist-ui/react";
// import { BrowserRouter as Link } from "react-router-dom";
import { Settings, Display, Moon, Sun } from "@geist-ui/react-icons";
import { ThemeContext } from "../../context/Theme";
import app from "../../firebase";
import "./Header.css";

const Header = () => {
    const { currentTheme, updateTheme } = useContext(ThemeContext);

    const content = () => (
        <div>
            <Popover.Item>
                <Select
                    pure
                    value={currentTheme}
                    size="mini"
                    style={{ height: "40px" }}
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
            <Popover.Item style={{}} onClick={() => app.auth().signOut()}>
                <Text>Sign Out</Text>
            </Popover.Item>
        </div>
    );

    return (
        <div className="Header-Wrapper">
            <div className="Header-Container">
                <Text h2>Notes</Text>
                <Popover content={content}>
                    <Button auto icon={<Settings />} />
                </Popover>
            </div>
        </div>
    );
};

export default Header;
