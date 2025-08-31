import React from 'react';
import HeroSection from '../Home/HeroSection';
import ProductCategory from '../Home/ProductCategory';
import FeaturedProduct from '../Home/FeaturedProduct';
import OfferBanner from '../Home/OfferBanner';

const HomeLayout = () => {
    return (
        <div>
            <HeroSection />
            <ProductCategory />
            <FeaturedProduct />
            <OfferBanner />
        </div>
    );
};

export default HomeLayout;