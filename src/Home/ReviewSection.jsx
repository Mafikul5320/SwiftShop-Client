import Review1 from '../assets/review1.png';
import Review2 from '../assets/review2.png';
import Review3 from '../assets/Offer3.jpg';
import Review4 from '../assets/review4.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Added Pagination for better UX
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // Import pagination styles

const ReviewSection = () => {
  const fallbackImages = [Review1, Review2, Review3, Review4];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
  };

  // NOTE: I'm updating the review data to use different names/roles for better demo realism.
  const reviews = [
    {
      id: 1,
      name: "Sophia Lee",
      role: "Product Manager, TechCorp",
      rating: 5,
      comment:
        "Outstanding delivery! Sophia was professional, communicative, and ensured the project was completed to a high standard, exceeding all expectations. A true professional!",
    },
    {
      id: 2,
      name: "Alex Johnson",
      role: "Lead Developer, Innovate Solutions",
      rating: 4,
      comment:
        "Great work ethic and high-quality results. The execution was flawless, and they were very responsive to feedback. Highly recommend for complex projects.",
    },
    {
      id: 3,
      name: "Maria Garcia",
      role: "Marketing Director, Global Brands",
      rating: 5,
      comment:
        "Absolutely thrilled with the outcome! The dedication and attention to detail were evident in every phase of the project. I'll definitely be working with them again.",
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "CEO, Startup Forge",
      rating: 5,
      comment:
        "Exceptional service! Michael's work exceeded our expectations. Great communication and flawless execution of our requirements from start to finish.",
    },
    {
      id: 5,
      name: "Ethan King",
      role: "UX Designer, Digital Agency",
      rating: 4,
      comment:
        "A reliable partner. They brought fresh ideas and delivered a product that was both beautiful and functional. Very satisfied with the collaboration.",
    },
  ];

  return (
    <div className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 mb-16">
        <span className="text-sm font-medium text-blue-700 uppercase tracking-widest">
          Testimonials
        </span>
        <h2 className="text-5xl font-extrabold text-gray-900 mt-2">
          Happy & Satisfied Clients 🚀
        </h2>
        <p className="text-xl text-gray-500 mt-4">
          Hear it directly from the people I've helped succeed.
        </p>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Included Pagination
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="max-w-7xl mx-auto pb-16" // Added padding-bottom for pagination dots
        >
          {reviews.map((review) => (
            // SwiperSlide acts as the hover group for animation
            <SwiperSlide key={review.id} className="p-2 group">
              <div
                className="
                  bg-white rounded-3xl p-8 h-full flex flex-col justify-between
                  shadow-xl border border-gray-100 transition duration-500 ease-in-out
                  hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-200/50
                  transform
                "
              >
                {/* Review Content */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {/* Stars */}
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? "text-amber-500" : "text-gray-300"
                          } transition-colors duration-200`}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    {/* Quote Icon */}
                    <svg
                      className="w-10 h-10 text-blue-200 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.408 1.897c-3.235.636-6.142 2.766-7.85 5.676 2.458.747 4.549 2.128 5.761 4.225.295.513.197 1.135-.251 1.503-.449.368-1.127.358-1.567-.023-1.688-1.637-3.99-2.73-6.527-3.243-.454-.092-.883-.34-1.206-.677l-.609-.646zm-13 0c0-5.141 3.892-10.519 10-11.725l.408 1.897c-3.235.636-6.142 2.766-7.85 5.676 2.458.747 4.549 2.128 5.761 4.225.295.513.197 1.135-.251 1.503-.449.368-1.127.358-1.567-.023-1.688-1.637-3.99-2.73-6.527-3.243-.454-.092-.883-.34-1.206-.677l-.609-.646z" />
                    </svg>
                  </div>
                  
                  <p className="text-lg italic text-gray-700 leading-relaxed mb-6">
                    {review.comment}
                  </p>
                </div>

                {/* Separator and User Info */}
                <div className="pt-4 border-t border-gray-100 flex items-center">
                  <img
                    src={review.image || getRandomImage()}
                    alt={review.name}
                    className="w-12 h-12 object-cover rounded-full shadow-md mr-4 ring-2 ring-blue-500/50"
                  />
                  <div>
                    <h4 className="text-md font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {review.name}
                    </h4>
                    <p className="text-sm text-blue-500">{review.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation (optional: hides default Swiper buttons) */}
        <div className="swiper-button-prev-custom hidden xl:block absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:bg-blue-100 transition">
          <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </div>
        <div className="swiper-button-next-custom hidden xl:block absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:bg-blue-100 transition">
          <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;