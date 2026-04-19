import axiosClient from './axiosClient'

const orderService = { 

    createSingleOrderItemsPg : async(merchant_txn_id, merchant_id, merchant_pdt_id, pdt_name, pdt_price) => {
        const response = await axiosClient.post('/orders/createSingleOrderItemsPg', {
            
            merchant_txn_id : merchant_txn_id,
            merchant_id :  merchant_id,
            merchant_pdt_id:merchant_pdt_id,
            pdt_name : pdt_name,
            pdt_price: pdt_price
        })
        return response
    
    }
}

export default orderService