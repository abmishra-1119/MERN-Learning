import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/Auth/userSlice'
import movieReducer from '../features/Movies/movieSlice'
export const store = configureStore({
    reducer: {
        users: userReducer,
        movies: movieReducer
    }
})