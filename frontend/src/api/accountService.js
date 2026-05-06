import axiosClient from './axiosClient'

const accountService = { 

    getCustomerAccountDetailsPg : async(cust_id) => {
        const response = await axiosClient.post('/account/getCustomerAccountDetailsPg', {
            cust_id :  cust_id,
        })
        return response
    },

    updateCustomerAccountPg :async(cust_id, cust_name, cust_number, new_password) => {
        const response = await axiosClient.patch('/account/updateCustomerAccountPg', {
            cust_id,
            cust_name,
            cust_number,
            new_password
        })
        return response
    }
}

export default accountService