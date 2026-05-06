import axiosClient from './axiosClient'

const accountService = { 

    getCustomerAccountDetails : async(cust_id) => {
        const response = await axiosClient.post('/reviews/getSingleCustomerReviewPg', {
            cust_id :  cust_id,
        })
        return response
    }
}

export default accountService