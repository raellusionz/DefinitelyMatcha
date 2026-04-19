import React from "react";

const TransactionFilter = ({ filterMethod, setFilterMethod }) => {
  const filterBtns = ["All", "Credit Card", "Paynow"];

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 justify-center">
      {filterBtns.map((m) => {
        const active = filterMethod === m;

        return (
          <button
            key={m}
            onClick={() => setFilterMethod(m)}
            className={`px-3 py-1 rounded-full border ${
              active
                ? "bg-green-600 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
};

export default TransactionFilter;