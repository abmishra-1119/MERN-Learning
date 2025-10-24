import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMovieById } from "../features/Movies/movieSlice";
import { addFavourite, addWatchnext, fetchFavourite, fetchWatchnext } from "../features/Profile/profileSlice";

const MovieDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentMovie, isLoading } = useSelector((state) => state.movies);
    const { favourite, watchnext } = useSelector((state) => state.profile)
    const { user } = useSelector((state) => state.users)
    const [isfav, setIsfav] = useState(false)
    const [isnext, setIsnext] = useState(false)

    useEffect(() => {
        dispatch(fetchMovieById(id))
        dispatch(fetchFavourite(user.id))
        const findfav = favourite.find((fav) => fav.movie.id === +id)
        if (findfav) {
            setIsfav(true)
        }
        dispatch(fetchWatchnext(user.id))
        const findnext = watchnext.find((next) => next.movie.id === +id)
        if (findnext) {
            setIsnext(true)
        }
    }, [dispatch]);

    if (isLoading) return <p className="text-center mt-20 text-lg">Loading...</p>;
    if (!currentMovie) return <p className="text-center mt-20 text-lg">Movie not found</p>;

    const {
        title,
        poster_path,
        release_date,
        vote_average,
        genres,
        overview,
        runtime,
        spoken_languages,
        status
    } = currentMovie;

    const addToFav = () => {
        const data = {
            userId: user.id,
            movie: currentMovie
        }
        setIsfav(true)
        dispatch(addFavourite({ ...data }))
        // dispatch(fetchMovieById(id))
    }

    const addToNext = () => {
        const data = {
            userId: user.id,
            movie: currentMovie
        }
        setIsnext(true)
        dispatch(addWatchnext({ ...data }))
        // dispatch(fetchMovieById(id))
    }

    return (
        <div className="min-h-screen mt-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Poster */}
                    <div className="md:w-1/3 w-full">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="md:w-2/3 w-full p-6 space-y-4">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <div className="flex items-center gap-4">
                            <p className="font-medium">Release: {release_date}</p>
                            <p className="font-medium">Rating: {vote_average}</p>
                            <p className="font-medium">Status: {status}</p>
                            <p className="font-medium">Runtime: {runtime} min</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-1">Overview</h2>
                            <p>{overview}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-1">Languages</h2>
                            <p>{spoken_languages?.map(lang => lang.english_name).join(", ")}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {
                                isfav ? <button
                                    disabled
                                    className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 disabled:cursor-not-allowed "
                                >
                                    Already Favourite
                                </button>
                                    : <button
                                        className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 "
                                        onClick={addToFav}
                                    >
                                        Add to Favourite
                                    </button>
                            }
                            {
                                isnext ? <button
                                    disabled
                                    className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 disabled:cursor-not-allowed "
                                >
                                    Already added
                                </button>
                                    : <button
                                        className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 "
                                        onClick={addToNext}
                                    >
                                        Add to Is Next
                                    </button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MovieDetail;
