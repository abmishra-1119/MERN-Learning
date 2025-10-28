import React, { useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { popularMovies } from '../features/Movies/movieSlice';
import Loading from './Loading';

const HeroSection = () => {
    const { popular, isLoading } = useSelector((state) => state.movies);
    const dispatch = useDispatch();

    const fetchPopular = useCallback(async () => {
        try {
            await dispatch(popularMovies());
        } catch (error) {
            console.error(error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchPopular();
    }, [fetchPopular]);

    const topMovies = popular.slice(0, 4);

    return (
        <div className="relative w-full">
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px]"
            >
                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center h-[400px] text-gray-800 text-xl">
                        <Loading />
                    </div>
                )}

                {/* Movie Slides */}
                {!isLoading && topMovies.length > 0 ? (
                    topMovies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px]">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover brightness-75"
                                />

                                {/* Overlay content */}
                                <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
                                    <h2
                                        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 
                                        drop-shadow-md leading-tight"
                                    >
                                        {movie.title}
                                    </h2>

                                    <p
                                        className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg max-w-md sm:max-w-lg md:max-w-xl 
                                        mb-5 line-clamp-3"
                                    >
                                        {movie.overview || 'No description available.'}
                                    </p>

                                    {/* Optional CTA Button */}
                                    {/* <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-5 sm:px-6 py-2 rounded-lg font-medium transition-all duration-300">
                                        Watch Now
                                    </button> */}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    !isLoading && (
                        <div className="flex justify-center items-center h-[400px] text-gray-300 text-lg">
                            No popular movies found.
                        </div>
                    )
                )}
            </Swiper>
        </div>
    );
};

export default HeroSection;
