import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { searchMovies } from "../features/Movies/movieSlice";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const SearchPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { movies, isLoading } = useSelector((state) => state.movies);

    const query = new URLSearchParams(location.search).get("q");

    useEffect(() => {
        window.scrollTo({ top: 0 });
        if (query) {
            dispatch(searchMovies({ query }));
        }
    }, [dispatch, query]);


    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 sm:px-8 py-6">
            <h1 className="text-3xl font-bold mb-6">
                Search Results for:{" "}
                <span className="text-blue-400">{query}</span>
            </h1>

            {
                isLoading ? (
                    <Loading />
                )
                    :
                    (
                        movies && movies.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-6">
                                {movies.map((movie) => (
                                    <MovieCard key={movie.id} {...movie} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-center mt-10">
                                No movies found.
                            </p>
                        )
                    )
            }
        </div>
    );
};

export default SearchPage;
