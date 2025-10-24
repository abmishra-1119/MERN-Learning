import React, { useCallback, useEffect, useState } from 'react';
import { discoverMovies } from '../features/Movies/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
const Movies = () => {
    const { movies } = useSelector((state) => state.movies);
    const appDispatch = useDispatch();
    const [page, setPage] = useState(1)

    const fetchData = useCallback(async () => {
        try {
            await appDispatch(discoverMovies(page));
        } catch (e) {
            console.error(e);
        }
    }, [appDispatch, page]);

    useEffect(() => {
        fetchData(page);
        console.log(movies);

    }, [page]);

    const nextPage = () => {
        setPage(page + 1)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const prevPage = () => {
        setPage(page - 1)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }


    return (
        <div className='mt-20 bg-gray-900 p-6 flex flex-col justify-center items-center'>

            <div className='flex flex-wrap gap-6 items-center justify-center '>
                {
                    movies.map((movie) => (
                        <MovieCard {...movie} key={movie.id} />
                    ))
                }
            </div>


            <div className="flex m-12">

                {
                    page > 1 ?
                        <button
                            onClick={prevPage}
                            className="cursor-pointer flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Previous
                        </button>
                        :
                        <button
                            disabled
                            className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Previous
                        </button>
                }



                <button className="cursor-pointer flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {page}
                </button>

                <button onClick={nextPage} className="cursor-pointer flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                </button>
            </div>

        </div>
    );
}

export default Movies;
