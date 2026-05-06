// src/components/products/MerchantListing.jsx
import React, { useEffect, useState } from 'react';
import MerchantCard from './MerchantsCard';  // Import MerchantCard to display each product

function MerchantListing({ merchants, userLocation }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {merchants.length > 0 ? (
            merchants.map((merchant) => (
            <div key={merchant.merchant_id} className="col-span-1">
                <MerchantCard merchant={merchant} 
                userLocation={userLocation}
                />  {/* Render MerchantCard for each product */}
            </div>
            ))
        ) : (
            <div className="col-span-full text-center">No Merchants available</div>
        )}
    </div>
    
  );
}

export default MerchantListing;
// md:grid-cols-3 lg:grid-cols-4 
