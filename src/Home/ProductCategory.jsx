import { useQuery } from "@tanstack/react-query";
import { FaTshirt, FaLaptop, FaCouch, FaMobileAlt, FaHeart, FaGem } from "react-icons/fa";
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
        <FaTshirt />,
        <FaLaptop />,
        <FaCouch />,
        <FaMobileAlt />,
        <FaHeart />,
        <FaGem />,
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Title */}
                <div className="py-4">
                    <h2 className="text-4xl font-extrabold text-gray-800 text-center">
                        Featured <span className="text-[#08aec3]">Categories</span>
                    </h2>
                    <p className="text-center text-sm py-2">
                        Get Your Desired Product from Featured Category!
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
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
                </div>
            </div>
        </section>
    );
};

export default ProductCategory;
