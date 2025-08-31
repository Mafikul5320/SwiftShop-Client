import Banner1 from '../assets/Banner_1.jpg';
import Banner2 from '../assets/Banner_1.jpg';
import Banner3 from '../assets/Banner_1.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const HeroSection = () => {
    return (
        <div>
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                loop={true}
                pagination={{ clickable: true }}
                className="w-full h-[200px] sm:h-[300px] md:h-[650px]  "
            >
                {[Banner1, Banner2, Banner3].map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover "
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
};

export default HeroSection;