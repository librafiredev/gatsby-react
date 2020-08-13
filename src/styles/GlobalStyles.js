import { createGlobalStyle } from "styled-components"

export const AllThemes = {
    "light": {
        background: "#fff",
        color: "#000",
    },
    "dark": {
        background: "#111522",
        color: "#ccc",
    }
}

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${props => props.theme.background};
        color: ${props => props.theme.color};
    }
`