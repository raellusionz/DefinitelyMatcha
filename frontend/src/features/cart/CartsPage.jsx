import React, { useEffect, useState } from 'react';
import CartsList from './CartsList'
import CartsActions from './CartsActions'
import CartsSummary from './CartsSummary'
import CartsNote from './CartsNote'
import { useUser } from '../../context/userContext';  // Adjust according to folder structure
import cartService from './cartService'


const CartCheckOutPage = () => {
  

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
  const [error, setError] = useState(null); 
  const { userId: cust_id } = useUser();
  // const cust_id = 1

 
  const fetchCartItems = async() => {
    try {
      console.log(cust_id)
      const fetchedCart = await cartService.getUserCartPg(cust_id);
      //console.log(fetchedCart)
      const fetchedCartData = fetchedCart.data.singleUserCart
      console.log("Fetched Cart Data:", fetchedCartData); 
    
      // Set the merged cart items
      setCartItems(fetchedCartData);

    } catch(err) {
      setError('Failed to fetch products')
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchCartItems();
  }, [cust_id]);

  const updateQuantiy = async (merchant_pdt_id, action) => {
    // First, update the state
    setCartItems((prev) => {
      return prev.map((item) =>
        item.merchant_pdt_id === merchant_pdt_id
          ? {
              ...item,
              qty:
                action === "increase"
                  ? item.qty + 1
                  : Math.max(1, item.qty - 1), // Ensure quantity doesn't go below 1
            }
          : item
      );
    });

    // Now, make the API call to update the backend
    const updatedItem = cartItems.find(item => item.merchant_pdt_id === merchant_pdt_id);

    if (action === "increase") {
      // Ensure only one API call is triggered
      await cartService.addItemToCartPg(
        cust_id,
        updatedItem.merchant_id,
        updatedItem.merchant_pdt_id,
        updatedItem.pdt_name,
        updatedItem.pdt_price
      );
    }

    if (action === "decrease") {
      // Ensure only one API call is triggered
      await cartService.reduceQuantityCartPg(
        cust_id,
        updatedItem.merchant_id,
        updatedItem.merchant_pdt_id
      );
    }
  };


  const removeItem = async (merchant_pdt_id) => {
    setCartItems((prev) => prev.filter((item) => item.merchant_pdt_id !== merchant_pdt_id));

    const itemToRemove = cartItems.find(item => item.merchant_pdt_id === merchant_pdt_id);
    
    if (itemToRemove) {
      await cartService.removeCartItemPg(
        cust_id,
        itemToRemove.merchant_id,
        itemToRemove.merchant_pdt_id
      );
    }
  };


  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.pdt_price * item.qty,
    0
  );

  const total_qty = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );
    

  return (
    <div className="mt-2 min-h-screen bg-white px-4 sm:px-8 py-6 pb-20">
      
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
          <CartsActions 
            total_qty={total_qty} 
            subtotal={subtotal} 
            onCartReset={fetchCartItems}
          />
        </div>
       
      </div>
    </div>
  );


}

export default CartCheckOutPage;