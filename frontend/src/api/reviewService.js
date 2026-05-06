import axiosClient from './axiosClient'

const reviewService = { 

    getSingleCustomerReviewPg : async(merchant_id, merchant_txn_id) => {
        const response = await axiosClient.post('/reviews/getSingleCustomerReviewPg', {
            merchant_id :  merchant_id,
            merchant_txn_id : merchant_txn_id,
        })
        return response
    
    },

    newSingleCustomerReviewPg : async(merchant_id, merchant_txn_id, cust_id, merchant_ratings, merchant_reviews_write) => {
        const response = await axiosClient.post('/reviews/newSingleCustomerReviewPg',{
            merchant_id: merchant_id,
            merchant_txn_id: merchant_txn_id,
            cust_id : cust_id,
            merchant_ratings : merchant_ratings,
            merchant_reviews_write : merchant_reviews_write
        })
        return response
    }
}

export default reviewService