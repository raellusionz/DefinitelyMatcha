//L1

import React, { useState, useEffect, use } from "react";
import transactionService from "./transactionService";
import TransactionFilter from "../transaction/TransactionFilter";
import transactionSupportLogos from "../transaction/TransactionIcons";
import TransactionList from "./TransactionList";
import TransactionDetailModal from "./TransactionDetailModal";
//import fetchSingleCustomerTransactionsData from "./TransactionData";
import { groupByDate, formatTime } from "./TransactionUtils";
import { useUser } from "../../context/userContext";
const { MastercardIcon, PaynowLogo, MatchaIcon } = transactionSupportLogos;

const TransactionHistory = () => {
  const { userId: cust_id, userLoading} = useUser();
  const [transactions, setTransactions] = useState([]);
  const [filterMethod, setFilterMethod] = useState("All")
  const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
  const [error, setError] = useState(null); 
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    console.log("userLoading:", userLoading, "cust_id:", cust_id); // add this
    if (userLoading) return;
    if (!cust_id) return;


    const fetchSingleCustomerTransactions = async() => {
      try {
        console.log("Customer ID : ",cust_id)
        const fetchSingleCustomerTransactions = await transactionService.getAllSingleCustTransactionsPg(cust_id)
        const fetchSingleCustomerTransactionsData = fetchSingleCustomerTransactions.data.allCustTransactions
        setTransactions(fetchSingleCustomerTransactionsData)
      } catch(err) {
        setError(`Failed to fetch customer ${cust_id} transactions`)
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSingleCustomerTransactions()
  }, [cust_id, userLoading]);

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
        <div className="mt-3 mx-auto w-full max-w-md lg:max-w-3xl px-4 sm:px-6 lg:px-8 py-1">

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
              <div className="flex flex-col items-center
                  justify-center h-48 gap-3">
                <div className="w-9 h-9 rounded-full
                  border-[2.5px] border-transparent
                  border-t-gray-900 border-b-gray-200
                  animate-spin" />
                <p className="text-sm text-gray-400">
                  Loading Transactions...
                </p>
              </div>
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
