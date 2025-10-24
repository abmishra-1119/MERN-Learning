import React, { useCallback, useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { dayTrendingMovies, weekTrendingMovies } from '../features/Movies/movieSlice';

const TrendingSection = () => {
    const [trendType, setTrendType] = useState('day');
    const { trendingDay, trendingWeek, isLoading } = useSelector((state) => state.movies);
    const appDispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            if (trendType === 'day') {
                await appDispatch(dayTrendingMovies());
            } else {
                await appDispatch(weekTrendingMovies());
            }
        } catch (e) {
            console.error(e);
        }
    }, [appDispatch, trendType]);

    useEffect(() => {
        fetchData();
    }, [fetchData, trendType]);

    const trendingData = trendType === 'day' ? trendingDay : trendingWeek;

    return (
        <div className="p-12 bg-gray-100 dark:bg-gray-900">
            <div className="flex justify-between items-center p-6">
                <h2 className="text-3xl text-gray-900 dark:text-white font-semibold">Trending Movies</h2>

                <div className="flex gap-3">
                    <button
                        onClick={() => setTrendType('day')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${trendType === 'day'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setTrendType('week')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${trendType === 'week'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        This Week
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <p className="text-white text-lg">Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-5 gap-6">
                    {trendingData?.slice(0, 10).map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendingSection;
