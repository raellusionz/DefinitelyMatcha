import axiosClient from '../../api/axiosClient'

const merchantService = {
    getSingleMerchantProductsPg : async (merchant_id) => {
        const response = await axiosClient.post('/products/singleMerchantProductsPg', {
            merchant_id: merchant_id 
        })
        return response
    },
    getSingleMerchantProductsORM : async (merchant_id) => {
        const response = await axiosClient.post('/singleMerchantProductsORM', {
            merchant_id: merchant_id
        })
        return response
    }
}