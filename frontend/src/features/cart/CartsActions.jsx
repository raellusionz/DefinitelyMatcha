import React from "react";

function CartActions() {
  return (
    <div className="flex flex-col sm:flex-col justify-between gap-4 mt-6">

      <button className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
        Check Out
      </button>
      <button className="content-center text-gray-500 hover:text-black">
        ← Return to Shop
      </button>
    </div>
  );
}

export default CartActions;