// src/components/products/ProductCard.jsx
import React from "react";

function Icon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}

function ProductCard({ product, addItemToCart }) {
  return (
    <div className="group flex h-full cursor-pointer flex-row overflow-hidden rounded-2xl border border-emerald-100/10 bg-[#f0eee9] shadow-sm transition-all hover:shadow-md">
      {/* Image side */}
      <div className="w-2/5 shrink-0 overflow-hidden">
        <img
          src={
            product.image ||
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCUeCqpN8qhan0Z8SyNo_ld45XCft5_SfG-bZB9GdWB16vsvErg3xu4G90gLpL_XwEIijIr8J0BzcopyOd4D5xsxAtDdry_7Zt_rGfq7WiE7LCW4POarBQbhKVhYR0WKUuQm7TI1_8aOdxR_X9w5A1z28KTd5sZ7ujFKGZ9eY-JEaQfhcGpvL7RCCIZ2nSEJ3QUHIQhbv5-oKBQEwihKdb9h90GHMjhjmax0w31IkUMfHOneeXKa_KG9_fFLaFtF2Z7JsFx6cRUYO1N"
          }
          alt={product.pdt_name || "Premium Heritage Matcha"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Text side */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
        <span className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#406840] sm:text-xs">
          Editor&apos;s Choice
        </span>

        <h3 className="mb-2 truncate font-['Noto_Serif'] text-lg font-medium leading-tight text-[#173124] sm:mb-4 sm:text-2xl">
          {product.pdt_name}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm leading-5 text-[#424844] sm:mb-6 sm:line-clamp-3">
          {product.pdt_description ||
            "The pinnacle of our harvest. Hand-picked during the first flush of spring in Uji, Kyoto. Known for its intense jade color and creamy texture."}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="font-['Noto_Serif'] text-lg font-medium text-[#173124] sm:text-2xl">
            ${product.pdt_price || "0.00"}
          </span>

          <button
            type="button"
            onClick={() => addItemToCart(product.merchant_pdt_id, "increase")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#173124] text-white transition-transform hover:scale-105 sm:h-12 sm:w-12"
            aria-label={`Add ${product.pdt_name} to cart`}
          >
            <Icon>add_shopping_cart</Icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;