import { createContext, useContext, useEffect, useReducer } from "react";
import { initailState, reducer } from "./appReducer";


const appContext = createContext()


export const ContextProvider = ({ children }) => {

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        dispatch({ type: "user", payload: userData })

    }, []);


    const [state, dispatch] = useReducer(reducer, initailState)
    return (
        <appContext.Provider value={{ state, dispatch }}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = () => useContext(appContext);
