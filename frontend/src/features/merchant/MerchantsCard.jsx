// src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { haversineDistance } from '../../utils/distance';

function Icon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}

function MerchantCard({ merchant ,userLocation }) {
  const isActive = merchant.merchant_active_status

  const distance =
    userLocation && merchant.merchant_lat && merchant.merchant_lng
      ? haversineDistance(
          userLocation.lat,        // from GeolocationComponent
          userLocation.lng,        // from GeolocationComponent
          merchant.merchant_lat,   // needs to exist in your DB
          merchant.merchant_lng
        ).toFixed(1)
      : null;

  return (
    <div className =
      {
        `${
          isActive ? 'bg-white': 'bg-gray-200 opacity-60'
        } 
        border-2 border-shadow-lg rounded-lg text-center group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-emerald-100/10 bg-[#f0eee9] shadow-sm transition-all ${isActive ? 'hover:shadow-md' : ''}`
      }
    >
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
                  font-size: 14px;
              }
          `}
      </style>

      <Link 
        to={isActive ? `/products/${merchant.merchant_id}`:0}
        onClick={(e) => {
          if (!isActive) e.preventDefault();
        }}
      >
        {/* Image */}
        <div className="h-48 w-full overflow-hidden">
            <img
              src={
                  merchant.image ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCUeCqpN8qhan0Z8SyNo_ld45XCft5_SfG-bZB9GdWB16vsvErg3xu4G90gLpL_XwEIijIr8J0BzcopyOd4D5xsxAtDdry_7Zt_rGfq7WiE7LCW4POarBQbhKVhYR0WKUuQm7TI1_8aOdxR_X9w5A1z28KTd5sZ7ujFKGZ9eY-JEaQfhcGpvL7RCCIZ2nSEJ3QUHIQhbv5-oKBQEwihKdb9h90GHMjhjmax0w31IkUMfHOneeXKa_KG9_fFLaFtF2Z7JsFx6cRUYO1N"
              }
              alt={merchant.merchant_brand_name || "Merchant image"}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              // src={merchant.image}
              // alt={merchant.name}
              // className="w-full h-32 sm:h-40 object-cover rounded-2xl mb-3"
            />
          </div>

        {/* Text section */}
        <div className=" p-2 flex flex-1 flex-col items-start text-left">
          
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
            {merchant.merchant_brand_name}
          </h2>

          <div className="mb-1 flex items-center gap-1 text-sm text-gray-700">
            <span>4.5</span>

            <div className="flex items-center text-[#372909]">
              {["star", "star", "star", "star", "star_half"].map((star, index) => (
                <Icon key={index} className="filled-icon ">
                  {star}
                </Icon>
              ))}
            </div>

            <span>(120)</span>
          </div>

          <p className="text-xs text-gray-600">
            {distance !== null ? `${distance} km away` : 'Enable location to see distance'}
          </p>

        </div>
      </Link>
    </div>
  );
}

export default MerchantCard;