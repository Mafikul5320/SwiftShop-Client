import React from 'react';
import HeroSection from '../Home/HeroSection';
import ProductCategory from '../Home/ProductCategory';
import FeaturedProduct from '../Home/Product/FeaturedProduct';
import OfferBanner from '../Home/OfferBanner';
import WhyChooseUs from '../Home/WhyChooseUs';
import ReviewSection from '../Home/ReviewSection';
import Register from '../Auth/Register';

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