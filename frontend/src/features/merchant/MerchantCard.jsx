// src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function MerchantCard({ merchant }) {
  return (
    <div className="bg-teal-400 border-2 border-shadow-lg rounded-lg p-4 text-center ">
      <h2 className="text-l font-semibold">{merchant.merchant_name}</h2>
    </div>
  );
}

export default MerchantCard;