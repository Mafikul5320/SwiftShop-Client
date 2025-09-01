import React from 'react';
import HeroSection from '../Home/HeroSection';
import ProductCategory from '../Home/ProductCategory';
import FeaturedProduct from '../Home/FeaturedProduct';
import OfferBanner from '../Home/OfferBanner';
import WhyChooseUs from '../Home/WhyChooseUs';
import ReviewSection from '../Home/ReviewSection';

const HomeLayout = () => {
    return (
        <div>
            <HeroSection />
            <ProductCategory />
            <FeaturedProduct />
            <OfferBanner />
            <WhyChooseUs />
            <ReviewSection />
        </div>
    );
};

export default HomeLayout;