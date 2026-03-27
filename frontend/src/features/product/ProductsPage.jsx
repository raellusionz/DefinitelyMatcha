// src/features/products/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
//import productService from './ProductService';
import ProductListing from './ProductListing';  // Import the ProductListing component

const ProductsPage = () => {
  // Dummy product data for testing purposes
  const fetchedProductsData = [
    { merchant_pdt_id: 1, pdt_name: 'Matcha Latte', pdt_category : 'Beverages', pdt_price: 6.50 },
    { merchant_pdt_id: 2, pdt_name: 'Hojicha Latte', pdt_category : 'Beverages', pdt_price: 6.00 },
    { merchant_pdt_id: 3, pdt_name: 'Matcha Cheesecake', pdt_category : 'Desserts', pdt_price: 8.90 },
  ];  
  const [products, setProducts] = useState([])
  const [merchant, setMerchant] = useState({ 
    name: "Rowayne's Matcha",
    reviews: 120,  // Number of reviews
    rating: 4.5  // Star rating

  });
  const [searchQuery, setSearchQuery] = useState(''); // State to store search input
  const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
  const [error, setError] = useState(null); 
  const merchant_id = 1
  useEffect(() => {
    const fetchProducts = async() => {
      if (!merchant_id) return; 
      try {
        // const fetchedProducts = await productService.getSingleMerchantProductsPg(merchant_id);
        // const fetchedProductsData = fetchedProducts.data.singleMerchantProducts
        setProducts(fetchedProductsData)
        console.log(fetchedProductsData)
      } catch(err) {
        setError('Failed to fetch products')
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }; 
    
    fetchProducts(); 
  }, []);

  if(loading) return <div>Loading....</div>
  if(error) return <div>(error)</div>

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.pdt_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
     <div className="bg-[#f3f7f3]">
      <div className="container mx-auto p-4 bg-purple pb-20" >

        {/* Merchant section with padding and margin */}
        <div className="container mx-auto p-3 bg-white rounded-xl shadow-lg mt-1 mb-5"> {/* Gap Between Search Bar and Merchant Bar*/}
          <div className="flex items-center space-x-4"> {/* Align image and name on the same line */}
            <img
              src={merchant.image}
              alt={merchant.name}
              className="w-16 h-16 object-cover rounded-full"
            />
            <div>
              <h1 className="text-3xl text-left text-black font-bold mb-3 mt-3">{merchant.name}</h1>

              {/* Star rating and number of reviews displayed inline */}
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 17.75l-5.42 3.32a1 1 0 0 1-1.56-1.05l1.04-5.91-4.3-4.18a1 1 0 0 1 .56-1.71l5.94-.87 2.63-5.33a1 1 0 0 1 1.81 0l2.63 5.33 5.94 .87a1 1 0 0 1 .56 1.71l-4.3 4.18 1.04 5.91a1 1 0 0 1-1.56 1.05L12 17.75z"/>
                </svg>
                <span className="ml-2 mt-1 text-gray-600">{merchant.rating} ({merchant.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>


      <div className="relative flex items-center mb-4">
          {/* Search Icon */}
          <div className="absolute left-3 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 21l-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>
            </svg>
          </div>
          {/* Search Input */}
          <input
            type="text"
            id="search"
            className="w-full pl-10 pr-16 py-2 border rounded-md text-sm"
            placeholder="Search for Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update state when user types
          />
        </div>

        <ProductListing products={filteredProducts} />  {/* Pass mock products to ProductListing */}
      </div>
    </div>
  );
} 

export default ProductsPage;

//<div className="bg-gradient-to-r from-yellow-100 via-pink-200 to-purple-300">
//bg-gradient-to-r from-green-300 via-teal-400 to-lime-300