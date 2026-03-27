import axiosClient from '../../api/axiosClient'

const merchantService = {
    getAllMerchantNames : async () => {
        const response = await axiosClient.get('/merchants/getAllMerchantNames', {
        })
        return response
    },
}
export default merchantService