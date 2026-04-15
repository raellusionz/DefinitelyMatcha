import axiosClient from '../../api/axiosClient'

const merchantService = {
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
    }
}
export default merchantService