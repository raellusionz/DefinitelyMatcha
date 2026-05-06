import axiosClient from '../../api/axiosClient'

const cartService = {
    getUserCartPg : async (cust_id,merchant_id) => {
        const response = await axiosClient.post('/cart/getUserCartPg', {
            cust_id: cust_id,
            merchant_id:merchant_id
        })
        return response
    },

    resetUserCartPg: async (cust_id, merchant_id) => {
        const response = await axiosClient.delete('/cart/resetUserCartPg', {
            data: {
                cust_id: cust_id,
                merchant_id: merchant_id
            }

        })
        return response
    },
    
    addItemToCartPg : async(cust_id, merchant_id, merchant_pdt_id, pdt_name, pdt_price) => {
        const response = await axiosClient.post('/cart/addItemToCartPg', {
            cust_id: cust_id,
            merchant_id : merchant_id,
            merchant_pdt_id : merchant_pdt_id,
            pdt_name : pdt_name,
            pdt_price : pdt_price
        })
        return response
    },
    
    reduceQuantityCartPg: async (cust_id, merchant_id, merchant_pdt_id) => {
        const response = await axiosClient.delete('/cart/reduceQuantityCartPg', {
            data: {
                cust_id: cust_id,
                merchant_id : merchant_id,
                merchant_pdt_id : merchant_pdt_id
            }
        })
        return response
    },

   removeCartItemPg: async (cust_id, merchant_id, merchant_pdt_id) => {
    // Send data inside the `data` field of the `DELETE` request
    const response = await axiosClient.delete('/cart/removeCartItemPg', {
        data: {
        cust_id: cust_id,
        merchant_id: merchant_id,
        merchant_pdt_id: merchant_pdt_id,
        }
    });
    
    return response;
    
    },

    getUserCartCheckOutPg : async (cust_id, merchant_id) => {
        const response = await axiosClient.post('/cart/getUserCartCheckOutPg', {
            cust_id: cust_id,
            merchant_id : merchant_id
        })
        return response
    },

    getListOfUserCart: async (cust_id) => {
        const response = await axiosClient.post('/cart/getListOfUserCart', {
            cust_id: cust_id 
        })
        return response
    },

    
}

export default cartService
