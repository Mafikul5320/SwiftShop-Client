import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import {
    ShoppingCart, Heart, Share2, Copy, X,
    Flame, Tag, Clock, Zap, Star, ArrowRight,
    LayoutGrid, LayoutList, ChevronDown
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Rating } from 'react-simple-star-rating';
import { Link } from 'react-router';
import { IoMdHeart } from 'react-icons/io';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FavoriteContext } from '../Context/FavoriteProvider';
import { CartContext } from '../Context/CartProvider ';
import fb from '../assets/fb.png';
import twiter from '../assets/twiter.png';
import whatsapp from '../assets/whatsapp.png';

/* ─── Countdown hook ─── */
const useSaleCountdown = () => {
    const getSaleEnd = () => {
        const stored = localStorage.getItem('saleEndTime');
        if (stored) return new Date(stored);
        const end = new Date();
        end.setDate(end.getDate() + 2);
        end.setHours(23, 59, 59, 0);
        localStorage.setItem('saleEndTime', end.toISOString());
        return end;
    };

    const [saleEnd] = useState(getSaleEnd);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

    useEffect(() => {
        const tick = () => {
            const diff = saleEnd - Date.now();
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
                return;
            }
            setTimeLeft({
                days:  Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                mins:  Math.floor((diff % 3600000)  / 60000),
                secs:  Math.floor((diff % 60000)    / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [saleEnd]);

    return timeLeft;
};

/* ─── Skeleton ─── */
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

/* ─── Countdown Block ─── */
const CountBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                    {String(value).padStart(2, '0')}
                </span>
            </div>
        </div>
        <span className="text-white/70 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mt-2">{label}</span>
    </div>
);

/* ─── Main Component ─── */
const LimitedSale = () => {
    const axiosSecure = useAxiosSecure();
    const { addToCart }                            = useContext(CartContext);
    const { favorite, addFavorite, removeFavorite } = useContext(FavoriteContext);
    const countdown = useSaleCountdown();

    const [sortBy,       setSortBy]       = useState('discount_desc');
    const [viewMode,     setViewMode]     = useState('grid');
    const [shareProduct, setShareProduct] = useState(null);
    const [copied,       setCopied]       = useState(false);
    const [minDiscount,  setMinDiscount]  = useState(0);
    const [addedId,      setAddedId]      = useState(null);

    /* ── fetch all products ── */
    const { data: allProducts = [], isLoading } = useQuery({
        queryKey: ['LimitedSaleProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/product');
            return res.data;
        },
        staleTime: 1000 * 60 * 5,
    });

    /* ── only discounted ── */
    const saleProducts = useMemo(() => {
        let list = allProducts.filter(p => parseFloat(p.discount) > 0);

        if (minDiscount > 0) {
            list = list.filter(p => parseFloat(p.discount) >= minDiscount);
        }

        if (sortBy === 'discount_desc') list.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount));
        if (sortBy === 'discount_asc')  list.sort((a, b) => parseFloat(a.discount) - parseFloat(b.discount));
        if (sortBy === 'price_asc')     list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        if (sortBy === 'price_desc')    list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        if (sortBy === 'rating')        list.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));

        return list;
    }, [allProducts, sortBy, minDiscount]);

    /* ── savings calculator ── */
    const totalSavings = useMemo(() => {
        return saleProducts.reduce((acc, p) => {
            const orig = parseFloat(p.price) || 0;
            const disc = parseFloat(p.discount) || 0;
            return acc + (orig * disc / 100);
        }, 0);
    }, [saleProducts]);

    const handleCopy = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAddToCart = (p) => {
        addToCart(p, 1);
        setAddedId(p._id);
        setTimeout(() => setAddedId(null), 1500);
    };

    /* ─── Grid Card ─── */
    const GridCard = ({ p }) => {
        const isFav    = favorite?.some(f => f._id === p._id);
        const orig     = parseFloat(p.price);
        const disc     = parseFloat(p.discount) || 0;
        const final    = (orig - (orig * disc / 100)).toFixed(2);
        const saved    = (orig * disc / 100).toFixed(0);
        const inStock  = p.stockStatus === 'true';
        const isAdded  = addedId === p._id;

        return (
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 group cursor-pointer relative border border-transparent hover:border-[#08aec3]/30 overflow-hidden">
                {/* Flash sale ribbon */}
                <div className="absolute top-0 right-0 bg-gradient-to-br from-orange-500 to-red-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-2xl flex items-center gap-1 z-10">
                    <Flame size={10} /> SALE
                </div>

                <div className="relative overflow-hidden rounded-xl bg-gray-50">
                    <img
                        src={p.product_img}
                        alt={p.product_name}
                        className="w-full h-52 object-contain transform group-hover:scale-105 transition duration-500"
                    />
                    {/* Discount badge */}
                    <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg animate-pulse-slow">
                        -{disc}%
                    </span>

                    {/* Savings chip */}
                    <span className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Save ৳{saved}
                    </span>

                    {!inStock && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
                            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="absolute inset-0 flex flex-col items-end justify-center gap-2 pr-3 opacity-0 group-hover:opacity-100 transition duration-300">
                        <button
                            onClick={() => handleAddToCart(p)}
                            disabled={!inStock}
                            className={`p-2 rounded-full shadow transition transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${isAdded ? 'bg-green-500 text-white' : 'bg-[#08aec3] text-white hover:bg-cyan-600'}`}
                        >
                            {isAdded ? <Zap size={16} /> : <ShoppingCart size={16} />}
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
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[#0A2540] font-black text-base">৳{final}</span>
                        <span className="text-gray-400 line-through text-xs">৳{orig}</span>
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-1.5 py-0.5 rounded-full">{disc}% OFF</span>
                    </div>
                    {/* Add to Cart CTA */}
                    <button
                        onClick={() => handleAddToCart(p)}
                        disabled={!inStock}
                        className={`w-full py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 mt-1 ${
                            !inStock
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : isAdded
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-[#08aec3] to-cyan-500 text-white hover:from-cyan-600 hover:to-[#08aec3] shadow-md hover:shadow-lg'
                        }`}
                    >
                        {isAdded ? <><Zap size={14} /> Added!</> : !inStock ? 'Out of Stock' : <><ShoppingCart size={14} /> Add to Cart</>}
                    </button>
                </div>
            </div>
        );
    };

    /* ─── List Card ─── */
    const ListCard = ({ p }) => {
        const isFav   = favorite?.some(f => f._id === p._id);
        const orig    = parseFloat(p.price);
        const disc    = parseFloat(p.discount) || 0;
        const final   = (orig - (orig * disc / 100)).toFixed(2);
        const saved   = (orig * disc / 100).toFixed(0);
        const inStock = p.stockStatus === 'true';
        const isAdded = addedId === p._id;

        return (
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 group flex gap-4 border border-transparent hover:border-[#08aec3]/30 relative overflow-hidden">
                {/* Flash ribbon */}
                <div className="absolute top-0 right-0 bg-gradient-to-br from-orange-500 to-red-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-2xl flex items-center gap-1">
                    <Flame size={10} /> -{disc}% OFF
                </div>

                <div className="relative overflow-hidden rounded-xl bg-gray-50 shrink-0 w-36 h-36">
                    <img
                        src={p.product_img}
                        alt={p.product_name}
                        className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute bottom-1 left-1 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        Save ৳{saved}
                    </span>
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                    <p className="text-[#08aec3] text-xs font-semibold uppercase tracking-wide">{p.categories}</p>
                    <Link to={`/product-details/${p._id}`}>
                        <h3 className="font-semibold text-[#0A2540] hover:text-[#08aec3] transition line-clamp-2">{p.product_name}</h3>
                    </Link>
                    <div className="flex items-center gap-1">
                        <Rating readonly initialValue={p.rating} size={14} allowFraction fillColor="#FACC15" emptyColor="#E5E7EB" SVGstyle={{ display: 'inline-block' }} />
                        <span className="text-gray-400 text-xs">({p.rating})</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[#0A2540] font-black text-lg">৳{final}</span>
                        <span className="text-gray-400 line-through text-sm">৳{orig}</span>
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-1.5 py-0.5 rounded-full">{disc}% OFF</span>
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
                        onClick={() => handleAddToCart(p)}
                        disabled={!inStock}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${
                            isAdded
                                ? 'bg-green-500 text-white'
                                : 'bg-gradient-to-r from-[#08aec3] to-cyan-500 text-white hover:from-cyan-600 hover:to-[#08aec3]'
                        }`}
                    >
                        {isAdded ? <><Zap size={14} /> Added!</> : <><ShoppingCart size={14} /> Add to Cart</>}
                    </button>
                </div>
            </div>
        );
    };

    /* ─── render ─── */
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">

            {/* ══ HERO / COUNTDOWN BANNER ══ */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0A2540] via-[#0d3060] to-[#08aec3] py-16 px-4">
                {/* Decorative blobs */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#08aec3]/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

                {/* Floating fire emojis */}
                <span className="absolute top-6 left-[10%] text-4xl opacity-30 animate-bounce" style={{ animationDelay: '0s' }}>🔥</span>
                <span className="absolute top-10 right-[12%] text-3xl opacity-25 animate-bounce" style={{ animationDelay: '0.5s' }}>🔥</span>
                <span className="absolute bottom-6 left-[25%] text-2xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>⚡</span>
                <span className="absolute bottom-8 right-[30%] text-2xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}>⚡</span>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest backdrop-blur-sm">
                        <Flame size={12} className="animate-pulse" />
                        Flash Sale Event
                        <Flame size={12} className="animate-pulse" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 leading-tight">
                        LIMITED SALE{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                            🔥
                        </span>
                    </h1>
                    <p className="text-white/70 text-base sm:text-lg mb-8 max-w-xl mx-auto">
                        Massive discounts on top products. Don't miss out — these deals won't last!
                    </p>

                    {/* Countdown */}
                    <div className="flex items-center justify-center gap-3 sm:gap-5 mb-8">
                        <Clock size={20} className="text-orange-300 shrink-0 hidden sm:block" />
                        <div className="flex items-center gap-2 sm:gap-3">
                            <CountBlock value={countdown.days}  label="Days"  />
                            <span className="text-white/60 text-2xl font-black -mt-5">:</span>
                            <CountBlock value={countdown.hours} label="Hours" />
                            <span className="text-white/60 text-2xl font-black -mt-5">:</span>
                            <CountBlock value={countdown.mins}  label="Mins"  />
                            <span className="text-white/60 text-2xl font-black -mt-5">:</span>
                            <CountBlock value={countdown.secs}  label="Secs"  />
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                        {[
                            { icon: <Tag size={16} />,      label: 'Sale Items',     value: `${saleProducts.length}+` },
                            { icon: <Zap size={16} />,      label: 'Max Discount',   value: `${Math.max(0, ...saleProducts.map(p => parseFloat(p.discount) || 0))}%` },
                            { icon: <Star size={16} />,     label: 'Total Savings',  value: `৳${Math.round(totalSavings).toLocaleString()}+` },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/80">
                                <div className="text-orange-300">{stat.icon}</div>
                                <div className="text-left">
                                    <div className="text-lg font-black text-white">{stat.value}</div>
                                    <div className="text-xs text-white/60">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ DISCOUNT FILTER TABS ══ */}
            <div className="w-11/12 mx-auto pt-8">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-500 mr-1">Filter by discount:</span>
                    {[
                        { label: 'All Deals',   value: 0  },
                        { label: '10%+ OFF',    value: 10 },
                        { label: '20%+ OFF',    value: 20 },
                        { label: '30%+ OFF',    value: 30 },
                        { label: '50%+ OFF',    value: 50 },
                    ].map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => setMinDiscount(tab.value)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition border ${
                                minDiscount === tab.value
                                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-md'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-600'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Sort + View toggle bar ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">
                        Showing{' '}
                        <span className="font-bold text-[#0A2540]">{saleProducts.length}</span>
                        {' '}sale products
                        {minDiscount > 0 && (
                            <span className="ml-1 text-orange-500 font-semibold">(≥{minDiscount}% off)</span>
                        )}
                    </p>

                    <div className="flex items-center gap-3">
                        {/* Sort */}
                        <div className="relative">
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="pl-3 pr-8 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#08aec3] cursor-pointer appearance-none"
                            >
                                <option value="discount_desc">Biggest Discount</option>
                                <option value="discount_asc">Smallest Discount</option>
                                <option value="price_asc">Price: Low → High</option>
                                <option value="price_desc">Price: High → Low</option>
                                <option value="rating">Top Rated</option>
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

                {/* ── Products Grid / List ── */}
                {isLoading ? (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}>
                        {[...Array(8)].map((_, i) => <ProductSkeleton key={i} list={viewMode === 'list'} />)}
                    </div>
                ) : saleProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-5 text-5xl">🏷️</div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No Sale Products Found</h3>
                        <p className="text-gray-400 text-sm mb-6">Check back soon for exciting limited-time deals!</p>
                        <Link
                            to="/all-product"
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#08aec3] text-white rounded-xl font-medium hover:bg-cyan-600 transition"
                        >
                            Browse All Products <ArrowRight size={16} />
                        </Link>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
                        {saleProducts.map(p => <GridCard key={p._id} p={p} />)}
                    </div>
                ) : (
                    <div className="space-y-4 pb-12">
                        {saleProducts.map(p => <ListCard key={p._id} p={p} />)}
                    </div>
                )}
            </div>

            {/* ── Share Modal ── */}
            {shareProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
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
                                { src: fb,       href: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/product-details/${shareProduct._id}` },
                                { src: twiter,   href: `https://twitter.com/intent/tweet?url=${window.location.origin}/product-details/${shareProduct._id}` },
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

export default LimitedSale;
