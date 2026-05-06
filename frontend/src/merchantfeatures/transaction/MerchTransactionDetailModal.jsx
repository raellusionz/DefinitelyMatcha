//L4
import React, { useState, useEffect, use } from "react";
import { formatTime } from "./MerchTransactionUtils";
import transactionService from "./MerchTransactionService";

const TransactionDetailModal = ({ isOpen, transaction, onClose,onStatusUpdate }) => {
    const [activeTab, setActiveTab] = useState("receipt")
    const [orderItems, setOrderItems] = useState([])
    const [itemsLoading, setItemsLoading] = useState(false)
    const [itemsError, setItemsError] = useState(null)
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);
    const [txnStatus, setTxnStatus] = useState(transaction?.txn_status || 'Completed');

    useEffect(() => {
      if (transaction) setTxnStatus(transaction.txn_status || 'completed');
    }, [transaction]);

    useEffect(() => {
        if (!isOpen || !transaction) {
            setActiveTab("receipt");
            setOrderItems([]);
            setItemsError(null);
            setItemsLoading(false);
            return;
        }

        const fetchOrderItems = async () => {
            try {
                setItemsLoading(true);
                setItemsError(null);

                const response = await transactionService.getSingleOrderItemsPg(
                    transaction.merchant_id,
                    transaction.merchant_txn_id,
                );
                console.log(response)

                setOrderItems(response.data.singleOrderItems || []);
                
            } catch (err) {
                console.error("Failed to fetch order items:", err);
                setItemsError("Failed to load items.");
            } finally {
                setItemsLoading(false);
            }
        };

        fetchOrderItems();
    }, [isOpen, transaction]);


    if (!isOpen || !transaction) return null;

    console.log('txnStatus:', txnStatus, 'transaction.txn_status:', transaction?.txn_status)

    
    const handleTransactionRefCancelAction = async(action) => {

      // if (action === 'Cancelled') {
      //   actionLabel = 'Cancelled';
      // } else {
      //   actionLabel = 'Refunded';
      // }

      const actionLabel = action === 'Cancelled' ? 'Cancelled' : 'Refunded'
      if (!window.confirm(`${actionLabel} this transaction?`)) 
        return;

      try {
        console.log("merchant_id:",transaction.merchant_id)
        console.log("merchant_txn_id",transaction.merchant_txn_id)
        console.log("actionLabel",  actionLabel)

        setActionLoading(true)
        setActionError(null)
        if (action === 'Cancelled') {
          await transactionService.updateTransactionStatusPg (
            transaction.merchant_id,
            transaction.merchant_txn_id,
            actionLabel
          )
        } else if (action === 'Refunded') {
            await transactionService.updateTransactionStatusPg (
            transaction.merchant_id,
            transaction.merchant_txn_id,
            actionLabel
          )
        }
        setTxnStatus(action);
        onStatusUpdate(transaction.merchant_txn_id, action); // 👈 add this line
      } catch(err){
        setActionError(`Failed to ${actionLabel.toLowerCase()} transaction.`);
      } finally {
        setActionLoading(false);
      }
      
    }

    const isPaynow = transaction.pay_method === "Paynow";

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-xl p-6 mx-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Transaction Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500"
          >
            Close
          </button>
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          <button
            type="button"
            onClick={() => setActiveTab("receipt")}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              activeTab === "receipt"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Receipt
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("items")}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              activeTab === "items"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Items
          </button>
        </div>

        {activeTab === "receipt" && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-semibold text-gray-900">
                {transaction.cust_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-semibold text-gray-900">
                ${transaction.amt}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-semibold text-gray-900">
                {transaction.pay_method}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Transaction Time</p>
              <p className="font-semibold text-gray-900">
                {formatTime(transaction.date)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Merchant Transaction ID</p>
              <p className="font-semibold text-gray-900">
                {transaction.merchant_txn_id}
              </p>
            </div>

            {isPaynow && transaction.paynow_ref && (
              <div>
                <p className="text-sm text-gray-500">PayNow Reference</p>
                <p className="font-semibold text-gray-900">
                  {transaction.paynow_ref}
                </p>
              </div>
            )}

            {/* Error */}
            {actionError && <p className="text-sm text-red-500">{actionError}</p>}

            {/* Action buttons — only show if still completed */}
            {txnStatus === 'Completed' && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleTransactionRefCancelAction('Cancelled')}
                  disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleTransactionRefCancelAction('Refunded')}
                  disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl border border-amber-200 text-amber-600 text-sm font-medium hover:bg-amber-50 disabled:opacity-50"
                >
                  Refund
                </button>
              </div>
            )}

          </div>
        )}

        {activeTab === "items" && (
          <div>
            {itemsLoading ? (
              <p className="text-sm text-gray-500">Loading items...</p>
            ) : itemsError ? (
              <p className="text-sm text-red-500">{itemsError}</p>
            ) : orderItems.length === 0 ? (
              <p className="text-sm text-gray-500">No items found.</p>
            ) : (
              <div className="space-y-3">
                {/* Header */}
                <div className="grid grid-cols-3 text-xs font-semibold text-gray-500 pb-2 border-b">
                    <span>Item</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Price</span>
                </div>

                {/* Rows */}
                {orderItems.map((item) => (
                    <div
                    key={item.global_order_id ?? `${item.merchant_pdt_id}-${item.pdt_name}`}
                    className="grid grid-cols-3 items-center py-2 border-b border-gray-100"
                    >
                    <span className="text-gray-600 font-medium truncate">
                        {item.pdt_name}
                    </span>

                    <span className="text-center text-gray-600">
                        {item.pdt_qty ?? 1}
                    </span>

                    <span className="text-right font-semibold text-gray-900">
                        ${item.subtotal ?? item.pdt_price}
                    </span>
                    </div>
                ))}
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetailModal;