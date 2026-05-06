// src/components/products/ProductCard.jsx
import React from 'react';

function Icon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}

function ProductCard({ product, addItemToCart}) {
  return (
    <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-emerald-100/10 bg-[#f0eee9] shadow-sm transition-all hover:shadow-md">
      <div className="h-56 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUeCqpN8qhan0Z8SyNo_ld45XCft5_SfG-bZB9GdWB16vsvErg3xu4G90gLpL_XwEIijIr8J0BzcopyOd4D5xsxAtDdry_7Zt_rGfq7WiE7LCW4POarBQbhKVhYR0WKUuQm7TI1_8aOdxR_X9w5A1z28KTd5sZ7ujFKGZ9eY-JEaQfhcGpvL7RCCIZ2nSEJ3QUHIQhbv5-oKBQEwihKdb9h90GHMjhjmax0w31IkUMfHOneeXKa_KG9_fFLaFtF2Z7JsFx6cRUYO1N"
          alt="Premium Heritage Matcha"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center p-6">
        <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#406840]">
          Editor&apos;s Choice
        </span>

        <h3 className="mb-4 font-['Noto_Serif'] text-2xl font-medium text-[#173124]">
            {product.pdt_name}
        </h3>

        <p className="mb-6 text-[#424844]">
          The pinnacle of our harvest. Hand-picked during the first flush
          of spring in Uji, Kyoto. Known for its intense jade color and
          creamy texture.
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-['Noto_Serif'] text-2xl font-medium text-[#173124]">
            $45.00
          </span>

          <button 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#173124] text-white transition-transform hover:scale-105"
            
            onClick={() => addItemToCart(product.merchant_pdt_id, 'increase')}
            
          >
            <Icon>add_shopping_cart</Icon>
          </button>

        </div>
      </div>
    </div>
    
  );
}

export default ProductCard;


// <div className="group overflow-hidden border border-emerald-100/10 bg-[#f0eee9] border-shadow-lg rounded-2xl text-center ">
    //   <img
    //       src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUeCqpN8qhan0Z8SyNo_ld45XCft5_SfG-bZB9GdWB16vsvErg3xu4G90gLpL_XwEIijIr8J0BzcopyOd4D5xsxAtDdry_7Zt_rGfq7WiE7LCW4POarBQbhKVhYR0WKUuQm7TI1_8aOdxR_X9w5A1z28KTd5sZ7ujFKGZ9eY-JEaQfhcGpvL7RCCIZ2nSEJ3QUHIQhbv5-oKBQEwihKdb9h90GHMjhjmax0w31IkUMfHOneeXKa_KG9_fFLaFtF2Z7JsFx6cRUYO1N"
    //       alt="Premium Heritage Matcha"
    //       className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    //       // src={product.image} // Fallback if no image is provided
    //   />


    //   <h2 className="text-sm sm:text-base md:text-lg font-semibold text-center text-gray-800 mb-2 truncate">
    //     {product.pdt_name}
    //   </h2>
    //   <p className="text-sm sm:text-base md:text-lg text-gray-900 mt-2">${product.pdt_price}</p>
    //   <button 
    //   onClick={() => addItemToCart(product.merchant_pdt_id, 'increase')}
    //   className="bg-pink-200 text-gray-800 text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 rounded mt-4 hover:bg-blue-700 transition duration-300">
    //     Add to Cart
    //   </button>
    // </div>