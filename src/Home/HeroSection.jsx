import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      title:
        "Haylou RS4 Max Starlight Silver Bluetooth Calling Smart Watch",
      subtitle: "Limited Time Offer 12% Off",
      buttonText: "Buy now",
      linkText: "Find more →",
      path: "/product-details/68c9fada47b18c11559ee3b9",
      image:
        "https://i.ibb.co.com/kg7jqLgn/haylou-rs4-max-starlight-silver-bluetooth-calling-11703332842-1.webp",
    },
    {
      id: 2,
      title: "Xtreme S-Q90 Wired Black & Red Multimedia Headphone",
      subtitle: "Special Deal 18% Off",
      buttonText: "Shop now",
      path: "/product-details/68bb245fc7fa32bf4b641be8",
      linkText: "Explore →",
      image:
        "https://i.ibb.co.com/5h84KK7D/xtreme-s-q90-wired-black-red-multimedia-11734097458-1.png",
    },
  ];

  return (
    <div className="w-11/13 mx-auto my-9 bg-[#d5f5fa] rounded-xl">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-12">
              {/* Text Section */}
              <div className="max-w-lg text-center md:text-left">
                <p className="text-red-500 font-medium">{slide.subtitle}</p>
                <h1 className="text-3xl leading-snug md:text-4xl font-bold text-gray-800 mt-2">
                  {slide.title}
                </h1>
                <div className="mt-6 flex items-center gap-4 justify-center md:justify-start">
                  <Link to={slide.path}>
                    <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow hover:bg-orange-600 transition cursor-pointer">
                      {slide.buttonText}
                    </button>
                  </Link>
                  <a
                    href="/all-product"
                    className="text-gray-700 font-medium hover:text-orange-500"
                  >
                    {slide.linkText}
                  </a>
                </div>
              </div>

              {/* Image Section */}
              <div className="mt-8 md:mt-0">
                <img
                  src={slide.image}
                  alt="Product"
                  className="w-72 md:w-84 object-cover drop-shadow-lg"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
