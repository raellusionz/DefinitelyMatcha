import axiosClient from '../../api/axiosClient'

const merchantMerchantService = {
    getAllMerchantNames : async () => {
        const response = await axiosClient.get('/merchants/getAllMerchantNames', {
        })
        return response
    },

    getOneMerchantPg : async(merchant_id) => {
        const response = await axiosClient.post('/merchants/getOneMerchantPg', {
            merchant_id: merchant_id
        })
        return response
    },

    handleOpenClosePg : async (merchant_id, merchant_active_status) => {
        console.log("I am at the merchant service")
        console.log(merchant_id)
        console.log(merchant_active_status)
        console.log("I am at the merchant service-second warning")
        const response = await axiosClient.patch('/merchants/handleOpenClosePg', {
            merchant_id, 
            merchant_active_status
        })
        return response
    }
}
export default merchantMerchantService