import { useQuery } from "@tanstack/react-query";
import { FaTshirt, FaLaptop, FaCouch, FaMobileAlt, FaHeart, FaGem } from "react-icons/fa";
import { IoCameraSharp, IoGameController } from "react-icons/io5";
import { PiTelevisionBold } from "react-icons/pi";
import { ImHeadphones } from "react-icons/im";
import { FaComputer } from "react-icons/fa6";
import { BsWatch } from "react-icons/bs";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router";

const ProductCategory = () => {
    const axiosSucure = useAxiosSecure();
    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosSucure.get("/categories");
            return res.data;
        },
    });

    const categoryIcons = [
        <FaMobileAlt />,
        <FaLaptop />,
        <IoCameraSharp />,
        <BsWatch />,
        <IoGameController />,
        <PiTelevisionBold />,
        <FaComputer />,
        <ImHeadphones />
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="w-11/13 mx-auto ">
                {/* Title */}
                <div className="py-4">
                    <h2 className="text-5xl font-extrabold text-gray-800 text-center">
                        Featured <span className="text-[#08aec3]">Categories</span>
                    </h2>
                    <p className="text-center text-sm py-2">
                        Get Your Desired Product from Featured Category!
                    </p>
                </div>

                {/* Categories Grid */}
                {isLoading ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="w-11/13 mx-auto flex flex-col items-center bg-white shadow-md rounded-xl p-6">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4">
                                <div className="skeleton w-19 h-16 rounded-full"></div>
                            </div>
                            <div className="skeleton h-4 w-16 rounded"></div>
                        </div>
                    ))}
                </div> : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-6">
                    {categories?.map((cat, index) => (
                        <Link key={index} to={`/category-product/${cat?.name}`}>
                            <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 cursor-pointer 
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border border-[#08aec3]"
                            >
                                <div className="w-16 h-16 flex items-center text-gray-600 justify-center rounded-full text-4xl mb-4">
                                    {categoryIcons[index % categoryIcons.length]}
                                </div>
                                <span className="font-semibold text-gray-700">{cat.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>}
            </div>
        </section>
    );
};

export default ProductCategory;
