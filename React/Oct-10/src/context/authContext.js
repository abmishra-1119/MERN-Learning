import { createContext } from "react";


const initailState = {
    isLoading: false,
    user: {},
    currentProduct: {},
    products: []
}

export const authContext = createContext()