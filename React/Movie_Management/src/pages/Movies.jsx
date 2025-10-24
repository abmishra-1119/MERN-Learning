import React, { useCallback, useEffect, useState } from "react";
import { discoverMovies } from "../features/Movies/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import SidebarFilter from "../components/Sidebar";

const Movies = () => {
    const { movies, isLoading } = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            await dispatch(discoverMovies(page));
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, page]);

    useEffect(() => {
        if (!selectedGenre) {
            fetchData();
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, fetchData]);

    const nextPage = () => {
        setPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <div className="mt-20 bg-gray-900 flex gap-6 p-6 min-h-screen">
            <SidebarFilter setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre} setPage={setPage} />
            {isLoading ? (
                <p className="text-white text-lg mt-10">Loading...</p>
            ) : (
                <>
                    <div className="flex-1 flex flex-col items-center">
                        <div className="flex flex-wrap gap-6 items-center justify-center">
                            {movies.length > 0 ? (
                                movies.map((movie) => <MovieCard {...movie} key={movie.id} />)
                            ) : (
                                <p className="text-gray-400 mt-10">No movies found.</p>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex m-12 items-center gap-3">
                            <button
                                onClick={prevPage}
                                disabled={page === 1}
                                className={`flex items-center justify-center px-4 h-10 text-base font-medium rounded-lg border transition-colors duration-200 
                                ${page === 1
                                        ? "opacity-50 cursor-not-allowed bg-gray-700 text-gray-400 border-gray-600"
                                        : "cursor-pointer bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    }`}
                            >
                                Previous
                            </button>

                            <span className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700">
                                {page}
                            </span>

                            <button
                                onClick={nextPage}
                                className="cursor-pointer flex items-center justify-center px-4 h-10 text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Movies;
