// src/features/products/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import productService from './ProductService';
import ProductListing from './ProductListing';  // Import the ProductListing component

const ProductsPage = () => {
  // Dummy product data for testing purposes
  const fetchedProductsData = [
    { merchant_pdt_id: 1, pdt_name: 'Matcha Latte', pdt_category : 'Beverages', pdt_price: 6.50 },
    { merchant_pdt_id: 2, pdt_name: 'Hojicha Latte', pdt_category : 'Beverages', pdt_price: 6.00 },
    { merchant_pdt_id: 3, pdt_name: 'Matcha Cheesecake', pdt_category : 'Desserts', pdt_price: 8.90 },
  ];  
  const [products, setProducts] = useState([])
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


  return (
     <div className="bg-gradient-to-r from-green-300 via-teal-400 to-lime-300 ">
      <div className="container mx-auto p-4 bg-purple">
        <h1 className="text-3xl text-black text-decoration-line: underline font-bold text-center mb-5">Products</h1>
        <ProductListing products={products} />  {/* Pass mock products to ProductListing */}
      </div>
      </div>
  );
} 

export default ProductsPage;

//<div className="bg-gradient-to-r from-yellow-100 via-pink-200 to-purple-300">