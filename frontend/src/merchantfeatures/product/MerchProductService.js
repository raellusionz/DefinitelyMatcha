import axiosClient from "../../api/axiosClient";

const merchantProductService = {
    getSingleMerchantProductsPg : async (merchant_id) => {
        const response = await axiosClient.post('/products/singleMerchantProductsPg', {
            merchant_id: merchant_id 
        })
        return response
    },

    addSingleProductMerchantPg : async(merchant_id, pdt_category, pdt_name, pdt_price, pdt_desc) => {
        const response = await axiosClient.post('/products/addSingleProductMerchantPg', {
            merchant_id,
            pdt_category,
            pdt_name,
            pdt_price,
            pdt_desc,
        })
        return response
    },

    updateSingleProductMerchantPg : async(merchant_id, pdt_category, pdt_name, pdt_price, pdt_desc) => {
        const response = await  axiosClient.patch('/products/updateSingleProductMerchantPg', {
            merchant_id,
            pdt_category,
            pdt_name,
            pdt_price,
            pdt_desc,
        })
        return response
    }

}

export default merchantProductService


