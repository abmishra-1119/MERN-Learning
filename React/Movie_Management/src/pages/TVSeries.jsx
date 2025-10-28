import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTVSeries } from "../features/Movies/movieSlice";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const TVSeries = () => {
    const dispatch = useDispatch();
    const { tvSeries, isLoading, totalPages } = useSelector((state) => state.movies);
    const [page, setPage] = useState(1);

    const fetchData = useCallback(async () => {
        await dispatch(fetchTVSeries(page));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [dispatch, page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const nextPage = () => setPage((prev) => prev + 1);
    const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <div className="bg-gray-200 dark:bg-gray-900 min-h-screen py-8 px-2 text-gray-900 dark:text-white flex flex-col items-center">
            <h1 className="te text-3xl font-bold mb-8">Trending TV Series (This Week)</h1>

            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex flex-wrap gap-6 justify-center">
                    {tvSeries.length > 0 ? (
                        tvSeries.map((series) => (
                            <MovieCard
                                key={series.id}
                                id={series.id}
                                title={series.name || series.original_name}
                                poster_path={series.poster_path}
                                release_date={series.first_air_date}
                                vote_average={series.vote_average}
                                media_type="tv"
                            />
                        ))
                    ) : (
                        <div className="h-screen">
                            <p className="text-gray-400 mt-10">No movies found.</p>
                        </div>)}
                </div>
            )}

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
    );
};

export default TVSeries;
