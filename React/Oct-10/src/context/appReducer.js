export const initailState = {
    isLoading: false,
    user: null,
    currentProduct: null,
    products: [],
    message: ''
}


export const reducer = (state, action) => {
    switch (action.type) {
        case 'products':
            return {
                ...state,
                products: action.payload
            }
        case 'user':
            return {
                ...state,
                user: action.payload
            }
        case 'currentProduct':
            return {
                ...state,
                currentProduct: action.payload
            }
        case 'loading':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'message':
            return {
                ...state,
                message: action.payload
            }
        default:
            return state
    }
}