import React from 'react'
import CartsItem from './CartsItem'

function CartsList ({groupedByMerchant, selectedMerchantId, toggleMerchant, updateQuantity, removeItem}) {
    //console.log("Cart List:", cartItems); // Log the cart items to see what is passed

    return (
        <div className = "space-y-4">
            {Object.entries(groupedByMerchant).map(([merchant_id, { merchant_brand_name, items }]) => (
                <div key={merchant_id}>
                    <div className="flex items-center justify-between px-2 pt-2 pb-2">
                        <h2 className="text-left text-lg font-semibold text-[#6f667f] underline decoration-1 px-4 pt-6 pb-2">
                            {merchant_brand_name}
                        </h2>

                        <label className="flex items-center gap-2 cursor-pointer text-[#6f667f]">

                            <input
                                type="checkbox"
                                checked={selectedMerchantId.includes(String(merchant_id))}
                                onChange={() => toggleMerchant(merchant_id)}
                                className="w-5 h-5 accent-[#6f667f]"
                            />

                            {/* <span className="text-sm">
                                {selectedMerchantId === merchant_id ? "Selected" : "Select"}
                            </span> */}
                        </label>
                    </div>
                    <div className="space-y-2">
                            {items.map((item) => (
                                <CartsItem
                                    key={`${item.merchant_pdt_id}-${merchant_id}`}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartsList