// src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function MerchantCard({ merchant }) {
  const isActive = merchant.merchant_active_status
  return (
    <div className =
      {
        `${
          isActive ? 'bg-white': 'bg-gray-200 opacity-60'
        } 
        border-2 border-shadow-lg rounded-lg p-4 text-center`
      }
    >
      <Link to={`/products/${merchant.merchant_id}`}>
       <div className="flex items-center gap-4">
        <img
            src={merchant.image}
            alt={merchant.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full"
          />
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-center text-gray-900">
            {merchant.merchant_brand_name}
          </h2>
        </div>
      </Link>
      
    </div>
  );
}

export default MerchantCard;