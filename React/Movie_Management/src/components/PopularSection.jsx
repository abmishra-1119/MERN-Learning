import React, { useCallback, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { popularMovies } from '../features/Movies/movieSlice';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const PopularSection = () => {
    const { popular } = useSelector((state) => state.movies);
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            await dispatch(popularMovies());
        } catch (e) {
            console.error(e);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="py-10 sm:py-12 px-4 sm:px-8 md:px-12 bg-gray-100 dark:bg-gray-900">
            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-center gap-4 px-2 sm:px-6 mb-6">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
                    Popular Movies
                </h2>

                <div className="flex gap-2 sm:gap-3">
                    <button
                        className="prev p-2 sm:p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-all duration-300"
                        aria-label="Previous Slide"
                    >
                        <IoChevronBackOutline className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                        className="next p-2 sm:p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-all duration-300"
                        aria-label="Next Slide"
                    >
                        <IoChevronForwardOutline className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
            </div>

            {/* Swiper Section */}
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    nextEl: '.next',
                    prevEl: '.prev',
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop={true}
                spaceBetween={15}
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 10 },
                    480: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 3, spaceBetween: 15 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                    1280: { slidesPerView: 5, spaceBetween: 20 },
                }}
                className="px-2 sm:px-4 md:px-6"
            >
                {popular && popular.length > 0 ? (
                    popular.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <MovieCard {...movie} />
                        </SwiperSlide>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No popular movies found.
                    </p>
                )}
            </Swiper>
        </div>
    );
};

export default PopularSection;
