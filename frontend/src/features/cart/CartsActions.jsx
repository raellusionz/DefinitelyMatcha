import React, { useEffect, useState } from "react";
import cartService from './cartService'
import transactionService from "../transaction/transactionService";
import orderService from "../../api/orderService"

function CartActions ( {cust_id, onCartReset, selectedMerchantId} ) {
  const [loading, setLoading] = useState(false);  // Loading state for handling fetch delays
  const [error, setError] = useState(null); 
  const [payMethod, setPayMethod] = useState("Credit Card");
  const selectedMerchantIdInt = selectedMerchantId.map(Number);
  const isCheckoutDisabled = loading || selectedMerchantIdInt.length === 0;

  //const cust_id = 1


  const checkingOutCartItems = async() => {
    if (selectedMerchantIdInt.length === 0) {
      setError("Please select at least one merchant to checkout.");
      return;
    }
    try {
      console.log("Customer ID : " , cust_id)
      // const selectedMerchantIdInt = selectedMerchantId.map(Number);
     
      console.log("Merchant ID : " ,selectedMerchantIdInt)
      setLoading(true);
      setError(null);

      for (const merchant_id of selectedMerchantIdInt){
        const fetchedCheckoutCartItems = await cartService.getUserCartCheckOutPg(cust_id, merchant_id)
        const fetchedCheckoutCartItemsAlt = fetchedCheckoutCartItems.data
        const fetchedCheckoutCartItemsData = fetchedCheckoutCartItems.data.singleUserCheckoutCart || [];
        console.log("fetchedCheckoutCartItemsData : ",fetchedCheckoutCartItemsData)

        if (fetchedCheckoutCartItemsData.length === 0) {
          setError("Cart is empty.");
          return;
        }

        console.log("Prepare cust_id : ",cust_id)
        console.log("Prepare merchant_id : ",fetchedCheckoutCartItemsData[0].merchant_id)
        console.log("Prepare total_qty : ",fetchedCheckoutCartItemsAlt.total_pdt_qty)
        console.log("Prepare createTxn : ",fetchedCheckoutCartItemsAlt.total_price)
        console.log("Prepare createTxn : ",payMethod)
        
        const createTransaction = await transactionService.createNewMerchTransactionsPg(
          cust_id, 
          fetchedCheckoutCartItemsData[0].merchant_id,
          fetchedCheckoutCartItemsAlt.total_pdt_qty, 
          fetchedCheckoutCartItemsAlt.total_price, 
          payMethod)

        const createTransactionData = createTransaction.data.newTransaction
        console.log(createTransactionData)

        for (const item of fetchedCheckoutCartItemsData)  {
          console.log("transaction object:", createTransactionData);
          console.log("txn id:", createTransactionData?.merchant_txn_id);
          console.log("item:", item);
        
          const loadOrderItems = await orderService.createSingleOrderItemsPg(
            createTransactionData.merchant_txn_id,
            item.merchant_id,
            item.merchant_pdt_id,
            item.pdt_name,
            item.pdt_price
          )
          console.log("loadOrderItems:", loadOrderItems.data);
        }

        const resetUserCart = await cartService.resetUserCartPg(
          cust_id,
          fetchedCheckoutCartItemsData[0].merchant_id
        )

        if (resetUserCart.status !== 200) {
          console.log("Fail in resetting user's cart");
        }
      }
      await onCartReset();
    } catch (err) {
      console.error(err);
      setError("Checkout failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col sm:flex-col justify-between gap-4 mt-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Payment Method</label>
        <select
          value={payMethod}
          onChange={(e) => setPayMethod(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="PayNow">PayNow</option>
        </select>
      </div>

      <button 
        className={`w-full sm:w-auto px-6 py-3 rounded-lg transition ${
          isCheckoutDisabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
        }`}
        onClick={checkingOutCartItems}
        disabled={isCheckoutDisabled}
      >
        {loading ? "Processing..." : "Check Out"}
      </button>

      {/* <button className="content-center text-gray-500 hover:text-black">
        ← Return to Shop
      </button> */}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default CartActions;




// function CartActions ( {cust_id, total_qty, subtotal, onCartReset, selectedMerchantId} ) {

      // for (const item of fetchedCheckoutCartItemsData) {
      //   //console.log("Checking item merchant:", item.merchant_id);

      //   if (selectedMerchantIdInt.includes(item.merchant_id)) {
      //     console.log("Matched merchant:", item.merchant_id);
      //     console.log("Matched item:", item);
      //   }
      // }
      

      //console.log("Prepare cust_id : ",cust_id)
      // console.log("Prepare merchant_id : ",fetchedCheckoutCartItemsData[0].merchant_id)
      //console.log("Prepare total_qty : ",total_qty)
      // console.log("Prepare createTxn : ",subtotal)
      // console.log("Prepare createTxn : ",payMethod)

      // const createTransaction = await transactionService.createNewMerchTransactionsPg(
      //     cust_id, 
      //     fetchedCheckoutCartItemsData[0].merchant_id,
      //     total_qty, 
      //     subtotal, 
      //     payMethod)

      // const createTransactionData = createTransaction.data.newTransaction
      // console.log(createTransactionData)

      // for (const item of fetchedCheckoutCartItemsData)  {
      //   console.log("transaction object:", createTransactionData);
      //   console.log("txn id:", createTransactionData?.merchant_txn_id);
      //   console.log("item:", item);
      
      //   const loadOrderItems = await orderService.createSingleOrderItemsPg(
      //     createTransactionData.merchant_txn_id,
      //     item.merchant_id,
      //     item.merchant_pdt_id,
      //     item.pdt_name,
      //     item.pdt_price
      //   )
      //   console.log("loadOrderItems:", loadOrderItems.data);
      // }

      // const resetUserCart = await cartService.resetUserCartPg(
      //   cust_id,
      //   fetchedCheckoutCartItemsData[0].merchant_id
      
      // )

      // if (resetUserCart.status === 200) {
      //   console.log("Success");
      //   await onCartReset();
      // } else {
      //   console.log("Fail in resetting user's cart");
      // }