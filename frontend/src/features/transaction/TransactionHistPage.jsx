//L1

import React, { useState, useEffect, use } from "react";
// import transactionService from "./transactionService";
import TransactionFilter from "../transaction/TransactionFilter";
import transactionSupportLogos from "../transaction/TransactionIcons";
import TransactionList from "./TransactionList";
import TransactionDetailModal from "./TransactionDetailModal";
import fetchSingleCustomerTransactionsData from "./TransactionData";
import { groupByDate, formatTime } from "./TransactionUtils";
// import { useUser } from "../../context/userContext";
const { MastercardIcon, PaynowLogo, MatchaIcon } = transactionSupportLogos;

const TransactionHistory = () => {
  const cust_id = 1
  const [transactions, setTransactions] = useState([]);
  const [filterMethod, setFilterMethod] = useState("All")
  const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
  const [error, setError] = useState(null); 
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)

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

  const handleTransactionClick = (txn) => {
    setSelectedTransaction(txn)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedTransaction(null)
  }

  const filtered =
    filterMethod === "All"
      ? transactions
      : transactions.filter((txn) => txn.pay_method === filterMethod);

  const grouped = groupByDate(filtered);

  return (
    <div className="font-sans min-h-screen bg-white pb-20">
      <div className="w-full shadow-md">
        <div className="mx-auto w-full max-w-md lg:max-w-3xl px-4 sm:px-6 lg:px-8 py-1">

          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            Transaction History
          </h1>

          {/* Filter */}
          <TransactionFilter
          filterMethod={filterMethod}
          setFilterMethod={setFilterMethod}
          />

          {/* Transaction list */}
          <div className="px-5 pb-8">
            {loading ? (
              <p className="text-center text-gray-400 mt-12">Loading...</p>
            ) : (
              <TransactionList 
              grouped={grouped}
              onTransactionClick = {handleTransactionClick}
              />
            )}
          </div>

          <TransactionDetailModal
          isOpen={modalOpen}
          transaction={selectedTransaction}
          onClose= {handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
