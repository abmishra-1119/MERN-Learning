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
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { FaHeart, FaPlusCircle, FaRegHeart, FaClock } from "react-icons/fa";

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
        window.scrollTo({ top: 0 });
        if (user?.id && favourite) {
            setIsFav(favourite.some((fav) => fav.movie.id === +id));
        }
        if (user?.id && watchnext) {
            setIsNext(watchnext.some((next) => next.movie.id === +id));
        }
    }, [favourite, watchnext, id, user?.id]);
    // console.log(currentTVSeries);

    const addToFav = async () => {
        const { id, vote_average, poster_path, name, first_air_date } = currentTVSeries
        if (!user) return toast.error("Please login to add to favourites");
        await dispatch(addFavourite({ userId: user.id, movie: { id, vote_average, poster_path, name, first_air_date } }));
        setIsFav(true);
        toast.success(`${currentTVSeries?.name} added to favourites`);
    };

    const addToNext = async () => {
        const { id, vote_average, poster_path, name, first_air_date } = currentTVSeries
        if (!user) return toast.error("Please login to add to watch next");
        await dispatch(addWatchnext({ userId: user.id, movie: { id, vote_average, poster_path, name, first_air_date } }));
        setIsNext(true);
        toast.success(`${currentTVSeries?.name} added to Watch Next`);
    };

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 w-full">
                            <img
                                src={
                                    currentTVSeries?.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${currentTVSeries?.poster_path}`
                                        : "/NotFound.png"
                                }
                                alt={currentTVSeries?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="md:w-2/3 w-full p-6 space-y-4">
                            <h1 className="text-3xl font-bold">{currentTVSeries?.name}</h1>

                            <div className="flex flex-wrap gap-4">
                                <p className="font-medium">
                                    First Air: {currentTVSeries?.first_air_date}
                                </p>
                                <p className="font-medium">
                                    Rating: {currentTVSeries?.vote_average}
                                </p>
                                <p className="font-medium">Status: {currentTVSeries?.status}</p>
                                <p className="font-medium">
                                    Seasons: {currentTVSeries?.number_of_seasons}
                                </p>
                                <p className="font-medium">
                                    Episodes: {currentTVSeries?.number_of_episodes}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {currentTVSeries?.genres?.map((genre) => (
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
                                <p>{currentTVSeries?.overview}</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-1">Languages</h2>
                                <p>
                                    {currentTVSeries?.spoken_languages
                                        ?.map((lang) => lang.english_name)
                                        .join(", ")}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {isFav ? (
                                    <button
                                        disabled
                                        className="flex items-center space-x-2 text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 disabled:cursor-not-allowed"
                                    >
                                        <FaHeart className="text-red-500" />
                                        <span>Already Favourite</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={addToFav}
                                        className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5"
                                    >
                                        <FaRegHeart />
                                        <span>Add to Favourite</span>
                                    </button>
                                )}

                                {isNext ? (
                                    <button
                                        disabled
                                        className="flex items-center space-x-2 text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 disabled:cursor-not-allowed"
                                    >
                                        <FaClock />
                                        <span>Already Added</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={addToNext}
                                        className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5"
                                    >
                                        <FaPlusCircle />
                                        <span>Add to Watch Next</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TvDetail;
