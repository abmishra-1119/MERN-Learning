import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'


const base_url = 'https://api.themoviedb.org/3/'
const api_key = 'api_key=bc17906574f644dfdbba58c366c22e10'


const initialState = {
    isLoading: false,
    movies: [],
    popular: JSON.parse(localStorage.getItem("popular")) || [],
    trendingDay: JSON.parse(localStorage.getItem("trending")) || [],
    message: ''
}

export const popularMovies = createAsyncThunk('movie/popular', async() => {
    try {
        const popular = await axios.get(`${base_url}movie/popular?${api_key}`)
        localStorage.setItem("popular", JSON.stringify(popular.data.results))
        return popular.data.results
    } catch (error) {
        console.error("Caught an error:", error.message);
    }

})

export const dayTrendingMovies = createAsyncThunk('movie/trending/day', async() => {
    try {
        const popular = await axios.get(`${base_url}trending/movie/day?${api_key}`)
            // localStorage.setItem("trending", JSON.stringify(popular.data.results))
        return popular.data.results
    } catch (error) {
        console.error("Caught an error:", error.message);
    }

})


const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //popularMovies 
            .addCase(popularMovies.pending, (state) => {
                state.isLoading = true
            }).addCase(popularMovies.fulfilled, (state, action) => {
                state.isLoading = false
                state.popular = action.payload
                state.message = ''
            }).addCase(popularMovies.rejected, (state, action) => {
                state.message = action.error
            })
            //dayTrendingMovies
            .addCase(dayTrendingMovies.pending, (state) => {
                state.isLoading = true
            }).addCase(dayTrendingMovies.fulfilled, (state, action) => {
                state.isLoading = false
                state.trendingDay = action.payload
                state.message = ''
            }).addCase(dayTrendingMovies.rejected, (state, action) => {
                state.message = action.error
            })
    }
})


export default movieSlice.reducer