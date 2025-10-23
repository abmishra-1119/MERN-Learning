import React, { useCallback, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { popularMovies } from '../features/Movies/movieSlice';

const data = {
    title: "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
    vote_average: 8.209,
    release_date: "2020-10-16",
    poster_path: "/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg"
}

const PopularSection = () => {

    const { popular } = useSelector(state => state.movies)

    const appDispatch = useDispatch()


    const fetchData = useCallback(async () => {
        try {
            await appDispatch(popularMovies())
        }
        catch (e) {
            console.error(e);
        }
    }, [appDispatch])

    useEffect(() => {
        fetchData()
        console.log(popular);

    }, []);
    return (
        <div className='p-12 bg-gray-900'>
            <div className='p-6'>
                <h2 className='text-3xl text-white'>Popular Movies</h2>
            </div>

            <div className='flex gap-6'>
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    slidesPerView={5}
                    // pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{ delay: 2500 }}
                    loop={true}
                >
                    {
                        popular.map((movie) => {
                            return <SwiperSlide> <MovieCard {...movie} /></SwiperSlide>

                        })
                    }
                </Swiper>

            </div>

        </div>
    );
}

export default PopularSection;
