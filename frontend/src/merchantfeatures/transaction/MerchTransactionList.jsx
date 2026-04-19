//L2
import React from "react";
import TransactionDateSection from "./MerchTransactionDateSection";

const TransactionList = ({grouped, onTransactionClick}) => {
    const entries = Object.entries(grouped)
    if (entries.length === 0) {
        return (
            <p className="text-center text-gray-400 mt-12">
                No transactions found.
            </p>
        );
    }

    return (
        <>
            {entries.map(([dateKey, group]) => (
                <TransactionDateSection
                    key = {dateKey}
                    label = {group.label}
                    items = {group.items}
                    onTransactionClick = {onTransactionClick}
                />
            ))}
        </>
    )
}

export default TransactionList


//Before Object.Entries 
// {
//   "Sat Mar 28 2026": {
//     label: "Today",
//     items: [txn1, txn2]
//   },
//   "Sat Mar 14 2026": {
//     label: "Friday, 14 Mar 2026",
//     items: [txn3, txn4]
//   }
// }

//After Object.Entries It converts an object into an array of key–value pairs.
//[
//   [
//     "Sat Mar 28 2026",
//     { label: "Today", items: [txn1, txn2] }
//   ],
//   [
//     "Sat Mar 14 2026",
//     { label: "Friday, 14 Mar 2026", items: [txn3, txn4] }
//   ]
// ]