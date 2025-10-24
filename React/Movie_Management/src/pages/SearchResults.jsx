import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { searchMovies } from "../features/Movies/movieSlice";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { movies, isLoading } = useSelector((state) => state.movies);

    const query = new URLSearchParams(location.search).get("q");

    useEffect(() => {
        if (query) {
            dispatch(searchMovies({ query }));
        }
    }, [dispatch, query]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                Searching...
            </div>
        );
    }

    return (
        <div className="mt-20 bg-gray-900 text-white min-h-screen px-8 py-6">
            <h1 className="text-3xl font-bold mb-6">
                Search Results for: <span className="text-blue-400">{query}</span>
            </h1>

            {movies.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No movies found.</p>
            )}
        </div>
    );
};

export default SearchPage;
