/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { NotesContext } from "../../context/Notes";

const ColorPicker = ({ id }) => {
    const { getTheme } = useContext(ThemeContext);
    const { changeColor } = useContext(NotesContext);
    const colorButton = css`
        width: 20px;
        height: 20px;
        margin: 0px 2px;
        border-radius: 20%;
    `;

    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                margin: 0px 7px;
            `}
        >
            <div
                css={css`
                    display: flex;
                    flex-direction: row;
                `}
            >
                <div
                    css={[
                        colorButton,
                        css`
                            background-color: ${getTheme() === "dark"
                                ? "#fff"
                                : "#000"};
                        `,
                    ]}
                    onClick={() => changeColor(id, "dark")}
                ></div>
                <div
                    css={[
                        colorButton,
                        css`
                            background-color: #0070f3;
                        `,
                    ]}
                    onClick={() => changeColor(id, "success")}
                ></div>
                <div
                    css={[
                        colorButton,
                        css`
                            background-color: #ee0000;
                        `,
                    ]}
                    onClick={() => changeColor(id, "error")}
                ></div>
                <div
                    css={[
                        colorButton,
                        css`
                            background-color: #f5a623;
                        `,
                    ]}
                    onClick={() => changeColor(id, "warning")}
                ></div>
            </div>
            <div
                css={css`
                    display: flex;
                    flex-direction: row;
                    margin-top: 5px;
                `}
            >
                <div
                    css={[
                        colorButton,
                        css`
                            border: 1px solid
                                ${getTheme() === "dark" ? "#333" : "#eaeaea"};
                            box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            -webkit-box-sizing: border-box;
                        `,
                    ]}
                    onClick={() => changeColor(id, "default")}
                ></div>
                <div
                    css={[
                        colorButton,
                        css`
                            background-color: #50e3c2;
                        `,
                    ]}
                    onClick={() => changeColor(id, "cyan")}
                ></div>
                <div
                    css={[
                        colorButton,
                        css`
                            background-color: #ff0080;
                        `,
                    ]}
                    onClick={() => changeColor(id, "alert")}
                ></div>
                <div
                    css={[
                        colorButton,
                        css`
                            background-color: #7928ca;
                        `,
                    ]}
                    onClick={() => changeColor(id, "violet")}
                ></div>
            </div>
        </div>
    );
};

export default ColorPicker;
