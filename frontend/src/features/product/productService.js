import axiosClient from '../../api/axiosClient'

const productService = {
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

export default productService

// //    getAllProductsORM
//     getSingleMerchantProductsPg
//     getSingleMerchantProductsORM
//     addSingleProductMerchantPg
// addSingleProductMerchantORM
// deleteSingleProductMerchantPg
// deleteSingleProductMerchantORM 