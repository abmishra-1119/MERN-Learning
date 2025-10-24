import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
    addFavourite,
    addWatchnext,
    fetchFavourite,
    fetchWatchnext,
} from "../features/Profile/profileSlice";
import { fetchTVSeriesById } from "../features/Movies/movieSlice";

const TvDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { currentTVSeries, isLoading } = useSelector((state) => state.movies);
    const { favourite, watchnext } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.users);

    const [isFav, setIsFav] = useState(false);
    const [isNext, setIsNext] = useState(false);

    useEffect(() => {
        dispatch(fetchTVSeriesById(id));
        if (user?.id) {
            dispatch(fetchFavourite(user.id));
            dispatch(fetchWatchnext(user.id));
        }
    }, [dispatch, id, user?.id]);

    useEffect(() => {
        if (favourite?.some((fav) => fav.movie.id === +id)) setIsFav(true);
        if (watchnext?.some((next) => next.movie.id === +id)) setIsNext(true);
    }, [favourite, watchnext, id]);

    if (isLoading) return <p className="text-center mt-20 text-lg">Loading...</p>;
    if (!currentTVSeries) return <p className="text-center mt-20 text-lg">TV Series not found</p>;

    const {
        name,
        poster_path,
        first_air_date,
        vote_average,
        genres,
        overview,
        number_of_episodes,
        number_of_seasons,
        spoken_languages,
        status,
    } = currentTVSeries;

    const addToFav = () => {
        const data = {
            userId: user.id,
            movie: currentTVSeries,
        };
        setIsFav(true);
        dispatch(addFavourite(data));
    };

    const addToNext = () => {
        const data = {
            userId: user.id,
            movie: currentTVSeries,
        };
        setIsNext(true);
        dispatch(addWatchnext(data));
    };

    return (
        <div className="min-h-screen mt-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Poster */}
                    <div className="md:w-1/3 w-full">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="md:w-2/3 w-full p-6 space-y-4">
                        <h1 className="text-3xl font-bold">{name}</h1>
                        <div className="flex flex-wrap gap-4">
                            <p className="font-medium">First Air: {first_air_date}</p>
                            <p className="font-medium">Rating: {vote_average}</p>
                            <p className="font-medium">Status: {status}</p>
                            <p className="font-medium">Seasons: {number_of_seasons}</p>
                            <p className="font-medium">Episodes: {number_of_episodes}</p>
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
                            <p>{spoken_languages?.map((lang) => lang.english_name).join(", ")}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {isFav ? (
                                <button
                                    disabled
                                    className="flex items-center space-x-2 text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 disabled:cursor-not-allowed"
                                >
                                    Already Favourite
                                </button>
                            ) : (
                                <button
                                    onClick={addToFav}
                                    className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5"
                                >
                                    Add to Favourite
                                </button>
                            )}

                            {isNext ? (
                                <button
                                    disabled
                                    className="flex items-center space-x-2 text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 disabled:cursor-not-allowed"
                                >
                                    Already Added
                                </button>
                            ) : (
                                <button
                                    onClick={addToNext}
                                    className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5"
                                >
                                    Add to Watch Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TvDetail;
