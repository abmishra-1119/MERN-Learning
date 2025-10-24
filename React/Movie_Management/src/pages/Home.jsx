import React from 'react';
import HeroSection from '../components/HeroSection';
import PopularSection from '../components/PopularSection';
import TrendingSection from '../components/TrendingSection';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <PopularSection />
            <TrendingSection />
        </div>
    );
}

export default Home;
