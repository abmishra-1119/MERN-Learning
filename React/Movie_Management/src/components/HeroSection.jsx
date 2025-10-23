import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const HeroSection = () => {
    return (
        <div>
            <Swiper
                modules={[Pagination, Navigation, Autoplay]} // Add modules if you want features like pagination/navigation
                // spaceBetween={50}
                slidesPerView={1} // Or adjust based on your needs
                pagination={{ clickable: true }}
                // navigation={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                autoplay={{ delay: 3000 }}
                loop={true}
            >
                <SwiperSlide><img className='h-150 object-cover' src="./slider-1.jpg" alt="img" /></SwiperSlide>
                <SwiperSlide><img className='h-150 object-cover' src="./slider-2.jpg" alt="img" /></SwiperSlide>
                <SwiperSlide><img className='h-150 object-cover' src="./slider-3.jpg" alt="img" /></SwiperSlide>
            </Swiper>
        </div>
    );
}

export default HeroSection;
