import React, {useState} from 'react'
import CartsList from './CartsList'
import CartsActions from './CartsActions'
import CartsSummary from './CartsSummary'
import CartsNote from './CartsNote'


const CartCheckOutPage = () => {
  
  const[cartItems, setCartItems] = useState([
    { merchant_pdt_id: 1, pdt_name: 'Matcha Latte', pdt_price: 6.50, qty : 2},
    { merchant_pdt_id: 2, pdt_name: 'Hojicha Latte', pdt_price: 6.00, qty : 1},
    { merchant_pdt_id: 3, pdt_name: 'Matcha Cheesecake', pdt_price: 8.90, qty : 2 },
  ]);  


  const updateQuantiy = (merchant_pdt_id, action) => {
    setCartItems((prev) => 
      prev.map((item) =>
        item.merchant_pdt_id === merchant_pdt_id
          ? {
            ...item,
            qty: 
              action === "increase"
              ? item.qty + 1
              : Math.max(1, item.qty - 1) 
          }
        : item
      )
    );
  }

  const removeItem = (merchant_pdt_id) => {
    setCartItems((prev) => prev.filter((item) => item.merchant_pdt_id!== merchant_pdt_id))

  }


  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.pdt_price * item.qty,
    0
  );
    

  return (
    <div className="min-h-screen bg-[#f3f7f3] px-4 sm:px-8 py-6 pb-20">
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 mt-1">
        Your Cart 🍵
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CartsList
            cartItems = {cartItems}
            updateQuantity = {updateQuantiy}
            removeItem = {removeItem}
          />
         </div>
          {/* RIGHT */}
        <div className="space-y-4">
          <CartsSummary subtotal={subtotal} />
          <CartsNote />
          <CartsActions />
        </div>
       
      </div>
    </div>
  );




}

export default CartCheckOutPage;