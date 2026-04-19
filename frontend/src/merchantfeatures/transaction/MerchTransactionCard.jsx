//L3
import React from "react";
import transactionSupportLogos from "../transaction/MerchTransactionIcons";
import { formatTime } from "./MerchTransactionUtils";

const { MastercardIcon, PaynowLogo, MatchaIcon } = transactionSupportLogos;

const TransactionCard = ({ txn, isLast , onTransactionClick}) => {
  const isPaynow = txn.pay_method === "Paynow";

  return (
    <div

      onClick={() => onTransactionClick(txn)}
      className={`flex items-center justify-between py-4 px-5 ${
        isLast ? "" : "border-b border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <MatchaIcon purple={isPaynow} />

        <div className="min-w-0">
          <div className="font-bold text-sm text-gray-900 mb-1">
            {txn.cust_name}
          </div>

          {isPaynow ? (
            <div className="flex items-center gap-1">
              <PaynowLogo />
              <span className="text-purple-600 text-xs">•</span>
              <span className="text-xs text-purple-600">
                {txn.paynow_ref || formatTime(txn.date)}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <MastercardIcon />
              <span className="text-xs text-gray-500">Credit Card</span>
            </div>
         )}
        </div>
      </div>

      <div className="text-right flex-shrink-0 ml-4">
        <div className="font-bold text-gray-900">${txn.amt}</div>
        <div className="text-xs text-gray-500">{formatTime(txn.date)}</div>
      </div>
    </div>
  );
};

export default TransactionCard



// {isPaynow ? (
//             <div className="flex items-center gap-1">
//               <PaynowLogo />
//               <span className="text-purple-600 text-xs">•</span>
//               <span className="text-xs text-purple-600">
//                 {txn.paynow_ref || formatTime(txn.date)}
//               </span>
//             </div>
//           ) : (
//             <div className="flex items-center gap-1">
//               <MastercardIcon />
//               <span className="text-xs text-gray-500">Credit Card</span>
//             </div>
//           )}