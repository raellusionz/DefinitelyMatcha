// src/components/products/ProductListing.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';  // Import ProductCard to display each product

function ProductListing({ products, addItemToCart }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {products.length > 0 ? (
            products.map((product) => (
            <div key={product.merchant_pdt_id} className="col-span-1">
                <ProductCard 
                product={product} 
                addItemToCart = {addItemToCart}
                />  {/* Render ProductCard for each product */}
            </div>
            ))
        ) : (
            <div className="col-span-full text-center">No products available</div>
        )}
    </div>
    
  );
}

export default ProductListing;

// md:grid-cols-3 lg:grid-cols-4 
