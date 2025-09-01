import Offer from '../assets/Offer.jpg';
import Offer1 from '../assets/Offer2.jpg';
import Offer2 from '../assets/Offer3.jpg';

const OfferBanner = () => {
  return (
<div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-11/12 mx-auto">
  {/* Left Section */}
  <div className="grid gap-6">
    {/* Top Image */}
    <div className="relative group overflow-hidden rounded-2xl shadow-lg">
      <img
        className="h-80 w-full object-cover transform group-hover:scale-105 transition duration-500"
        src={Offer}
        alt="Offer Banner"
      />
      {/* Floating Badge */}
      <span className="absolute top-4 left-4 bg-[#F59E0B] text-white px-3 py-1 rounded-lg text-sm font-semibold shadow">
        -50% OFF
      </span>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-black/40 to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition duration-500">
        <h3 className="text-white text-xl font-bold">Special Deal</h3>
        <p className="text-gray-200 text-sm mt-1">Grab today before it ends!</p>
        <button className="mt-3 bg-[#06B6D4] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0891B2] transition shadow-md">
          Shop Now
        </button>
      </div>
    </div>

    {/* Bottom Image */}
    <div className="relative group overflow-hidden rounded-2xl shadow-lg">
      <img
        className="h-80 w-full object-cover transform group-hover:scale-105 transition duration-500"
        src={Offer2}
        alt="Offer Banner"
      />
      <span className="absolute top-4 left-4 bg-[#F59E0B] text-white px-3 py-1 rounded-lg text-sm font-semibold shadow">
        Hot Deal
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-black/40 to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition duration-500">
        <h3 className="text-white text-xl font-bold">Spring Sale</h3>
        <p className="text-gray-200 text-sm mt-1">Fresh arrivals this week.</p>
        <button className="mt-3 bg-[#06B6D4] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0891B2] transition shadow-md">
          Explore Deals
        </button>
      </div>
    </div>
  </div>

  {/* Right Section */}
  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
    <img
      className="h-[670px] w-full object-cover transform group-hover:scale-105 transition duration-500"
      src={Offer1}
      alt="Main Offer"
    />
    <span className="absolute top-5 left-5 bg-[#F59E0B] text-white px-4 py-1 rounded-lg text-base font-bold shadow">
      Mega Sale
    </span>
    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-black/40 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition duration-500">
      <h2 className="text-white text-3xl font-extrabold">Festival Mega Sale</h2>
      <p className="text-gray-200 text-sm mt-2">Your favorite brands at unbeatable prices.</p>
      <button className="mt-4 bg-[#06B6D4] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#0891B2] transition shadow-md">
        Discover Now
      </button>
    </div>
  </div>
</div>

  );
};

export default OfferBanner;
