import React, { useCallback, useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { dayTrendingMovies, weekTrendingMovies } from '../features/Movies/movieSlice';

const TrendingSection = () => {
    const [trendType, setTrendType] = useState('day');
    const { trendingDay, trendingWeek, isLoading } = useSelector((state) => state.movies);
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            if (trendType === 'day') {
                await dispatch(dayTrendingMovies());
            } else {
                await dispatch(weekTrendingMovies());
            }
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, trendType]);

    useEffect(() => {
        fetchData();
    }, [fetchData, trendType]);

    const trendingData = trendType === 'day' ? trendingDay : trendingWeek;

    return (
        <div className="py-10 sm:py-12 px-4 sm:px-8 md:px-12 bg-gray-100 dark:bg-gray-900">
            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-center gap-4 px-2 sm:px-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
                    Trending Movies
                </h2>

                <div className="flex gap-2 sm:gap-3">
                    <button
                        onClick={() => setTrendType('day')}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${trendType === 'day'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setTrendType('week')}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${trendType === 'week'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        This Week
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <p className="text-gray-800 dark:text-white text-lg">Loading...</p>
                </div>
            ) : (
                <div
                    className="
                        grid 
                        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
                        gap-4 sm:gap-6
                        px-2 sm:px-0
                    "
                >
                    {trendingData?.slice(0, 10).map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendingSection;
