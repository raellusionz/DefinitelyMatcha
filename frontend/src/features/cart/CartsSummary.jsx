import React from "react";

function CartsSummary({ subtotal }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between text-lg font-semibold">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)} SGD</span>
      </div>
    </div>
  );
}

export default CartsSummary;