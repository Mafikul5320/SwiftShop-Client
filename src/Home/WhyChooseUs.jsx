import { Truck, Headphones, BadgeCheck, RotateCcw } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div className="my-16 bg-gradient-to-r from-[#08aec3]/10 via-white to-[#08aec3]/10 py-12">
      <div className="w-11/12 mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          Why <span className="text-[#08aec3]">Choose Us?</span>
        </h2>
        <p className="text-gray-600 mt-3 mb-10 max-w-2xl mx-auto">
          We provide the best service and unbeatable offers to make your shopping experience easy, fast, and enjoyable.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Service 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <Truck className="text-[#08aec3] w-14 h-14 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800">Fast Delivery</h3>
            <p className="text-sm text-gray-500 mt-2">
              Get your products delivered quickly and on time, every time.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <Headphones className="text-[#08aec3] w-14 h-14 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800">24/7 Support</h3>
            <p className="text-sm text-gray-500 mt-2">
              Our support team is always here to help you with your queries.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <BadgeCheck className="text-[#08aec3] w-14 h-14 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800">Premium Quality</h3>
            <p className="text-sm text-gray-500 mt-2">
              We ensure all our products meet the highest quality standards.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <RotateCcw className="text-[#08aec3] w-14 h-14 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800">Easy Returns</h3>
            <p className="text-sm text-gray-500 mt-2">
              Hassle-free returns and exchanges with a simple process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
