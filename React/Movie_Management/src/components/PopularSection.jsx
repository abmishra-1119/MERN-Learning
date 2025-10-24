import React, { useCallback, useEffect, useRef } from 'react';
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
    const appDispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            await appDispatch(popularMovies());
        } catch (e) {
            console.error(e);
        }
    }, [appDispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="p-12 bg-gray-900">
            {/* Header Section */}
            <div className="flex justify-between items-center px-6 mb-6">
                <h2 className="text-3xl font-semibold text-white">Popular Movies</h2>

                <div className="flex gap-3">
                    <button
                        className="prev p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-all duration-300"
                        aria-label="Previous Slide"
                    >
                        <IoChevronBackOutline className="w-6 h-6" />
                    </button>

                    <button
                        className="next p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-all duration-300"
                        aria-label="Next Slide"
                    >
                        <IoChevronForwardOutline className="w-6 h-6" />
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
                slidesPerView={5}
                spaceBetween={20}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop={true}
                className="px-6"
            >
                {popular.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard {...movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
};

export default PopularSection;
