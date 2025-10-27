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
    const appDispatch = useDispatch();

    const fetchPopular = useCallback(async () => {
        try {
            await appDispatch(popularMovies());
        } catch (error) {
            console.error(error);
        }
    }, [appDispatch]);

    useEffect(() => {
        fetchPopular();
    }, [fetchPopular]);

    // Get top 4 popular movies
    const topMovies = popular.slice(0, 4);

    return (
        <div className="relative">
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
                className="w-full h-[500px]"
            >
                {isLoading && (
                    <div className="flex justify-center items-center h-[550px] text-gray-800 text-xl">
                        <Loading />
                    </div>
                )}

                {!isLoading && topMovies.length > 0 ? (
                    topMovies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="relative h-[700px] w-full">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover brightness-75"
                                />

                                <div className="absolute inset-0 flex flex-col justify-center items-start px-16 bg-linear-to-r from-black/70 via-black/30 to-transparent">
                                    <h2 className="text-4xl font-bold text-white mb-4">{movie.title}</h2>
                                    <p className="text-gray-200 text-sm max-w-xl mb-6 line-clamp-3">
                                        {movie.overview || "No description available."}
                                    </p>
                                    {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300">
                                        Watch Now
                                    </button> */}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    !isLoading && (
                        <div className="flex justify-center items-center h-[550px] text-gray-300 text-lg">
                            No popular movies found.
                        </div>
                    )
                )}
            </Swiper>
        </div>
    );
};

export default HeroSection;
