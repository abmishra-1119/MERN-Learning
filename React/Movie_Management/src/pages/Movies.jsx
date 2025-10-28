import React, { useCallback, useEffect, useState } from "react";
import { discoverMovies, moviesByGenre } from "../features/Movies/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import SidebarFilter from "../components/Sidebar";
import Loading from "../components/Loading";

const Movies = () => {
    const { movies, isLoading, totalPages } = useSelector((state) => state.movies);
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterType, setFilterType] = useState("discover");

    // Fetch data
    const fetchData = useCallback(async () => {
        try {
            await dispatch(discoverMovies({ page, filterType }));
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, page, filterType]);

    const fetchGenreData = useCallback(
        async (selectedGenre, page) => {
            try {
                await dispatch(moviesByGenre({ genreId: selectedGenre, page }));
            } catch (e) {
                console.error(e);
            }
        },
        [dispatch, selectedGenre]
    );

    useEffect(() => {
        if (!selectedGenre) {
            fetchData();
        } else {
            fetchGenreData(selectedGenre, page);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, filterType, selectedGenre, fetchData, fetchGenreData]);

    const nextPage = () => page < totalPages && setPage((prev) => prev + 1);
    const prevPage = () => page > 1 && setPage((prev) => prev - 1);

    const handleFilter = (type) => {
        setFilterType(type);
        setDropdownOpen(false);
        setPage(1);
    };

    return (
        <div className="bg-gray-200 dark:bg-gray-900 flex gap-6 p-6 min-h-screen">
            <SidebarFilter
                setSelectedGenre={setSelectedGenre}
                selectedGenre={selectedGenre}
                setPage={setPage}
                page={page}
            />
            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex-1 flex flex-col items-center ml-64">
                    {/* Header + Filter */}
                    <div className="flex justify-between w-full px-16 py-4">
                        <div className="text-gray-700 dark:text-gray-300">
                            Total {movies.length} results
                        </div>

                        <div className="text-gray-700 dark:text-gray-300 relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2.5"
                            >
                                Filter:{" "}
                                {filterType === "discover"
                                    ? "Discover"
                                    : filterType === "year"
                                        ? "By Year"
                                        : "Top Rated"}
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 z-20">
                                    <button
                                        onClick={() => handleFilter("discover")}
                                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Default
                                    </button>
                                    <button
                                        onClick={() => handleFilter("year")}
                                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        By Year
                                    </button>
                                    <button
                                        onClick={() => handleFilter("rating")}
                                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Top Rated
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Movie List */}
                    <div className="flex flex-wrap gap-8 items-center justify-center">
                        {movies.length > 0 ? (
                            movies.map((movie) => <MovieCard {...movie} key={movie.id} />)
                        ) : (
                            <div className="h-screen">
                                <p className="text-gray-400 mt-10">No movies found.</p>
                            </div>
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

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(1)}
                                className={`px-3 py-1 rounded-md border ${page === 1
                                    ? "bg-blue-700 text-white"
                                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                    }`}
                            >
                                1
                            </button>

                            {page > 3 && <span className="text-gray-500">...</span>}

                            {Array.from({ length: 3 }, (_, i) => page - 1 + i)
                                .filter((p) => p > 1 && p < totalPages)
                                .map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`px-3 py-1 rounded-md border ${page === p
                                            ? "bg-blue-700 text-white"
                                            : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}

                            {page < totalPages - 2 && <span className="text-gray-500">...</span>}


                            {totalPages > 1 && (
                                <button
                                    onClick={() => setPage(totalPages)}
                                    className={`px-3 py-1 rounded-md border ${page === totalPages
                                        ? "bg-blue-700 text-white"
                                        : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                        }`}
                                >
                                    {totalPages}
                                </button>
                            )}
                        </div>

                        <button
                            onClick={nextPage}
                            disabled={page === totalPages}
                            className={`flex items-center justify-center px-4 h-10 text-base font-medium rounded-lg border transition-colors duration-200 
                                ${page === totalPages
                                    ? "opacity-50 cursor-not-allowed bg-gray-700 text-gray-400 border-gray-600"
                                    : "cursor-pointer bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movies;
