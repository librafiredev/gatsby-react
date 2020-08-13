import React from "react"

export const GlobalStateContext = React.createContext();
export const GlobalDispachContext = React.createContext();

let initialState = {
    theme: "light"
}

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_THEME": {
            return {
                ...state,
                theme: action.someData
            }
        }
        default:
            throw new Error("Bad Action Type")
    }
}

const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispachContext.Provider value={dispatch}>
                {children}
            </GlobalDispachContext.Provider>
        </GlobalStateContext.Provider>
    )
}

export default GlobalContextProvider