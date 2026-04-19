import axiosClient from '../../api/axiosClient'

const transactionService = { 
    getAllSingleCustTransactionsPg : async(cust_id) => {
        const response = await axiosClient.post('/custTransactions/getAllSingleCustTransactionsPg', {
            cust_id : cust_id
        })
        return response
    },

    getSingleCustTransactionsPg : async(merchant_id, merchant_txn_id) => {
        const response = await axiosClient.post('/custTransactions/getSingleCustTransactionsPg', {
            merchant_id : merchant_id,
            merchant_txn_id : merchant_txn_id
        })
        return response
    },

    getSingleOrderItemsPg : async(merchant_id, merchant_txn_id) => {
        const response = await axiosClient.post('/orders/getSingleOrderItemsPg', {
            merchant_id :  merchant_id,
            merchant_txn_id : merchant_txn_id
        })
        return response
    
    },

    createNewMerchTransactionsPg : async(cust_id, merchant_id, pdt_qty, amt, pay_method) => {
        const response = await axiosClient.post('/merchTransactions/createNewMerchTransactionsPg', {
            cust_id : cust_id,
            merchant_id : merchant_id,
            pdt_qty : pdt_qty,
            amt : amt,
            pay_method : pay_method
        })
        return response
    }
}

export default transactionService