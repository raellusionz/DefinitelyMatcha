import React from "react";

function CartsItem ({item, updateQuantity, removeItem}) {
    return (
        /* LEFT */ 
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded shrink-0"
                />
                <div className="min-w-0">
                    <h3 
                        className="text-left font-semibold">{item.pdt_name}
                    </h3>
                </div>
            </div>
            <div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto">
                {/*<p className="text-md w-16 text-right">${item.pdt_price.toFixed(2)}</p>*/}
                
                {/* Quantity */}
                <div className="flex items-center border rounded-lg overflow-hidden shrink-0">
                    <button
                        onClick={() => updateQuantity(item.merchant_pdt_id, "decrease")}
                        className="px-3 py-1 hover:bg-gray-200"
                    >
                        -
                    </button>
                    
                    <span className="w-10 text-center tabular-nums">
                        {item.qty}
                    </span>
                    
                    <button
                        onClick={() => updateQuantity(item.merchant_pdt_id, "increase")}
                        className="px-3 py-1 hover:bg-gray-200"
                    >
                        +
                    </button>
                </div>

                {/* Total */}
                <p className="font-semibold w-20 text-right tabular-nums">
                    ${(item.pdt_price * item.qty).toFixed(2)}
                </p>

                <button
                onClick={() => removeItem(item.merchant_pdt_id)}
                className="text-red-500 text-sm w-16 text-right"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartsItem