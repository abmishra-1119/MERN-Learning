import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTVSeries } from "../features/Movies/movieSlice";
import MovieCard from "../components/MovieCard";

const TVSeries = () => {
    const dispatch = useDispatch();
    const { tvSeries, isLoading } = useSelector((state) => state.movies);
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
        <div className="mt-20 bg-gray-100 dark:bg-gray-900 min-h-screen p-8 text-gray-900 dark:text-white flex flex-col items-center">
            <h1 className="te text-3xl font-bold mb-8">Trending TV Series (This Week)</h1>

            {isLoading ? (
                <div className="text-gray-300 text-lg">Loading TV series...</div>
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
                        <p className="text-gray-400">No TV series found.</p>
                    )}
                </div>
            )}

            <div className="flex gap-3 mt-10">
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
                <span className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-700">
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
    );
};

export default TVSeries;
