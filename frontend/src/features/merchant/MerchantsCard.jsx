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
        border-2 border-shadow-lg rounded-lg p-3 text-center`
      }
    >
      <Link to={`/products/${merchant.merchant_id}`}>
       {/* Image */}
        <img
          src={merchant.image}
          alt={merchant.name}
          className="w-full h-32 sm:h-40 object-cover rounded-2xl mb-3"
        />

        {/* Text section */}
        <div className="flex flex-col items-start text-left">
          
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
            {merchant.merchant_brand_name}
          </h2>

          <p className="text-xs text-gray-700 mb-1">
            ⭐ 4.5 Star (120)
          </p>

          <p className="text-xs text-gray-600">
            Distance to You : 16 KM
          </p>

        </div>
      </Link>
    </div>
  );
}

export default MerchantCard;