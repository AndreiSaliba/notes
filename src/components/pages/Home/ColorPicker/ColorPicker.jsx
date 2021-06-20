/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/Theme";
import { NotesContext } from "../../../../context/Notes";

const ColorPicker = ({ id }) => {
    const { getTheme } = useContext(ThemeContext);
    const { changeColor } = useContext(NotesContext);

    const container = css`
        display: flex;
        flex-direction: column;
        margin: 0px 7px;
        z-index: 50;
    `;

    const row = css`
        display: flex;
        flex-direction: row;
    `;

    const colorButton = css`
        width: 20px;
        height: 20px;
        margin: 0px 2px;
        border-radius: 20%;
    `;

    return (
        <div css={container}>
            <div css={row}>
                <div
                    // Deafult
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
                    onClick={() => changeColor(id, "")}
                ></div>

                <div
                    // Blue
                    css={[
                        colorButton,
                        css`
                            background-color: #0070f390;
                        `,
                    ]}
                    onClick={() => changeColor(id, "#0070f390")}
                ></div>
                <div
                    // Red
                    css={[
                        colorButton,
                        css`
                            background-color: #ee000090;
                        `,
                    ]}
                    onClick={() => changeColor(id, "#ee000090")}
                ></div>
                <div
                    // Yellow
                    css={[
                        colorButton,
                        css`
                            background-color: #f5a62390;
                        `,
                    ]}
                    onClick={() => changeColor(id, "#f5a62390")}
                ></div>
            </div>
            <div
                css={[
                    row,
                    css`
                        margin-top: 5px;
                    `,
                ]}
            >
                <div
                    // Grey
                    css={[
                        colorButton,
                        css`
                            background-color: #55555590;
                        `,
                    ]}
                    onClick={() => changeColor(id, "#55555590")}
                ></div>
                <div
                    // Cyan
                    css={[
                        colorButton,
                        css`
                            background-color: #50e3c290;
                        `,
                    ]}
                    onClick={() => changeColor(id, "#50e3c290")}
                ></div>
                <div
                    // Pink
                    css={[
                        colorButton,
                        css`
                            background-color: #ff008090;
                        `,
                    ]}
                    onClick={() => changeColor(id, "#ff008090")}
                ></div>
                <div
                    // Purple
                    css={[
                        colorButton,
                        css`
                            background-color: #7928ca90;
                        `,
                    ]}
                    onClick={() => changeColor(id, "#7928ca90")}
                ></div>
            </div>
        </div>
    );
};

export default ColorPicker;
