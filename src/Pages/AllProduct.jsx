import React, { useContext, useEffect, useState, useMemo } from 'react';
import {
    Heart, ShoppingCart, Share2, Copy,
    SlidersHorizontal, X, Search,
    LayoutGrid, LayoutList, ChevronDown,
    ChevronUp, Star, Filter, ArrowUpDown
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { Rating } from 'react-simple-star-rating';
import fb from '../assets/fb.png';
import twiter from '../assets/twiter.png';
import whatsapp from '../assets/whatsapp.png';
import { Link } from 'react-router';
import { IoMdHeart } from "react-icons/io";
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FavoriteContext } from '../Context/FavoriteProvider';
import { CartContext } from '../Context/CartProvider ';

const SORT_OPTIONS = [
    { value: 'default',    label: 'Default'           },
    { value: 'price_asc',  label: 'Price: Low → High' },
    { value: 'price_desc', label: 'Price: High → Low' },
    { value: 'rating',     label: 'Top Rated'         },
    { value: 'newest',     label: 'Newest First'      },
];

const ProductSkeleton = ({ list }) =>
    list ? (
        <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm animate-pulse">
            <div className="w-32 h-32 bg-gray-200 rounded-xl shrink-0" />
            <div className="flex-1 space-y-3 py-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
        </div>
    ) : (
        <div className="bg-white rounded-2xl shadow-sm p-4 animate-pulse space-y-3">
            <div className="w-full h-52 bg-gray-200 rounded-xl" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
    );

const AllProduct = () => {
    const axiosSecure = useAxiosSecure();
    const { addToCart } = useContext(CartContext);
    const { favorite, addFavorite, removeFavorite } = useContext(FavoriteContext);

    const [searchQuery,        setSearchQuery]        = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange,         setPriceRange]         = useState([0, 100000]);
    const [maxBound,           setMaxBound]           = useState(100000);
    const [sortBy,             setSortBy]             = useState('default');
    const [stockFilter,        setStockFilter]        = useState('all'); // 'all' | 'in' | 'out'
    const [viewMode,           setViewMode]           = useState('grid');
    const [sidebarOpen,        setSidebarOpen]        = useState(false);
    const [catOpen,            setCatOpen]            = useState(true);
    const [priceOpen,          setPriceOpen]          = useState(true);
    const [stockOpen,          setStockOpen]          = useState(true);

    /* ── share modal ── */
    const [shareProduct, setShareProduct] = useState(null);
    const [copied,       setCopied]       = useState(false);

    /* ── fetch all products once ── */
    const { data: allProducts = [], isLoading } = useQuery({
        queryKey: ['AllProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/product');
            return res.data;
        },
        staleTime: 1000 * 60 * 5,
    });

    /* ── fetch categories ── */
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories');
            return res.data;
        },
    });

    useEffect(() => {
        if (allProducts.length) {
            const prices = allProducts.map(p => {
                const orig = parseFloat(p.price) || 0;
                const disc = parseFloat(p.discount) || 0;
                return +(orig - (orig * disc / 100)).toFixed(2);
            });
            const max = Math.ceil(Math.max(...prices));
            setMaxBound(max);
            setPriceRange([0, max]);
        }
    }, [allProducts]);

    const filteredProducts = useMemo(() => {
        let list = [...allProducts];

        // search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(p =>
                p.product_name?.toLowerCase().includes(q) ||
                p.categories?.toLowerCase().includes(q)
            );
        }

        // categories
        if (selectedCategories.length > 0) {
            list = list.filter(p => selectedCategories.includes(p.categories));
        }

        // price range
        list = list.filter(p => {
            const orig = parseFloat(p.price) || 0;
            const disc = parseFloat(p.discount) || 0;
            const final = +(orig - (orig * disc / 100)).toFixed(2);
            return final >= priceRange[0] && final <= priceRange[1];
        });

        // stock
        if (stockFilter === 'in')  list = list.filter(p => p.stockStatus === 'true');
        if (stockFilter === 'out') list = list.filter(p => p.stockStatus !== 'true');

        // sort
        if (sortBy === 'price_asc')  list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        if (sortBy === 'price_desc') list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        if (sortBy === 'rating')     list.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        if (sortBy === 'newest')     list.reverse();

        return list;
    }, [allProducts, searchQuery, selectedCategories, priceRange, stockFilter, sortBy]);

    /* ── active filter count ── */
    const activeFilterCount =
        selectedCategories.length +
        (stockFilter !== 'all' ? 1 : 0) +
        (priceRange[0] > 0 || priceRange[1] < maxBound ? 1 : 0) +
        (searchQuery ? 1 : 0) +
        (sortBy !== 'default' ? 1 : 0);

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedCategories([]);
        setPriceRange([0, maxBound]);
        setStockFilter('all');
        setSortBy('default');
    };

    const toggleCategory = (name) => {
        setSelectedCategories(prev =>
            prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
        );
    };

    const handleCopy = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    /* ─── filter sidebar ─── */
    const FilterSidebar = () => (
        <aside className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-[#08aec3]" />
                    <h3 className="font-bold text-[#0A2540] text-base">Filters</h3>
                    {activeFilterCount > 0 && (
                        <span className="bg-[#08aec3] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {activeFilterCount}
                        </span>
                    )}
                </div>
                {activeFilterCount > 0 && (
                    <button
                        onClick={clearAllFilters}
                        className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 transition"
                    >
                        <X size={12} /> Clear All
                    </button>
                )}
            </div>

            <hr className="border-gray-200" />

            {/* Category */}
            <div>
                <button
                    onClick={() => setCatOpen(o => !o)}
                    className="w-full flex items-center justify-between font-semibold text-sm text-[#0A2540] mb-3"
                >
                    Category
                    {catOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
                {catOpen && (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                        {categories.map(cat => {
                            const checked = selectedCategories.includes(cat.name);
                            return (
                                <label
                                    key={cat._id}
                                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition text-sm
                                        ${checked
                                            ? 'bg-[#08aec3]/10 text-[#08aec3] font-semibold'
                                            : 'hover:bg-gray-50 text-gray-600'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm border-gray-300"
                                        style={{ accentColor: '#08aec3' }}
                                        checked={checked}
                                        onChange={() => toggleCategory(cat.name)}
                                    />
                                    <span className="flex-1">{cat.name}</span>
                                    <span className={`text-xs rounded-full px-1.5 py-0.5
                                        ${checked ? 'bg-[#08aec3] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        {allProducts.filter(p => p.categories === cat.name).length}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>

            <hr className="border-gray-200" />

            {/* Price Range */}
            <div>
                <button
                    onClick={() => setPriceOpen(o => !o)}
                    className="w-full flex items-center justify-between font-semibold text-sm text-[#0A2540] mb-3"
                >
                    Price Range
                    {priceOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
                {priceOpen && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded-lg">৳{priceRange[0].toLocaleString()}</span>
                            <span className="text-gray-300">—</span>
                            <span className="bg-[#08aec3]/10 text-[#08aec3] px-2 py-1 rounded-lg font-semibold">৳{priceRange[1].toLocaleString()}</span>
                        </div>
                        {/* Min slider */}
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400">Min Price</label>
                            <input
                                type="range"
                                min={0}
                                max={maxBound}
                                step={Math.max(1, Math.floor(maxBound / 100))}
                                value={priceRange[0]}
                                onChange={e => {
                                    const v = Number(e.target.value);
                                    if (v <= priceRange[1]) setPriceRange([v, priceRange[1]]);
                                }}
                                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                                style={{ accentColor: '#08aec3' }}
                            />
                        </div>
                        {/* Max slider */}
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400">Max Price</label>
                            <input
                                type="range"
                                min={0}
                                max={maxBound}
                                step={Math.max(1, Math.floor(maxBound / 100))}
                                value={priceRange[1]}
                                onChange={e => {
                                    const v = Number(e.target.value);
                                    if (v >= priceRange[0]) setPriceRange([priceRange[0], v]);
                                }}
                                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                                style={{ accentColor: '#08aec3' }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <hr className="border-gray-200" />

            {/* Stock Status */}
            <div>
                <button
                    onClick={() => setStockOpen(o => !o)}
                    className="w-full flex items-center justify-between font-semibold text-sm text-[#0A2540] mb-3"
                >
                    Availability
                    {stockOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
                {stockOpen && (
                    <div className="space-y-2">
                        {[
                            { val: 'all', label: 'All Products' },
                            { val: 'in',  label: 'In Stock Only' },
                            { val: 'out', label: 'Out of Stock' },
                        ].map(opt => (
                            <label
                                key={opt.val}
                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition text-sm
                                    ${stockFilter === opt.val
                                        ? 'bg-[#08aec3]/10 text-[#08aec3] font-semibold'
                                        : 'hover:bg-gray-50 text-gray-600'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="stock"
                                    className="radio radio-sm"
                                    style={{ accentColor: '#08aec3' }}
                                    checked={stockFilter === opt.val}
                                    onChange={() => setStockFilter(opt.val)}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );

    /* ─── product card (grid) ─── */
    const GridCard = ({ p }) => {
        const isFav = favorite?.some(f => f._id === p._id);
        const orig  = parseFloat(p.price);
        const disc  = parseFloat(p.discount) || 0;
        const final = (orig - (orig * disc / 100)).toFixed(2);
        const inStock = p.stockStatus === 'true';

        return (
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 group cursor-pointer relative border border-transparent hover:border-[#08aec3]/30">
                <div className="relative overflow-hidden rounded-xl bg-gray-50">
                    <img
                        src={p.product_img}
                        alt={p.product_name}
                        className="w-full h-52 object-contain transform group-hover:scale-105 transition duration-500"
                    />
                    {disc > 0 && (
                        <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                            -{disc}%
                        </span>
                    )}
                    {!inStock && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
                            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
                        </div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-end justify-center gap-2 pr-3 opacity-0 group-hover:opacity-100 transition duration-300">
                        <button
                            onClick={() => addToCart(p, 1)}
                            disabled={!inStock}
                            className="bg-[#08aec3] text-white p-2 rounded-full shadow hover:bg-cyan-600 transition transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart size={16} />
                        </button>
                        {isFav ? (
                            <button onClick={() => removeFavorite(p._id)} className="bg-white text-red-500 p-2 rounded-full shadow hover:bg-red-50 transition transform hover:scale-110">
                                <IoMdHeart size={16} />
                            </button>
                        ) : (
                            <button onClick={() => addFavorite(p, 1)} className="bg-white text-gray-500 p-2 rounded-full shadow hover:bg-gray-50 transition transform hover:scale-110">
                                <Heart size={16} />
                            </button>
                        )}
                        <button onClick={() => setShareProduct(p)} className="bg-white text-[#08aec3] p-2 rounded-full shadow hover:bg-gray-50 transition transform hover:scale-110">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>
                <div className="mt-3 space-y-1.5">
                    <p className="text-[#08aec3] text-xs font-semibold uppercase tracking-wide">{p.categories}</p>
                    <Link to={`/product-details/${p._id}`}>
                        <h3 className="text-sm font-semibold text-[#0A2540] line-clamp-2 hover:text-[#08aec3] transition">
                            {p.product_name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1">
                        <Rating readonly initialValue={p.rating} size={14} allowFraction fillColor="#FACC15" emptyColor="#E5E7EB" SVGstyle={{ display: 'inline-block' }} />
                        <span className="text-gray-400 text-xs">({p.rating})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#0A2540] font-bold">৳{final}</span>
                        {disc > 0 && <span className="text-gray-400 line-through text-xs">৳{orig}</span>}
                    </div>
                </div>
            </div>
        );
    };

    /* ─── product card (list) ─── */
    const ListCard = ({ p }) => {
        const isFav = favorite?.some(f => f._id === p._id);
        const orig  = parseFloat(p.price);
        const disc  = parseFloat(p.discount) || 0;
        const final = (orig - (orig * disc / 100)).toFixed(2);
        const inStock = p.stockStatus === 'true';

        return (
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 group flex gap-4 border border-transparent hover:border-[#08aec3]/30">
                <div className="relative overflow-hidden rounded-xl bg-gray-50 shrink-0 w-36 h-36">
                    <img
                        src={p.product_img}
                        alt={p.product_name}
                        className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                    />
                    {disc > 0 && (
                        <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-{disc}%</span>
                    )}
                </div>
                <div className="flex-1 space-y-1.5">
                    <p className="text-[#08aec3] text-xs font-semibold uppercase tracking-wide">{p.categories}</p>
                    <Link to={`/product-details/${p._id}`}>
                        <h3 className="font-semibold text-[#0A2540] hover:text-[#08aec3] transition line-clamp-2">{p.product_name}</h3>
                    </Link>
                    <div className="flex items-center gap-1">
                        <Rating readonly initialValue={p.rating} size={14} allowFraction fillColor="#FACC15" emptyColor="#E5E7EB" SVGstyle={{ display: 'inline-block' }} />
                        <span className="text-gray-400 text-xs">({p.rating})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#0A2540] font-bold text-lg">৳{final}</span>
                        {disc > 0 && <span className="text-gray-400 line-through text-sm">৳{orig}</span>}
                    </div>
                    <p className={`text-xs font-semibold ${inStock ? 'text-green-600' : 'text-red-500'}`}>
                        {inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </p>
                </div>
                <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                    <div className="flex gap-2">
                        {isFav ? (
                            <button onClick={() => removeFavorite(p._id)} className="text-red-500 p-2 rounded-full bg-red-50 hover:bg-red-100 transition">
                                <IoMdHeart size={16} />
                            </button>
                        ) : (
                            <button onClick={() => addFavorite(p, 1)} className="text-gray-400 p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition">
                                <Heart size={16} />
                            </button>
                        )}
                        <button onClick={() => setShareProduct(p)} className="text-[#08aec3] p-2 rounded-full bg-[#08aec3]/10 hover:bg-[#08aec3]/20 transition">
                            <Share2 size={16} />
                        </button>
                    </div>
                    <button
                        onClick={() => addToCart(p, 1)}
                        disabled={!inStock}
                        className="flex items-center gap-1.5 bg-[#08aec3] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart size={14} /> Add to Cart
                    </button>
                </div>
            </div>
        );
    };

    /* ─── render ─── */
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#08aec3]/5">
            {/* ── Page Header ── */}
            <div className="bg-gradient-to-r from-[#0A2540] to-[#08aec3] py-14 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">All Products</h1>
                <p className="text-white/75 text-lg">Discover {allProducts.length}+ amazing products</p>
            </div>

            <div className="w-11/12 mx-auto py-8">
                {/* ── Top Bar: Search + Mobile Filter Toggle ── */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products by name or category…"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:border-[#08aec3] focus:ring-2 focus:ring-[#08aec3]/20 transition text-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Mobile filter toggle */}
                    <button
                        onClick={() => setSidebarOpen(o => !o)}
                        className="lg:hidden flex items-center gap-2 px-5 py-3 bg-[#0A2540] text-white rounded-2xl font-medium text-sm shadow hover:bg-[#08aec3] transition"
                    >
                        <Filter size={16} />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="bg-amber-400 text-[#0A2540] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* ── Active filter chips ── */}
                {(selectedCategories.length > 0 || stockFilter !== 'all' || priceRange[0] > 0 || priceRange[1] < maxBound) && (
                    <div className="flex flex-wrap gap-2 mb-5">
                        {selectedCategories.map(cat => (
                            <span key={cat} className="flex items-center gap-1.5 bg-[#08aec3]/10 text-[#08aec3] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#08aec3]/30">
                                {cat}
                                <button onClick={() => toggleCategory(cat)}><X size={11} /></button>
                            </span>
                        ))}
                        {stockFilter !== 'all' && (
                            <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
                                {stockFilter === 'in' ? 'In Stock' : 'Out of Stock'}
                                <button onClick={() => setStockFilter('all')}><X size={11} /></button>
                            </span>
                        )}
                        {(priceRange[0] > 0 || priceRange[1] < maxBound) && (
                            <span className="flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
                                ৳{priceRange[0]} – ৳{priceRange[1]}
                                <button onClick={() => setPriceRange([0, maxBound])}><X size={11} /></button>
                            </span>
                        )}
                    </div>
                )}

                {/* ── Main layout ── */}
                <div className="flex gap-7">
                    {/* ── Sidebar (desktop always visible, mobile overlay) ── */}
                    {/* Mobile Overlay */}
                    {sidebarOpen && (
                        <div
                            className="lg:hidden fixed inset-0 bg-black/50 z-40"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    <aside
                        className={`
                            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                            lg:translate-x-0 lg:static fixed top-0 left-0 h-full z-50 lg:z-auto
                            w-72 lg:w-64 xl:w-72 shrink-0
                            bg-white rounded-2xl shadow-lg p-5 border border-gray-100
                            transition-transform duration-300
                            overflow-y-auto
                        `}
                    >
                        {/* Mobile close */}
                        <div className="lg:hidden flex justify-end mb-4">
                            <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500">
                                <X size={20} />
                            </button>
                        </div>
                        <FilterSidebar />
                    </aside>

                    {/* ── Products area ── */}
                    <div className="flex-1 min-w-0">
                        {/* Sort + results + view toggle bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500">
                                Showing{' '}
                                <span className="font-bold text-[#0A2540]">{filteredProducts.length}</span>
                                {' '}of{' '}
                                <span className="font-bold text-[#0A2540]">{allProducts.length}</span>
                                {' '}products
                                {activeFilterCount > 0 && (
                                    <button onClick={clearAllFilters} className="ml-3 text-red-500 hover:text-red-700 font-semibold text-xs underline">
                                        Clear all filters
                                    </button>
                                )}
                            </p>
                            <div className="flex items-center gap-3">
                                {/* Sort dropdown */}
                                <div className="relative">
                                    <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={sortBy}
                                        onChange={e => setSortBy(e.target.value)}
                                        className="pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#08aec3] cursor-pointer appearance-none"
                                    >
                                        {SORT_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* View toggle */}
                                <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 transition ${viewMode === 'grid' ? 'bg-[#08aec3] text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                                    >
                                        <LayoutGrid size={16} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 transition ${viewMode === 'list' ? 'bg-[#08aec3] text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                                    >
                                        <LayoutList size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        {isLoading ? (
                            <div className={viewMode === 'grid'
                                ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                                : "space-y-4"
                            }>
                                {[...Array(8)].map((_, i) => <ProductSkeleton key={i} list={viewMode === 'list'} />)}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-5">
                                    <Search size={36} className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                                <p className="text-gray-400 text-sm mb-6">Try adjusting your filters or search term</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-6 py-2.5 bg-[#08aec3] text-white rounded-xl font-medium hover:bg-cyan-600 transition"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProducts.map(p => <GridCard key={p._id} p={p} />)}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredProducts.map(p => <ListCard key={p._id} p={p} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Share Modal ── */}
            {shareProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-[fadeIn_0.2s_ease]">
                        <button
                            onClick={() => setShareProduct(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold text-[#0A2540] text-center mb-1">Share Product</h2>
                        <p className="text-sm text-gray-500 mb-5 text-center">Copy the link or share with friends</p>
                        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                            <span className="truncate text-sm text-gray-600 flex-1">
                                {window.location.origin}/product-details/{shareProduct._id}
                            </span>
                            <button
                                onClick={() => handleCopy(`${window.location.origin}/product-details/${shareProduct._id}`)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${copied ? 'bg-green-500 text-white' : 'bg-[#08aec3] text-white hover:bg-cyan-600'}`}
                            >
                                {copied ? '✓ Copied!' : <><Copy size={14} /> Copy</>}
                            </button>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            {[
                                { src: fb, href: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/product-details/${shareProduct._id}` },
                                { src: twiter, href: `https://twitter.com/intent/tweet?url=${window.location.origin}/product-details/${shareProduct._id}` },
                                { src: whatsapp, href: `https://api.whatsapp.com/send?text=${window.location.origin}/product-details/${shareProduct._id}` },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                                    className="w-11 h-11 rounded-full overflow-hidden hover:scale-110 transition transform shadow-md">
                                    <img src={s.src} alt="share" className="w-full h-full object-cover" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProduct;
