// src/features/products/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get merchant_id from the URL
import productService from './productService';
import merchantsService from '../merchant/merchantsService'
import ProductListing from './ProductListing';  // Import the ProductListing component
import cartService from '../cart/cartService';
function Icon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}

const ProductsPage = () => {
    const filters = ["Beverages", "Dessert", "Culinary", "Tools"];
    //const merchant_id = 1
    const cust_id = 1
    const {merchant_id} = useParams()
    const [products, setProducts] = useState([])
    const [merchant, setMerchant] = useState({ 
        name: "",
        reviews: "",
        rating: "",
        desc : ""
        // reviews: 4.5,  // Number of reviews
        // rating: 120, // Star rating
        // desc : `Authentic ceremonial grade matcha sourced directly from Uji,
        //                     Kyoto. Traditional craftsmanship meeting modern rituals. Every
        //                     leaf is stone-ground to preserve the vibrant chlorophyll and
        //                     delicate umami profile of the harvest.`

    });
    const [searchQuery, setSearchQuery] = useState(''); // State to store search input
    const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
    const [error, setError] = useState(null); 

    useEffect(() => {
        //console.log(merchant_id)
        const fetchProducts = async() => {
        if (!merchant_id) return; 
        setLoading(true)
        try {
            const fetchedProducts = await productService.getSingleMerchantProductsPg(merchant_id);
            //console.log(fetchedProducts)
            const fetchedProductsData = fetchedProducts.data.singleMerchantProducts
            // console.log(fetchedProductsData)
            setProducts(fetchedProductsData)
            // console.log(fetchedProductsData)
        } catch(err) {
            setError('Failed to fetch products')
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
        }; 

        const fetchMerchantName = async() => {
        if (!merchant_id) return; 
        setLoading(true)
        try {
            const fetchedMerchant = await merchantsService.getOneMerchantPg(merchant_id);
            console.log(fetchedMerchant)
            const fetchedMerchantData = fetchedMerchant.data.singleMerchantInfo
            console.log(fetchedMerchantData.merchant_brand_name)
            setMerchant({
                name: fetchedMerchantData.merchant_brand_name,
                reviews: fetchedMerchantData.merchant_ratings || 4.5,  // Number of reviews
                rating: fetchedMerchantData.merchant_reviews || 120, // Star rating
                desc : fetchedMerchantData.merchant_desc
            });
            // console.log(fetchedProductsData)
        } catch(err) {
            setError('Failed to fetch products')
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
        }; 
        fetchMerchantName()
        fetchProducts(); 
    }, []);

    if(loading) return (
        <div className="flex flex-col items-center
            justify-center h-48 gap-3">
        <div className="w-9 h-9 rounded-full
            border-[2.5px] border-transparent
            border-t-gray-900 border-b-gray-200
            animate-spin" />
        <p className="text-sm text-gray-400">
            Loading Products...
        </p>
        </div>
    )
    if(error) return <div>(error)</div>

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.pdt_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addItemToCart = async (merchant_pdt_id, action) => {

        const itemToAdd = products.find(item => item.merchant_pdt_id === merchant_pdt_id)

        if(itemToAdd) {
            await cartService.addItemToCartPg(
                cust_id,
                merchant_id, 
                itemToAdd.merchant_pdt_id, 
                itemToAdd.pdt_name, 
                itemToAdd.pdt_price

            )
        }
    }

    return (
        <div className="bg-white pb-16">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

                    .material-symbols-outlined {
                        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                        display: inline-block;
                        line-height: 1;
                    }

                    .filled-icon {
                        font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    }
                `}
            </style>
            
                <div className="relative h-[353px] w-full md:h-[442px]">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW3wGeiSVNrL0ODJW3bwR7FG4zUwFrOOQ2IgmrVBCLQKXr2QYHXyuemzfn_wnohIpjaY879iYtwPCJZl8o6q88P2jLlIleXgNwYP2g2Jy_oML70tiYENF8-_5Ybqhm4nc_EszgQzV1I9MhAOKTKHSS5WjrKQ-d4DP3F0Y5rO_tJn8x51zGvauYtW14XB1QvbJ6r-ni6VUjkcJJwFSmiXqZ7sFpmQBT2TW9AeU35hupZfFqwmEzGMttitP8mw4bQ5ISmY_3u1sqCzit"
                        alt="Kyoto Tea House Interior"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[#173124]/10" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 md:px-10">
                    <div className="-mt-16 flex flex-col items-start gap-6 md:-mt-24 md:flex-row md:items-center">
                        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-[#fbf9f4] shadow-xl md:h-48 md:w-48">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhS4LP8GyXgXm_-a5ph6BuU1o9VqHS05ywgkQ057VU71vNTF7qM_KUKZ6O_i2PePxDao_bP5gGEiw7qGABNKi291ubmYaJvoDPWclo_S2I_oijL-U9XD_EHm82B-EJGMaSb-TI2qN3AHCGfjpaWraYuCafuHjdhd-k2dzhSRTXynJ1pZw5ara44zg06XDQivUtZiqCHK2kDOFpErSYpdHdtSV8pcxPDHgpISMGYMqwvFcC2RmII86Dt7bQtjrPrbipxIiOoR-Zv0NQ"
                                alt="Merchant Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex-1 py-12 pt-2 pb-4 md:pt-28 md:pb-6">
                            <h1 className="text-left font-['Noto_Serif'] text-4xl font-semibold leading-tight tracking-tight text-[#173124] md:text-5xl">
                                {merchant.name}
                            </h1>

                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex text-[#372909]">
                                {["star", "star", "star", "star", "star_half"].map(
                                    (star, index) => (
                                    <Icon key={index} className="filled-icon text-[18px]">
                                        {star}
                                    </Icon>
                                    )
                                )}
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-widest text-[#424844]">
                                    {merchant.reviews} ({merchant.rating} reviews)
                                </span>
                            </div>
                        </div>

                        
                    </div>

                    <div className="mt-2 ">
                        <p className="text-lg leading-relaxed text-[#424844]">
                            {merchant.desc}
                        </p>
                    </div>
                </div>
                <section className="px-4 mt-4 md:px-10 mb-12">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div className="relative w-full">
                            {/* Search Icon */}
                            <div 
                            // className="absolute left-3 text-gray-500"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 21l-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>
                                </svg>
                            </div>
                            {/* Search Input */}
                            <input
                                type="text"
                                id="search"
                                // className="w-full pl-10 pr-16 py-2 border rounded-md text-sm"
                                className="w-full rounded-xl border-none bg-[#f0eee9] py-3 pl-12 pr-4 text-[#1b1c19] placeholder:text-[#c2c8c2] focus:ring-2 focus:ring-[#173124]/20"
                                placeholder="Search for Products"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update state when user types
                            />
                        </div>
                        
                    </div>

                    <div className="flex md:justify-center relative w-full overflow-x-auto py-3 gap-3">
                            {filters.map((filter, index) => (
                                <button
                                key={filter}
                                className={`whitespace-nowrap rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                                    index === 0
                                    ? "bg-[#173124] text-white"
                                    : "bg-[#f0eee9] text-[#424844] hover:bg-[#e4e2dd]"
                                }`}
                                >
                                {filter}
                                </button>
                            ))}
                    </div>

                    <ProductListing 
                        products={filteredProducts}
                        addItemToCart = {addItemToCart}
                    />  {/* Pass mock products to ProductListing */}
                </section>


            </div>
        
    )
} 

export default ProductsPage;