import axiosClient from '../../api/axiosClient'

const transactionService = { 
    

   getAllMerchTransactionsPg : async(merchant_id) => {
        const response = await axiosClient.post('/merchTransactions/getAllMerchTransactionsPg', {
            merchant_id : merchant_id
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
}

export default transactionService