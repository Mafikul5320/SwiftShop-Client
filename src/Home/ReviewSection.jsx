import Review1 from '../assets/review1.png';
import Review2 from '../assets/review2.png';
import Review3 from '../assets/Offer3.jpg';
import Review4 from '../assets/review4.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const ReviewSection = () => {
  const fallbackImages = [Review1, Review2, Review3, Review4];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
  };

  const reviews = [
    {
      id: 1,
      name: "Sophia Lee",
      role: "Product Manager",
      rating: 2,
      comment:
        "Sophia made everything so easy! She was very professional and delivered high-quality results on time. Highly recommend!",
    },
    {
      id: 2,
      name: "Sophia Lee",
      role: "Product Manager",
      rating: 4,
      comment:
        "Sophia made everything so easy! She was very professional and delivered high-quality results on time. Highly recommend!",
    },
    {
      id: 3,
      name: "Sophia Lee",
      role: "Product Manager",
      rating: 4,
      comment:
        "Sophia made everything so easy! She was very professional and delivered high-quality results on time. Highly recommend!",
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "Developer",
      rating: 5,
      comment:
        "Michael’s work exceeded our expectations. Great communication and flawless execution of our requirements.",
    },
    {
      id: 5,
      name: "Michael Brown",
      role: "Developer",
      rating: 5,
      comment:
        "Michael’s work exceeded our expectations. Great communication and flawless execution of our requirements.",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-5xl font-bold text-blue-900">Happy & Satisfied Faces</h2>
        <p className="text-gray-500 mt-2">
          Here's what some of my satisfied clients have to say about my work
        </p>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        className="max-w-4xl mx-auto"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white shadow-md rounded-2xl p-8">
              {/* Image */}
              <div className="relative">
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-blue-500 rounded-lg -z-10"></div>
                <img
                  src={review.image || getRandomImage()}
                  alt={review.name}
                  className="w-56 h-64 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Content */}
              <div className="text-left">
                <span className="text-4xl text-blue-500 font-bold">“</span>
                <p className="text-gray-600 mt-2">{review.comment}</p>
                {/* Stars */}
                <div className="flex items-center mt-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                {/* Name */}
                <div className="mt-3">
                  <h4 className="text-lg font-semibold text-blue-900">{review.name}</h4>
                  <p className="text-gray-500 text-sm">{review.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSection;
