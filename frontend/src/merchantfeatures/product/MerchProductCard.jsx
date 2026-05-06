// src/components/products/ProductCard.jsx
import React from 'react';

function ProductCard({ product, handleEditClick}) {
  return (
    <div className="bg-white border-2 border-shadow-lg rounded-lg p-4 text-center ">
      {/* Product Image */}
      <img 
        src={product.image} // Fallback if no image is provided
        // alt={product.pdt_name}
        className="w-40 h-32 object-cover rounded-lg mb-4 mx-auto"  // Image size and styling
      />
      <h2 className="text-sm sm:text-base md:text-lg font-semibold text-center text-gray-800 mb-2 truncate">
        {product.pdt_name}
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-900 mt-2">${product.pdt_price}</p>
      <button 
        onClick={() => handleEditClick(product)}
        className="bg-pink-200 text-gray-800 text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 rounded mt-4 hover:bg-blue-700 transition duration-300">
          Edit Product
      </button>
    </div>
  );
}

export default ProductCard;

