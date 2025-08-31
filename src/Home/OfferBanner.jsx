import Offer from '../assets/Offer.jpg';
import Offer1 from '../assets/Offer2.jpg';

const OfferBanner = () => {
    return (
        <div className='my-6 grid grid-cols-2 gap-3 w-11/13 mx-auto'>
            <img className='h-80 w-full object-cover' src={Offer} alt="" />
            <img src={Offer1} alt="" />
        </div>
    );
};

export default OfferBanner;