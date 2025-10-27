import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMovieById } from "../features/Movies/movieSlice";
import { addFavourite, addWatchnext, fetchFavourite, fetchWatchnext } from "../features/Profile/profileSlice";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const MovieDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentMovie, isLoading } = useSelector((state) => state.movies);
    const { favourite, watchnext } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.users);
    const [isfav, setIsfav] = useState(false);
    const [isnext, setIsnext] = useState(false);

    useEffect(() => {
        dispatch(fetchMovieById(id));

        if (user) {
            dispatch(fetchFavourite(user.id));
            dispatch(fetchWatchnext(user.id));
        }
    }, [dispatch, id, user]);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        if (user && favourite) {
            setIsfav(favourite.some((fav) => fav.movie.id === +id));
        }
        if (user && watchnext) {
            setIsnext(watchnext.some((next) => next.movie.id === +id));
        }
    }, [favourite, watchnext, id, user]);


    const addToFav = () => {
        if (!user) return toast.error("Please login to add to favourites");
        dispatch(addFavourite({ userId: user.id, movie: currentMovie }));
        setIsfav(true);
    };

    const addToNext = () => {
        if (!user) return toast.error("Please login to add to watch next");
        dispatch(addWatchnext({ userId: user.id, movie: currentMovie }));
        setIsnext(true);
    };

    return (
        <div className="h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
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

                        <div className="md:w-2/3 w-full p-6 space-y-4">
                            <h1 className="text-3xl font-bold">{currentMovie?.title}</h1>
                            <div className="flex items-center gap-4">
                                <p className="font-medium">Release: {currentMovie?.release_date}</p>
                                <p className="font-medium">Rating: {currentMovie?.vote_average}</p>
                                <p className="font-medium">Status: {currentMovie?.status}</p>
                                <p className="font-medium">Runtime: {currentMovie?.runtime} min</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {currentMovie?.genres?.map((genre) => (
                                    <span key={genre.id} className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm">
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
                                <p>{currentMovie?.spoken_languages?.map((lang) => lang.english_name).join(", ")}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                {isfav ? (
                                    <button
                                        disabled
                                        className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 disabled:cursor-not-allowed"
                                    >
                                        Already Favourite
                                    </button>
                                ) : (
                                    <button
                                        className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5"
                                        onClick={addToFav}
                                    >
                                        Add to Favourite
                                    </button>
                                )}

                                {isnext ? (
                                    <button
                                        disabled
                                        className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 disabled:cursor-not-allowed"
                                    >
                                        Already added
                                    </button>
                                ) : (
                                    <button
                                        className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5"
                                        onClick={addToNext}
                                    >
                                        Add to Is Next
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default MovieDetail;
