import React from 'react'
import CartsItem from './CartsItem'

function CartsList ({cartItems, updateQuantity, removeItem}) {
    //console.log("Cart List:", cartItems); // Log the cart items to see what is passed

    return (
        <div className = "space y-4">
            {cartItems.map((item) => (
                <CartsItem
                    key={`${item.merchant_pdt_id}-${item.merchant_id}`} 
                    item = {item}
                    updateQuantity = {updateQuantity}
                    removeItem = {removeItem}
                />

            ))}

        </div>
    )
}

export default CartsList