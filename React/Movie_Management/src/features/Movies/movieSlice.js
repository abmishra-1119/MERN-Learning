import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "https://api.themoviedb.org/3/";
const api_key = "api_key=bc17906574f644dfdbba58c366c22e10";

const initialState = {
    isLoading: false,
    movies: [],
    popular: JSON.parse(localStorage.getItem("popular")) || [],
    trendingDay: JSON.parse(localStorage.getItem("trendingDay")) || [],
    trendingWeek: JSON.parse(localStorage.getItem("trendingWeek")) || [],
    genres: [],
    tvSeries: JSON.parse(localStorage.getItem("tvSeries")) || [],
    currentMovie: null,
    currentTVSeries: null,
    message: "",
};

// POPULAR MOVIES
export const popularMovies = createAsyncThunk("movie/popular", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${base_url}movie/popular?${api_key}`);
        localStorage.setItem("popular", JSON.stringify(res.data.results));
        return res.data.results;
    } catch (error) {
        console.error("Caught an error:", error.message);
        return rejectWithValue(error.message);
    }
});

// TRENDING MOVIES BY DAY
export const dayTrendingMovies = createAsyncThunk("movie/trending/day", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${base_url}trending/movie/day?${api_key}`);
        localStorage.setItem("trendingDay", JSON.stringify(res.data.results));
        return res.data.results;
    } catch (error) {
        console.error("Caught an error:", error.message);
        return rejectWithValue(error.message);
    }
});

// TRENDING MOVIES BY WEEK
export const weekTrendingMovies = createAsyncThunk("movie/trending/week", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${base_url}trending/movie/week?${api_key}`);
        localStorage.setItem("trendingWeek", JSON.stringify(res.data.results));
        return res.data.results;
    } catch (error) {
        console.error("Caught an error:", error.message);
        return rejectWithValue(error.message);
    }
});

// FETCH MOVIE BY ID
export const fetchMovieById = createAsyncThunk(
    "movie/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${base_url}movie/${id}?${api_key}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching movie by ID:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// DISCOVER MOVIES
export const discoverMovies = createAsyncThunk('movie/discover', async (page, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${base_url}discover/movie?${api_key}&language=en-US&page=${page}`);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        return rejectWithValue(error.message);
    }
})

// FETCH GENRES
export const fetchGenres = createAsyncThunk(
    "movie/fetchGenres",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${base_url}genre/movie/list?${api_key}`);
            return res.data.genres;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// MOVIES BY GENRE
export const moviesByGenre = createAsyncThunk(
    "movie/byGenre",
    async ({ genreId, page }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${base_url}discover/movie?${api_key}&with_genres=${genreId}&page=${page}`
            );
            return res.data.results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// SEARCH MOVIES
export const searchMovies = createAsyncThunk(
    "movie/search",
    async ({ query, page = 1 }, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${base_url}search/movie?${api_key}&query=${encodeURIComponent(query)}&page=${page}`);
            return res.data.results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// FETCH TV SERIES
export const fetchTVSeries = createAsyncThunk(
    "movie/fetchTVSeries",
    async (page = 1, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${base_url}trending/tv/week?${api_key}&page=${page}`
            );
            localStorage.setItem("tvSeries", JSON.stringify(res.data.results));
            return res.data.results;
        } catch (error) {
            console.error("TV Series Fetch Error:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// FETCH TV SERIES BY ID
export const fetchTVSeriesById = createAsyncThunk(
    "movie/fetchTVSeriesById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${base_url}tv/${id}?${api_key}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching TV series by ID:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // POPULAR MOVIES
            .addCase(popularMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(popularMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.popular = action.payload;
                state.message = "";
            })
            .addCase(popularMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            // TRENDING MOVIES (DAY)
            .addCase(dayTrendingMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(dayTrendingMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trendingDay = action.payload;
                state.message = "";
            })
            .addCase(dayTrendingMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            // TRENDING MOVIES (WEEK)
            .addCase(weekTrendingMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(weekTrendingMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trendingWeek = action.payload;
                state.message = "";
            })
            .addCase(weekTrendingMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            // FETCH MOVIE BY ID
            .addCase(fetchMovieById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMovieById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentMovie = action.payload;
                state.message = "";
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            // DISCOVER MOVIES
            .addCase(discoverMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(discoverMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.results;
                state.message = "";
            })
            .addCase(discoverMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            // FETCH GENRES
            .addCase(fetchGenres.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.isLoading = false;
                state.genres = action.payload;
                state.message = "";
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            // MOVIES BY GENRE
            .addCase(moviesByGenre.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(moviesByGenre.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload;
                state.message = "";
            })
            .addCase(moviesByGenre.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            // SEARCH MOVIES
            .addCase(searchMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload;
                state.message = "";
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            // FETCH TV SERIES
            .addCase(fetchTVSeries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTVSeries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tvSeries = action.payload;
                state.message = "";
            })
            .addCase(fetchTVSeries.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            // FETCH TV SERIES BY ID
            .addCase(fetchTVSeriesById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTVSeriesById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentTVSeries = action.payload;
                state.message = "";
            })
            .addCase(fetchTVSeriesById.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            });
    },
});

export default movieSlice.reducer;