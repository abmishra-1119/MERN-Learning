import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFavourite,
    fetchWatchnext,
    removeFavourite,
    removeWatchnext,
} from "../features/Profile/profileSlice";
import UserCard from "../components/UserCard";
import MovieCard from "../components/MovieCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const Profile = () => {
    const dispatch = useDispatch();
    const { favourite, watchnext } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.users);

    const fetchData = useCallback(
        async (id) => {
            try {
                await dispatch(fetchFavourite(id));
                await dispatch(fetchWatchnext(id));
            } catch (error) {
                console.error("fetch error:", error);
            }
        },
        [dispatch]
    );

    const removeFav = (id, idx) => {
        dispatch(removeFavourite({ id, idx }));
    };
    const removeNext = (id, idx) => {
        dispatch(removeWatchnext({ id, idx }));
    };

    useEffect(() => {
        if (user?.id) fetchData(user.id);
    }, [fetchData, user]);

    return (
        <div className="mt-20 p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            {/* USER CARD */}
            <div className="mt-2 flex justify-center">
                <UserCard {...user} />
            </div>

            {/* FAVOURITE MOVIES */}
            <div className="mt-20 px-12 justify-center">
                <div className="flex justify-between items-center px-6 mb-6">
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                        Favourite Movies
                    </h2>

                    <div className="flex gap-3">
                        <button
                            className="prev-2 p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full text-gray-900 dark:text-white transition-all duration-300"
                            aria-label="Previous Slide"
                        >
                            <IoChevronBackOutline className="w-6 h-6" />
                        </button>

                        <button
                            className="next-2 p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full text-gray-900 dark:text-white transition-all duration-300"
                            aria-label="Next Slide"
                        >
                            <IoChevronForwardOutline className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".next-2",
                        prevEl: ".prev-2",
                    }}
                    slidesPerView={5}
                    spaceBetween={20}
                    className="px-6"
                >
                    {favourite && favourite.length > 0 ? (
                        favourite.map((fav, idx) => (
                            <SwiperSlide key={fav?.id}>
                                <div className="absolute top-2 right-10 z-10 bg-black/80 text-white text-xs font-bold rounded-full px-2 py-1 backdrop-blur-sm">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => removeFav(fav?.id, idx)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <MovieCard {...fav?.movie} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-center mt-20 text-lg text-gray-900 dark:text-gray-300">
                            No favourite movies found.
                        </p>
                    )}
                </Swiper>
            </div>

            {/* WATCH NEXT MOVIES */}
            <div className="mt-20 px-12 justify-center">
                <div className="flex justify-between items-center px-6 mb-6">
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                        Watch Next
                    </h2>

                    <div className="flex gap-3">
                        <button
                            className="prev-1 p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full text-gray-900 dark:text-white transition-all duration-300"
                            aria-label="Previous Slide"
                        >
                            <IoChevronBackOutline className="w-6 h-6" />
                        </button>

                        <button
                            className="next-1 p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full text-gray-900 dark:text-white transition-all duration-300"
                            aria-label="Next Slide"
                        >
                            <IoChevronForwardOutline className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".next-1",
                        prevEl: ".prev-1",
                    }}
                    slidesPerView={5}
                    spaceBetween={20}
                    className="px-6"
                >
                    {watchnext && watchnext.length > 0 ? (
                        watchnext.map((fav, idx) => (
                            <SwiperSlide key={fav?.id}>
                                <div className="absolute top-2 right-10 z-10 bg-black/80 text-white text-xs font-bold rounded-full px-2 py-1 backdrop-blur-sm">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => removeNext(fav?.id, idx)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <MovieCard {...fav?.movie} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-center mt-20 text-lg text-gray-900 dark:text-gray-300">
                            No movies in Watch Next list.
                        </p>
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default Profile;
