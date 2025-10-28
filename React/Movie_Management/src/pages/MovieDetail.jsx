import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMovieById } from "../features/Movies/movieSlice";
import {
    addFavourite,
    addLastViewed,
    addWatchnext,
    fetchFavourite,
    fetchLastViewed,
    fetchWatchnext,
} from "../features/Profile/profileSlice";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart, FaPlusCircle, FaClock } from "react-icons/fa";

const MovieDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentMovie, isLoading } = useSelector((state) => state.movies);
    const { favourite, watchnext } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.users);
    const [isFav, setIsFav] = useState(false);
    const [isNext, setIsNext] = useState(false);

    useEffect(() => {
        dispatch(fetchMovieById(id));
        if (user?.id) {
            dispatch(fetchFavourite(user.id));
            dispatch(fetchWatchnext(user.id));
            dispatch(fetchLastViewed(user.id))
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

    useEffect(() => {
        if (currentMovie && user) {
            const { id, title, poster_path, release_date, vote_average } = currentMovie
            dispatch(addLastViewed({ userId: user.id, movie: { id, title, poster_path, release_date, vote_average } }))
        }
    }, [currentMovie])
    const addToFav = async () => {
        const { id, title, poster_path, release_date, vote_average } = currentMovie

        if (!user) return toast.error("Please login to add to favourites");
        await dispatch(addFavourite({ userId: user.id, movie: { id, title, poster_path, release_date, vote_average } }));
        setIsFav(true);
        toast.success(`${currentMovie?.title} added to favourites`);
    };

    const addToNext = async () => {
        const { id, title, poster_path, release_date, vote_average } = currentMovie
        if (!user) return toast.error("Please login to add to watch next");
        await dispatch(addWatchnext({ userId: user.id, movie: { id, title, poster_path, release_date, vote_average } }));
        setIsNext(true);
        toast.success(`${currentMovie?.title} added to Watch Next`);
    };

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Poster */}
                        <div className="md:w-1/3 w-full">
                            <img
                                src={
                                    currentMovie?.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${currentMovie?.poster_path}`
                                        : "/NotFound.png"
                                }
                                alt={currentMovie?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Details */}
                        <div className="md:w-2/3 w-full p-6 space-y-4">
                            <h1 className="text-3xl font-bold">{currentMovie?.title}</h1>

                            <div className="flex flex-wrap gap-4">
                                <p className="font-medium">
                                    Release: {currentMovie?.release_date}
                                </p>
                                <p className="font-medium">
                                    Rating: {currentMovie?.vote_average}
                                </p>
                                <p className="font-medium">Status: {currentMovie?.status}</p>
                                <p className="font-medium">
                                    Runtime: {currentMovie?.runtime} min
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {currentMovie?.genres?.map((genre) => (
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
                                <p>{currentMovie?.overview}</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-1">Languages</h2>
                                <p>
                                    {currentMovie?.spoken_languages
                                        ?.map((lang) => lang.english_name)
                                        .join(", ")}
                                </p>
                            </div>

                            {/* Buttons with Icons */}
                            <div className="flex items-center gap-4 flex-wrap">
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

export default MovieDetail;
