import React, { useState, useEffect } from "react";
import transactionService from "./transactionService";
import transactionSupportLogos from "../transaction/TransactionIcons";
// import TransactionFilter from "../transaction/TransactionFilter";

const { MastercardIcon, PaynowLogo, MatchaIcon } = transactionSupportLogos;
// import { useUser } from "../../context/userContext";
// Transaction data
const fetchSingleCustomerTransactionsData = [
  {
    global_txn_id: 1,
    merchant_txn_id: 1,
    amt: "110.00",
    date: "2026-03-28T07:56:53.961Z",
    pay_method: "Credit Card",
    merchant_name: "DefinitelyMatcha",
    pdt_name: "Matcha Product",
    pdt_qty: 10,
  },
  {
    global_txn_id: 2,
    merchant_txn_id: 2,
    amt: "50.00",
    date: "2026-03-28T08:08:56.097Z",
    pay_method: "Credit Card",
    merchant_name: "DefinitelyMatcha",
    pdt_name: "Matcha Product",
    pdt_qty: 10,
  },
  {
    global_txn_id: 3,
    merchant_txn_id: 3,
    amt: "50.00",
    date: "2026-03-28T08:09:40.000Z",
    pay_method: "Credit Card",
    merchant_name: "DefinitelyMatcha",
    pdt_name: "Matcha Product",
    pdt_qty: 10,
  },
  {
    global_txn_id: 4,
    merchant_txn_id: 4,
    amt: "110.00",
    date: "2026-03-28T08:13:00.000Z",
    pay_method: "Credit Card",
    merchant_name: "DefinitelyMatcha",
    pdt_name: "Matcha Product",
    pdt_qty: 10,
  },
  {
    global_txn_id: 5,
    merchant_txn_id: 5,
    amt: "50.00",
    date: "2026-03-28T09:53:27.463Z",
    pay_method: "Paynow",
    merchant_name: "DefinitelyMatcha",
    pdt_name: "Matcha Product",
    pdt_qty: 20,
    paynow_ref: "5:38",
  },
  {
    global_txn_id: 6,
    merchant_txn_id: 6,
    amt: "100.00",
    date: "2026-03-28T09:55:00.000Z",
    pay_method: "Paynow",
    merchant_name: "DefinitelyMatcha",
    pdt_name: "Matcha Product",
    pdt_qty: 20,
    paynow_ref: "5:55",
  },
  {
    global_txn_id: 7,
    merchant_txn_id: 7,
    amt: "100.00",
    date: "2026-03-14T10:22:00.000Z",
    pay_method: "Paynow",
    merchant_name: "DefinitelyMatcha",
    pdt_name: "Matcha Product",
    pdt_qty: 20,
    paynow_ref: "6:22",
  },
  {
    global_txn_id: 8,
    merchant_txn_id: 8,
    amt: "100.00",
    date: "2026-03-14T09:55:00.000Z",
    pay_method: "Paynow",
    merchant_name: "DefinitelyMatcha",
    pdt_name: "Matcha Product",
    pdt_qty: 20,
    paynow_ref: "5:55",
  },
  {
    global_txn_id: 9,
    merchant_txn_id: 9,
    amt: "100.00",
    date: "2026-03-14T09:35:00.000Z",
    pay_method: "Paynow",
    merchant_name: "DefinitelyMatcha",
    pdt_name: "Matcha Product",
    pdt_qty: 20,
    paynow_ref: "5:35",
  },
];




// ── Helpers ────────────────────────────────────────────────────────────────

const isToday = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  return d.toDateString() === now.toDateString();
};

const formatDateHeader = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return "Today";
  return d.toLocaleDateString("en-SG", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString("en-SG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const groupByDate = (txns) =>
  txns.reduce((acc, txn) => {
    const key = new Date(txn.date).toDateString();
    if (!acc[key]) acc[key] = { label: formatDateHeader(txn.date), items: [] };
    acc[key].items.push(txn);
    return acc;
  }, {});

// ── Main Component ─────────────────────────────────────────────────────────

const TransactionHistory = () => {
  const cust_id = 1
  const [transactions, setTransactions] = useState([]);
  const [filterMethod, setFilterMethod] = useState("All")
  const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchSingleCustomerTransactions = async() => {
      try {
        // const fetchSingleCustomerTransactions = await transactionService.getAllSingleCustTransactionsPg
        // const fetchSingleCustomerTransactionsData = fetchSingleCustomerTransactions.data
        setTransactions(fetchSingleCustomerTransactionsData)
      } catch(err) {
        setError(`Failed to fetch customer ${cust_id} transactions`)
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSingleCustomerTransactions()
  }, []);

  const filtered =
    filterMethod === "All"
      ? transactions
      : transactions.filter((t) => t.pay_method === filterMethod);

  const grouped = groupByDate(filtered);

  const filterBtns = ["All", "Credit Card", "Paynow"];

  const activeColor = {
    All: "#3A7D44",
    "Credit Card": "#2563EB",
    Paynow: "#7B2FBE",
  };

  return (
    <div className="font-sans min-h-screen max-w-s sm:max-w-md lg:max-w-lg mx-auto pb-20">
      {/* Header */}
      <div className="py-1 px-2 z-10 shadow-md">

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
          Transaction History
        </h1>

        {/* Filter pills */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 justify-center">
          {filterBtns.map((m) => {
            const active = filterMethod === m;
            return (
              <button
                key={m}
                onClick={() => { setFilterMethod(m)}}
                className={`px-3 py-1 rounded-full border ${active ? "bg-green-600 text-white" : "bg-white text-gray-800 border-gray-300"}`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transaction list */}
      <div className="px-5 pb-8">
        {Object.keys(grouped).length === 0 && (
          <p className="text-center text-gray-400 mt-12 text-xs sm:text-sm md:text-base">No transactions found.</p>
        )}

        {Object.entries(grouped).map(([dateKey, { label, items }]) => (
          <div key={dateKey}>
            {/* Date header */}
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 py-5 px-5">{label}</div>

            {/* Cards */}
            <div className="bg-white">
              {items.map((txn, idx) => {
                const isPaynow = txn.pay_method === "Paynow";
                const isLast = idx === items.length - 1;
                return (
                  <div
                    key={txn.global_txn_id}
                    className={`flex items-center py-4 px-5 ${isLast ? "" : "border-b border-gray-200"}`}
                  >
                    {/* Icon */}
                    <MatchaIcon purple={isPaynow} />

                    {/* Middle info */}
                    <div className="flex-1 min-w-0">
                      <div className="ml-2 text-left font-bold text-xs sm:text-sm md:text-base text-gray-900 mb-1">
                        {txn.merchant_name}
                      </div>
                      
                      {/* Payment method badge */}
                      {isPaynow ? (
                        <div className="flex items-center gap-1">
                          <PaynowLogo />
                          <span className="text-purple-600 text-xs sm:text-sm">•</span>
                          <span className="text-xs sm:text-sm text-purple-600 font-medium">
                            {txn.paynow_ref || formatTime(txn.date)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <MastercardIcon />
                          <span className="text-xs sm:text-sm text-gray-500">Credit Card</span>
                        </div>
                      )}
                    </div>

                    {/* Right: amount + time */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm sm:text-xl font-bold text-gray-900 mb-1">
                        ${txn.amt}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">{formatTime(txn.date)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;