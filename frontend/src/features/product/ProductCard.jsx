// src/components/products/ProductCard.jsx
import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="bg-teal-400 border-2 border-shadow-lg rounded-lg p-4 text-center ">
      <h2 className="text-l font-semibold">{product.pdt_name}</h2>
      <p className="text-gray-900 mt-2">${product.pdt_price}</p>
      <button className="bg-pink-200  text-gray-800 text-lg py-3 px-4 rounded mt-4 hover:bg-blue-700 transition duration-300">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;