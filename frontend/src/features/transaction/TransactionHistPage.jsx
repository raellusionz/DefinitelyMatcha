import React, { useState, useEffect } from "react";

// Transaction data
const transactionsData = [
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

// ── Icons ──────────────────────────────────────────────────────────────────

const MastercardIcon = () => (
  <svg className="ml-2 w-7 h-4" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="9" r="9" fill="#EB001B" />
    <circle cx="18" cy="9" r="9" fill="#F79E1B" />
    <path
      d="M14 2.8a9 9 0 0 1 0 12.4A9 9 0 0 1 14 2.8z"
      fill="#FF5F00"
    />
  </svg>
);

const PaynowLogo = () => (
  <span className="ml-3 font-serif italic font-semibold text-xs sm:text-sm text-[#7B2FBE] tracking-tight">
    paynow
  </span>
);

const MatchaIcon = ({ purple = false }) => (
  <div
    className={`w-12 h-12 rounded-full ${purple ? "bg-[#EDE9F8]" : "bg-[#E6F4EA]"} flex items-center justify-center`}
  >
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cup body */}
      <path d="M7 14h18l-2 10H9L7 14z" fill={purple ? "#9B6FD4" : "#4CAF50"} opacity="0.9" />
      {/* Cup handle */}
      <path d="M25 16h2a3 3 0 0 1 0 6h-2" stroke={purple ? "#9B6FD4" : "#4CAF50"} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Saucer */}
      <ellipse cx="16" cy="24.5" rx="9" ry="1.5" fill={purple ? "#C4A8E8" : "#A5D6A7"} />
      {/* Steam */}
      <path d="M13 11 Q14 8 13 6" stroke={purple ? "#9B6FD4" : "#4CAF50"} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M16 10 Q17 7 16 5" stroke={purple ? "#9B6FD4" : "#4CAF50"} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M19 11 Q20 8 19 6" stroke={purple ? "#9B6FD4" : "#4CAF50"} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);


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
  const [transactions, setTransactions] = useState([]);
  const [filterMethod, setFilterMethod] = useState("All")

  useEffect(() => {
    setTransactions(transactionsData);
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
    <div className="font-sans bg-[#faf8f3] min-h-screen max-w-s sm:max-w-md lg:max-w-lg mx-auto pb-20">
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