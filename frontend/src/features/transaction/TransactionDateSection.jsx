import React from "react";
import TransactionCard from "./TransactionCard";

const TransactionDateSection = ({ label, items, onTransactionClick}) => {
  return (
    <div>
      <div className="text-lg font-bold text-gray-900 py-5 px-5">
        {label}
      </div>

      <div className="bg-white">
        {items.map((txn, idx) => (
          <TransactionCard
            key={txn.global_txn_id}
            txn={txn}
            isLast={idx === items.length - 1}
            onTransactionClick = {onTransactionClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionDateSection;